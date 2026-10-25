#!/usr/bin/env node
/**
 * Pipeline de datos de PlayStudy.
 *
 * Un solo comando valida TODO el contenido y, solo si no hay errores,
 * regenera data/catalogo_data.js (la copia que permite jugar desde file://):
 *
 *   node scripts/datos.mjs            -> validar y sincronizar
 *   node scripts/datos.mjs validar    -> solo validar
 *   node scripts/datos.mjs check      -> validar y comprobar que el artefacto subido esta sincronizado
 *
 * Equivale a los antiguos scripts/validar_contenido.ps1 y
 * scripts/actualizar_datos.ps1, pero con el mismo Node que usan los tests:
 * un solo lenguaje de tooling y una única fuente de reglas. La validación se
 * exporta para que tests/contenido.test.js pueda comprobar el catálogo real y
 * probar casos inválidos sin tocar los datos del juego.
 *
 * Reglas validadas (las mismas que documenta el README):
 * - 6 casillas por capítulo y exactamente 2 juegos por tema.
 * - Teoría como presentación: cada tarjeta con imagen local y locución.
 * - Rutas de imagen existentes y créditos completos.
 * - La respuesta correcta de cada quiz, indicada por el texto de una opción
 *   (formato recomendado) o por su índice (formato heredado).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { resolverRespuestaCorrecta } from '../src/quiz.js';

/** Raíz del proyecto (este archivo vive en scripts/). */
export const RAIZ_PROYECTO = path.resolve(fileURLToPath(new URL('..', import.meta.url)));

export const RUTA_CATALOGO = 'data/catalogo.json';
export const RUTA_ARTEFACTO = 'data/catalogo_data.js';

const CLAVES_PROHIBIDAS_FICHA = ['destacado', 'secciones', 'puntos'];
const AJUSTES_IMAGEN = ['recorte', 'completo'];
const BOM = '\uFEFF';

/** Normaliza finales de línea para que el artefacto no dependa de autocrlf. */
function normalizar(texto) {
  return texto.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
}

function leerTexto(ruta) {
  return normalizar(fs.readFileSync(ruta, 'utf8'));
}

function leerJson(ruta) {
  return JSON.parse(leerTexto(ruta));
}

/** Resuelve una ruta del catálogo (siempre con '/') dentro de la raíz. */
function rutaDeProyecto(raiz, rutaRelativa) {
  return path.join(raiz, ...String(rutaRelativa).split('/'));
}

/** Recorre cursos → asignaturas → temas → capítulos. */
function* recorrerCapitulos(catalogo) {
  for (const curso of catalogo.cursos ?? []) {
    for (const asignatura of curso.asignaturas ?? []) {
      for (const tema of asignatura.temas ?? []) {
        for (const capitulo of tema.capitulos ?? []) {
          yield { curso, asignatura, tema, capitulo };
        }
      }
    }
  }
}

/**
 * Valida el catálogo y todos los capítulos.
 *
 * @param {{ raiz?: string }} [opciones]
 * @returns {{
 *   errores: string[],
 *   avisos: string[],
 *   totalCapitulos: number,
 *   totalDiapositivas: number
 * }}
 */
export function validarContenido({ raiz = RAIZ_PROYECTO } = {}) {
  const errores = [];
  const avisos = [];
  let totalCapitulos = 0;
  let totalDiapositivas = 0;

  const rutaCatalogo = path.join(raiz, ...RUTA_CATALOGO.split('/'));
  if (!fs.existsSync(rutaCatalogo)) {
    errores.push(`No se encontro ${RUTA_CATALOGO}`);
    return { errores, avisos, totalCapitulos, totalDiapositivas };
  }

  let catalogo;
  try {
    catalogo = leerJson(rutaCatalogo);
  } catch (error) {
    errores.push(`${RUTA_CATALOGO}: JSON invalido (${error.message})`);
    return { errores, avisos, totalCapitulos, totalDiapositivas };
  }

  if (!Array.isArray(catalogo.cursos)) {
    errores.push(`${RUTA_CATALOGO}: falta el array "cursos"`);
    return { errores, avisos, totalCapitulos, totalDiapositivas };
  }

  for (const { tema, capitulo } of recorrerCapitulos(catalogo)) {
    totalCapitulos++;
    const donde = capitulo.id ?? '(capitulo sin id)';

    if (!capitulo.archivo) {
      errores.push(`${donde}: no indica su archivo de contenido`);
      continue;
    }

    const rutaCapitulo = rutaDeProyecto(raiz, capitulo.archivo);
    if (!fs.existsSync(rutaCapitulo)) {
      errores.push(`${donde}: no existe el archivo ${capitulo.archivo}`);
      continue;
    }

    let contenido;
    try {
      contenido = leerJson(rutaCapitulo);
    } catch (error) {
      errores.push(`${donde}: JSON invalido en ${capitulo.archivo} (${error.message})`);
      continue;
    }

    const casillas = Array.isArray(contenido.casillas) ? contenido.casillas : [];
    if (casillas.length !== 6) {
      errores.push(`${donde}: tiene ${casillas.length} casillas (se esperan 6)`);
    }

    const juegosTema = Array.isArray(tema.juegos) ? tema.juegos : [];
    if (juegosTema.length !== 2) {
      errores.push(`${donde}: el tema ${tema.id} debe tener exactamente dos juegos`);
    }
    if (contenido.juegos) {
      for (const juego of juegosTema) {
        if (!contenido.juegos[juego]) {
          avisos.push(
            `${donde}: el tema pide el juego '${juego}' y el capitulo no guarda su material en 'juegos'`
          );
        }
      }
    }

    const imagenesUsadas = new Set();

    for (const casilla of casillas) {
      if (!casilla || typeof casilla !== 'object') {
        errores.push(`${donde}: una casilla no es un objeto`);
        continue;
      }
      if (casilla.tipo !== 'teoria') continue;

      if (!Array.isArray(casilla.fichas) || casilla.fichas.length === 0) {
        errores.push(`${donde} · casilla ${casilla.id}: no tiene fichas`);
        continue;
      }

      for (const ficha of casilla.fichas) {
        if (!ficha || typeof ficha !== 'object') {
          errores.push(`${donde} · casilla ${casilla.id}: una ficha no es un objeto`);
          continue;
        }
        for (const clave of CLAVES_PROHIBIDAS_FICHA) {
          if (Object.hasOwn(ficha, clave)) {
            errores.push(
              `${donde} · casilla ${casilla.id}: la ficha no debe usar '${clave}'; anade una diapositiva con imagen y locucion`
            );
          }
        }

        if (!Array.isArray(ficha.tarjetas) || ficha.tarjetas.length === 0) {
          errores.push(`${donde} · casilla ${casilla.id}: la ficha no tiene tarjetas`);
          continue;
        }

        for (const tarjeta of ficha.tarjetas) {
          if (!tarjeta || typeof tarjeta !== 'object') {
            errores.push(`${donde} · casilla ${casilla.id}: una tarjeta no es un objeto`);
            continue;
          }
          totalDiapositivas++;
          const etiqueta = `${donde} · casilla ${casilla.id} · «${tarjeta.nombre}»`;

          if (!tarjeta.imagen) {
            errores.push(`${etiqueta} no tiene 'imagen'`);
          } else {
            const rutaImagen = rutaDeProyecto(raiz, tarjeta.imagen);
            if (!fs.existsSync(rutaImagen)) {
              errores.push(`${etiqueta}: no existe la imagen ${tarjeta.imagen}`);
            } else {
              imagenesUsadas.add(path.basename(rutaImagen));
            }
          }

          if (typeof tarjeta.locucion !== 'string' || tarjeta.locucion.trim().length < 40) {
            errores.push(`${etiqueta} no tiene una 'locucion' completa`);
          }

          if (!tarjeta.texto) {
            avisos.push(`${etiqueta} no tiene rotulo ('texto')`);
          } else if (String(tarjeta.texto).trim().split(/\s+/).length > 6) {
            avisos.push(`${etiqueta}: el rotulo supera las 6 palabras`);
          }

          if (tarjeta.ajuste_imagen && !AJUSTES_IMAGEN.includes(tarjeta.ajuste_imagen)) {
            errores.push(`${etiqueta}: 'ajuste_imagen' debe ser 'recorte' o 'completo'`);
          }
        }
      }
    }

    for (const casilla of casillas) {
      if (!casilla || typeof casilla !== 'object') continue;
      if (casilla.tipo !== 'quiz') continue;

      const preguntas = Array.isArray(casilla.preguntas) ? casilla.preguntas : [];
      if (preguntas.length === 0) {
        errores.push(`${donde} · casilla ${casilla.id}: no tiene preguntas`);
        continue;
      }

      for (const [numero, pregunta] of preguntas.entries()) {
        if (!pregunta || typeof pregunta !== 'object') {
          errores.push(`${donde} · casilla ${casilla.id}: una pregunta no es un objeto`);
          continue;
        }

        const etiqueta = `${donde} · casilla ${casilla.id} · pregunta ${numero + 1}`;
        const opciones = Array.isArray(pregunta.opciones) ? pregunta.opciones : [];

        if (opciones.length < 2) {
          errores.push(`${etiqueta}: una pregunta tiene menos de dos opciones`);
        }

        const repetidas = opciones.filter(
          (opcion, indice) => opciones.indexOf(opcion) !== indice
        );
        if (repetidas.length > 0) {
          errores.push(
            `${etiqueta}: las opciones deben ser distintas; se repite «${repetidas[0]}»`
          );
        }

        const { error } = resolverRespuestaCorrecta(pregunta);
        if (error) {
          errores.push(`${etiqueta}: ${error}`);
        }
      }
    }

    // Créditos: cada imagen usada debe tener su entrada.
    const rutaCreditos = path.join(path.dirname(rutaCapitulo), 'assets', 'creditos_imagenes.json');
    if (fs.existsSync(rutaCreditos)) {
      let creditos;
      try {
        creditos = leerJson(rutaCreditos);
      } catch (error) {
        errores.push(`${donde}: JSON invalido en assets/creditos_imagenes.json (${error.message})`);
        continue;
      }
      const acreditados = new Set(
        (creditos.creditos ?? []).filter(Boolean).map(entrada => entrada.archivo)
      );
      for (const imagen of [...imagenesUsadas].sort()) {
        if (!acreditados.has(imagen)) {
          errores.push(`${donde}: falta la entrada de '${imagen}' en assets/creditos_imagenes.json`);
        }
      }
    } else {
      avisos.push(`${donde}: no hay assets/creditos_imagenes.json`);
    }
  }

  return { errores, avisos, totalCapitulos, totalDiapositivas };
}

/**
 * Genera el contenido de data/catalogo_data.js a partir del catálogo y de los
 * capítulos. Debe llamarse después de validar: incrusta el JSON ya validado.
 *
 * @param {{ raiz?: string }} [opciones]
 * @returns {string}
 */
export function generarCatalogoData({ raiz = RAIZ_PROYECTO } = {}) {
  const catalogoRaw = leerTexto(path.join(raiz, ...RUTA_CATALOGO.split('/')));
  const catalogo = JSON.parse(catalogoRaw);

  const entradas = [];
  for (const { capitulo } of recorrerCapitulos(catalogo)) {
    if (!capitulo.archivo) continue;
    const rutaCapitulo = rutaDeProyecto(raiz, capitulo.archivo);
    const contenido = leerTexto(rutaCapitulo);
    // El mismo contenido se indexa por id y por ruta: el cargador usa lo que
    // tenga a mano en cada momento.
    entradas.push([capitulo.id, contenido]);
    entradas.push([capitulo.archivo, contenido]);
  }

  const partes = [];
  partes.push('// catalogo_data.js - Generado automaticamente para compatibilidad file://\n');
  partes.push('(function() {\n');
  partes.push("  'use strict';\n");
  partes.push(`  window.CATALOGO_DATA = ${catalogoRaw};\n`);
  partes.push('  window.CAPITULOS_DATA = {\n');

  entradas.forEach(([clave, contenido], indice) => {
    if (indice > 0) partes.push(',\n');
    partes.push(`    ${JSON.stringify(clave)}: ${contenido}`);
  });

  partes.push('\n  };\n');
  partes.push('})();\n');
  return BOM + partes.join('');
}

/**
 * Comprueba que el artefacto subido coincide con lo que generan los datos.
 * La comparación ignora BOM y finales de línea para ser estable entre sistemas.
 *
 * @param {{ raiz?: string }} [opciones]
 * @returns {{ sincronizado: boolean, motivo?: string }}
 */
export function comprobarCatalogoData({ raiz = RAIZ_PROYECTO } = {}) {
  const rutaArtefacto = path.join(raiz, ...RUTA_ARTEFACTO.split('/'));
  if (!fs.existsSync(rutaArtefacto)) {
    return { sincronizado: false, motivo: `falta ${RUTA_ARTEFACTO}` };
  }
  const esperado = normalizar(generarCatalogoData({ raiz })).replace(/\n+$/, '');
  const actual = normalizar(fs.readFileSync(rutaArtefacto, 'utf8')).replace(/\n+$/, '');
  if (actual === esperado) return { sincronizado: true };
  return {
    sincronizado: false,
    motivo: `${RUTA_ARTEFACTO} no coincide con lo que generan data/catalogo.json y los capitulos`
  };
}

/**
 * Valida y, solo si no hay errores, escribe data/catalogo_data.js.
 *
 * @param {{ raiz?: string }} [opciones]
 * @returns {ReturnType<typeof validarContenido> & { sincronizado: boolean }}
 */
export function sincronizarDatos({ raiz = RAIZ_PROYECTO } = {}) {
  const informe = validarContenido({ raiz });
  if (informe.errores.length > 0) {
    return { ...informe, sincronizado: false };
  }
  const contenido = generarCatalogoData({ raiz });
  fs.writeFileSync(path.join(raiz, ...RUTA_ARTEFACTO.split('/')), contenido, 'utf8');
  return { ...informe, sincronizado: true };
}

/** Imprime el informe de validación con el mismo formato en todos los comandos. */
function imprimirInforme({ errores, avisos, totalCapitulos, totalDiapositivas }) {
  console.log(
    `Capitulos revisados: ${totalCapitulos} | Diapositivas de teoria: ${totalDiapositivas}`
  );
  for (const aviso of avisos) console.log(`  [AVISO] ${aviso}`);
  for (const error of errores) console.log(`  [ERROR] ${error}`);

  if (errores.length > 0) {
    console.log(`Validacion con ${errores.length} errores.`);
    return false;
  }
  console.log('Validacion correcta: todo el contenido usa el formato de diapositivas narradas.');
  return true;
}

/**
 * Punto de entrada de la CLI.
 *
 * @param {string[]} [argv]
 * @param {{ raiz?: string }} [opciones]
 * @returns {number} Código de salida.
 */
export function main(argv = process.argv.slice(2), { raiz = RAIZ_PROYECTO } = {}) {
  const comando = (argv[0] ?? 'sincronizar').toLowerCase();

  if (comando === '--help' || comando === '-h' || comando === 'ayuda') {
    console.log('Uso: node scripts/datos.mjs [validar|check]');
    console.log('  (sin argumentos)  valida y regenera data/catalogo_data.js');
    console.log('  validar           solo valida, sin escribir nada');
    console.log('  check             valida y comprueba que el artefacto esta sincronizado');
    return 0;
  }

  if (!['validar', 'check', 'sincronizar'].includes(comando)) {
    console.error(`Comando desconocido: ${argv[0]}`);
    console.error('Uso: node scripts/datos.mjs [validar|check]');
    return 2;
  }

  if (comando === 'check') {
    const informe = validarContenido({ raiz });
    if (!imprimirInforme(informe)) {
      console.log('No se comprueba la sincronizacion mientras haya errores de contenido.');
      return 1;
    }
    const estado = comprobarCatalogoData({ raiz });
    if (estado.sincronizado) {
      console.log(`OK: ${RUTA_ARTEFACTO} esta sincronizado con el catalogo y los capitulos.`);
      return 0;
    }
    console.log(`DESINCRONIZADO: ${estado.motivo}.`);
    console.log('Regeneralo antes de subir:');
    console.log('  node scripts/datos.mjs');
    return 1;
  }

  if (comando === 'validar') {
    return imprimirInforme(validarContenido({ raiz })) ? 0 : 1;
  }

  const informe = sincronizarDatos({ raiz });
  const valido = imprimirInforme(informe);
  if (!valido) {
    console.log('No se ha sincronizado nada: corrige los errores y vuelve a ejecutar el comando.');
    return 1;
  }
  console.log(
    `catalogo_data.js regenerado con exito (${informe.totalCapitulos} capitulos).`
  );
  return 0;
}

/** True si este módulo se ha ejecutado directamente (no importado por un test). */
function ejecutadoDirectamente() {
  const entrada = process.argv[1];
  if (!entrada) return false;
  try {
    return fs.realpathSync(entrada) === fs.realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
}

if (ejecutadoDirectamente()) {
  process.exitCode = main();
}
