/**
 * Tests del pipeline de datos (scripts/datos.mjs).
 *
 * Cubren dos cosas:
 * 1. Que el contenido real del repositorio valida (test de humo).
 * 2. Que el validador detecta los errores tipicos y que el generador solo
 *    escribe data/catalogo_data.js cuando no hay errores.
 *
 * Los casos invalidos se construyen en un proyecto temporal, para no tocar
 * nunca los datos del juego.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import {
  RUTA_ARTEFACTO,
  comprobarCatalogoData,
  generarCatalogoData,
  sincronizarDatos,
  validarContenido
} from '../scripts/datos.mjs';

const RUTA_CAPITULO = 'data/cursos/curso/asig/tema/cap/contenido.json';
const RUTA_ASSETS = 'data/cursos/curso/asig/tema/cap/assets';

function capituloValido() {
  return {
    id: 'cap_01_test',
    juegos: {
      parejas: { titulo: 'Parejas' },
      linea_tiempo: { titulo: 'Linea del tiempo' }
    },
    casillas: [
      { id: 1, tipo: 'minijuego' },
      {
        id: 2,
        tipo: 'teoria',
        fichas: [
          {
            titulo: 'Primera parte',
            tarjetas: [
              {
                nombre: 'Diapositiva A',
                imagen: `${RUTA_ASSETS}/a.jpg`,
                texto: 'Rotulo breve',
                locucion: 'Esta es una locucion suficientemente larga para el validador.'
              }
            ]
          }
        ]
      },
      {
        id: 3,
        tipo: 'quiz',
        preguntas: [
          { enunciado: 'Pregunta 1', opciones: ['Correcta', 'Incorrecta'], correcta: 0 }
        ]
      },
      { id: 4, tipo: 'minijuego' },
      {
        id: 5,
        tipo: 'teoria',
        fichas: [
          {
            titulo: 'Segunda parte',
            tarjetas: [
              {
                nombre: 'Diapositiva B',
                imagen: `${RUTA_ASSETS}/b.jpg`,
                texto: 'Otro rotulo',
                locucion: 'Esta es otra locucion suficientemente larga para el validador.'
              }
            ]
          }
        ]
      },
      {
        id: 6,
        tipo: 'quiz',
        preguntas: [
          { enunciado: 'Pregunta 2', opciones: ['Correcta', 'Incorrecta'], correcta: 0 }
        ]
      }
    ]
  };
}

function catalogoValido() {
  return {
    version: '1.0',
    cursos: [
      {
        id: 'curso',
        asignaturas: [
          {
            id: 'asig',
            temas: [
              {
                id: 'tema',
                juegos: ['parejas', 'linea_tiempo'],
                capitulos: [{ id: 'cap_01_test', archivo: RUTA_CAPITULO }]
              }
            ]
          }
        ]
      }
    ]
  };
}

/**
 * Crea un proyecto temporal con el catálogo, un capítulo y sus assets.
 * Devuelve la raíz para pasársela a las funciones del pipeline.
 */
function crearProyecto(t, { contenido = capituloValido(), catalogo = catalogoValido() } = {}) {
  const raiz = fs.mkdtempSync(path.join(os.tmpdir(), 'playstudy-datos-'));
  t.after(() => fs.rmSync(raiz, { recursive: true, force: true }));

  const escribir = (rutaRelativa, texto) => {
    const ruta = path.join(raiz, ...rutaRelativa.split('/'));
    fs.mkdirSync(path.dirname(ruta), { recursive: true });
    fs.writeFileSync(ruta, texto, 'utf8');
  };

  escribir('data/catalogo.json', JSON.stringify(catalogo, null, 2) + '\n');
  escribir(RUTA_CAPITULO, JSON.stringify(contenido, null, 2) + '\n');
  for (const imagen of ['a.jpg', 'b.jpg']) {
    const ruta = path.join(raiz, ...`${RUTA_ASSETS}/${imagen}`.split('/'));
    fs.mkdirSync(path.dirname(ruta), { recursive: true });
    fs.writeFileSync(ruta, Buffer.from([0xff, 0xd8, 0xff]));
  }
  escribir(
    `${RUTA_ASSETS}/creditos_imagenes.json`,
    JSON.stringify(
      {
        creditos: [{ archivo: 'a.jpg' }, { archivo: 'b.jpg' }]
      },
      null,
      2
    ) + '\n'
  );

  return raiz;
}

function erroresDe(informe) {
  return informe.errores.join('\n');
}

test('el catalogo real del repositorio valida sin errores', () => {
  const informe = validarContenido();
  assert.deepEqual(informe.errores, []);
  assert.ok(informe.totalCapitulos > 0, 'hay capítulos revisados');
  assert.ok(informe.totalDiapositivas > 0, 'hay diapositivas revisadas');
});

test('un capitulo correcto no genera errores ni avisos', t => {
  const raiz = crearProyecto(t);
  const informe = validarContenido({ raiz });

  assert.deepEqual(informe.errores, []);
  assert.deepEqual(informe.avisos, []);
  assert.equal(informe.totalCapitulos, 1);
  assert.equal(informe.totalDiapositivas, 2);
});

test('detecta imagenes que no existen', t => {
  const contenido = capituloValido();
  contenido.casillas[1].fichas[0].tarjetas[0].imagen = `${RUTA_ASSETS}/no_existe.jpg`;
  const raiz = crearProyecto(t, { contenido });

  assert.match(erroresDe(validarContenido({ raiz })), /no existe la imagen/);
});

test('detecta diapositivas sin locucion completa', t => {
  const contenido = capituloValido();
  contenido.casillas[1].fichas[0].tarjetas[0].locucion = 'Corta.';
  const raiz = crearProyecto(t, { contenido });

  assert.match(erroresDe(validarContenido({ raiz })), /no tiene una 'locucion' completa/);
});

test('detecta quizzes que no marcan la opcion 0 como correcta', t => {
  const contenido = capituloValido();
  contenido.casillas[2].preguntas[0].correcta = 1;
  const raiz = crearProyecto(t, { contenido });

  assert.match(erroresDe(validarContenido({ raiz })), /respuesta correcta debe estar en opciones\[0\]/);
});

test('detecta creditos incompletos', t => {
  const raiz = crearProyecto(t);
  fs.writeFileSync(
    path.join(raiz, ...`${RUTA_ASSETS}/creditos_imagenes.json`.split('/')),
    JSON.stringify({ creditos: [{ archivo: 'a.jpg' }] }),
    'utf8'
  );

  assert.match(erroresDe(validarContenido({ raiz })), /falta la entrada de 'b\.jpg'/);
});

test('detecta circuitos y temas mal montados', t => {
  const contenido = capituloValido();
  contenido.casillas.pop(); // 5 casillas
  const catalogo = catalogoValido();
  catalogo.cursos[0].asignaturas[0].temas[0].juegos = ['parejas'];
  const raiz = crearProyecto(t, { contenido, catalogo });

  const errores = erroresDe(validarContenido({ raiz }));
  assert.match(errores, /5 casillas \(se esperan 6\)/);
  assert.match(errores, /debe tener exactamente dos juegos/);
});

test('detecta JSON invalido en un capitulo o en el catalogo', t => {
  const raiz = crearProyecto(t);
  fs.writeFileSync(
    path.join(raiz, ...RUTA_CAPITULO.split('/')),
    '{ esto no es json',
    'utf8'
  );
  assert.match(erroresDe(validarContenido({ raiz })), /JSON invalido/);

  const raizSinCatalogo = fs.mkdtempSync(path.join(os.tmpdir(), 'playstudy-datos-'));
  t.after(() => fs.rmSync(raizSinCatalogo, { recursive: true, force: true }));
  assert.match(erroresDe(validarContenido({ raiz: raizSinCatalogo })), /No se encontro data\/catalogo\.json/);
});

test('el generador indexa cada capitulo por id y por ruta', t => {
  const raiz = crearProyecto(t);
  const generado = generarCatalogoData({ raiz });

  assert.ok(generado.startsWith('\uFEFF'));
  assert.match(generado, /window\.CATALOGO_DATA = \{/);
  assert.ok(generado.includes(`"cap_01_test": {`));
  assert.ok(generado.includes(`"${RUTA_CAPITULO}": {`));
});

test('check detecta el artefacto ausente o desincronizado', t => {
  const raiz = crearProyecto(t);
  const rutaArtefacto = path.join(raiz, ...RUTA_ARTEFACTO.split('/'));

  assert.equal(comprobarCatalogoData({ raiz }).sincronizado, false);

  fs.writeFileSync(rutaArtefacto, generarCatalogoData({ raiz }), 'utf8');
  assert.equal(comprobarCatalogoData({ raiz }).sincronizado, true);

  fs.writeFileSync(rutaArtefacto, generarCatalogoData({ raiz }) + '// cambio\n', 'utf8');
  assert.equal(comprobarCatalogoData({ raiz }).sincronizado, false);
});

test('sincronizarDatos no escribe nada si la validacion falla', t => {
  const contenido = capituloValido();
  contenido.casillas[1].fichas[0].tarjetas[0].imagen = `${RUTA_ASSETS}/no_existe.jpg`;
  const raiz = crearProyecto(t, { contenido });

  const rutaArtefacto = path.join(raiz, ...RUTA_ARTEFACTO.split('/'));
  fs.writeFileSync(rutaArtefacto, 'NO TOCAR', 'utf8');

  const informe = sincronizarDatos({ raiz });
  assert.equal(informe.sincronizado, false);
  assert.ok(informe.errores.length > 0);
  assert.equal(fs.readFileSync(rutaArtefacto, 'utf8'), 'NO TOCAR');
});

test('sincronizarDatos escribe el artefacto cuando todo es valido', t => {
  const raiz = crearProyecto(t);
  const informe = sincronizarDatos({ raiz });

  assert.equal(informe.sincronizado, true);
  assert.deepEqual(informe.errores, []);
  assert.equal(comprobarCatalogoData({ raiz }).sincronizado, true);
});
