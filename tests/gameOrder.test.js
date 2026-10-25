/**
 * Tests del orden de juegos en el circuito (src/gameOrder.js).
 *
 * Cubre las reglas didacticas criticas:
 * - el barajado nunca mueve teoria ni quizzes,
 * - conserva los id de parada (estrellas y desbloqueos),
 * - renumera los titulos al hueco que ocupan,
 * - el montaje por tema selecciona, avisa y es compatible con capitulos antiguos.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  TIPOS_JUEGO,
  esCasillaDeJuego,
  obtenerJuegosDelTema,
  montarJuegosDelTema,
  barajarJuegosCircuito,
  prepararCapituloParaCircuito
} from '../src/gameOrder.js';
import { crearRandomDeterminista } from './helpers.js';

/** Casilla de juego (parada) con la forma minima que usa el circuito. */
function casillaJuego(id, titulo, subtipo = titulo) {
  return { id, tipo: 'minijuego', subtipo, titulo };
}

function casillaFija(tipo, titulo) {
  return { id: 99, tipo, titulo };
}

/** Circuito tipico: teoria, dos juegos, quiz y dos juegos mas. */
function circuitoEjemplo() {
  return [
    casillaFija('teoria', 'Teoria 1'),
    casillaJuego(1, '1. Parejas', 'parejas'),
    casillaJuego(2, '2. Linea de tiempo', 'linea_tiempo'),
    casillaFija('quiz', 'Quiz 1'),
    casillaJuego(3, '3. Ahorcado', 'ahorcado'),
    casillaJuego(4, '4. Sopa', 'sopa')
  ];
}

test('TIPOS_JUEGO es una lista congelada (no se puede corromper en runtime)', () => {
  assert.ok(Array.isArray(TIPOS_JUEGO));
  assert.ok(Object.isFrozen(TIPOS_JUEGO));
  assert.throws(() => { TIPOS_JUEGO.push('otro'); }, TypeError);
});

test('esCasillaDeJuego distingue juegos de paradas fijas', () => {
  assert.equal(esCasillaDeJuego(casillaJuego(1, 'x')), true);
  assert.equal(esCasillaDeJuego(casillaFija('teoria', 'x')), false);
  assert.equal(esCasillaDeJuego(casillaFija('quiz', 'x')), false);
  assert.equal(esCasillaDeJuego(null), false);
  assert.equal(esCasillaDeJuego({}), false);
});

test('obtenerJuegosDelTema: deduplica, recorta y devuelve null si no hay nada', () => {
  assert.deepEqual(obtenerJuegosDelTema({ juegos: ['parejas', 'parejas', ' parejas '] }), ['parejas']);
  assert.equal(obtenerJuegosDelTema({ juegos: [] }), null);
  assert.equal(obtenerJuegosDelTema({ juegos: ['   ', ''] }), null);
  assert.equal(obtenerJuegosDelTema(null), null);
  assert.equal(obtenerJuegosDelTema({}), null);
});

test('barajarJuegosCircuito: la teoria y los quizzes no se mueven', () => {
  const casillas = circuitoEjemplo();
  const resultado = barajarJuegosCircuito(casillas, crearRandomDeterminista());

  assert.equal(resultado[0].titulo, 'Teoria 1');
  assert.equal(resultado[3].titulo, 'Quiz 1');
  // Las paradas fijas deben ser exactamente los mismos objetos.
  assert.equal(resultado[0], casillas[0]);
  assert.equal(resultado[3], casillas[3]);
});

test('barajarJuegosCircuito: los id de parada se conservan aunque el juego cambie de sitio', () => {
  const casillas = circuitoEjemplo();
  const resultado = barajarJuegosCircuito(casillas, crearRandomDeterminista());

  // Paradas de juego en 1, 2, 5 y 6 (indices).
  const indicesJuego = [1, 2, 4, 5];
  indicesJuego.forEach(i => {
    assert.equal(resultado[i].id, casillas[i].id, `la parada ${i} conserva su id`);
    assert.equal(resultado[i].tipo, 'minijuego');
  });

  // El barajado es real: con 4 juegos, alguna posicion cambia.
  const subtiposOriginales = indicesJuego.map(i => casillas[i].subtipo);
  const subtiposBarajados = indicesJuego.map(i => resultado[i].subtipo);
  assert.notDeepEqual(subtiposOriginales, subtiposBarajados);

  // Y no se pierde ningun juego: mismos subtipos, distinto orden.
  assert.deepEqual(subtiposBarajados.slice().sort(), subtiposOriginales.slice().sort());
});

test('barajarJuegosCircuito: el titulo se renumera a la parada que ocupa', () => {
  const casillas = [
    casillaFija('teoria', 'Teoria'),
    casillaJuego(1, '7. Parejas'),     // viene numerado "mal"
    casillaJuego(2, '9. Linea de tiempo') // tambien numerado "mal"
  ];
  const resultado = barajarJuegosCircuito(casillas, crearRandomDeterminista());

  // Sea cual sea el orden, el titulo de cada juego queda numerado con su parada.
  [1, 2].forEach(i => {
    assert.match(resultado[i].titulo, new RegExp(`^${casillas[i].id}\\. `));
  });
  // Y ningun titulo conserva el numero que traia del catalogo.
  assert.ok(!resultado.some(c => c.titulo && c.titulo.startsWith('7. ')));
  assert.ok(!resultado.some(c => c.titulo && c.titulo.startsWith('9. ')));
});

test('barajarJuegosCircuito: con menos de dos juegos devuelve las casillas intactas', () => {
  const unSoloJuego = [casillaFija('teoria', 'T'), casillaJuego(1, '1. Parejas')];
  assert.equal(barajarJuegosCircuito(unSoloJuego, crearRandomDeterminista()), unSoloJuego);

  const sinJuegos = [casillaFija('teoria', 'T'), casillaFija('quiz', 'Q')];
  assert.equal(barajarJuegosCircuito(sinJuegos, crearRandomDeterminista()), sinJuegos);

  // Y con entrada invalida tampoco revienta.
  assert.equal(barajarJuegosCircuito(null), null);
});

test('barajarJuegosCircuito: no muta la lista original', () => {
  const casillas = circuitoEjemplo();
  const copia = JSON.parse(JSON.stringify(casillas));
  barajarJuegosCircuito(casillas, crearRandomDeterminista());
  assert.deepEqual(casillas, copia);
});

test('prepararCapituloParaCircuito: devuelve una copia y respeta entradas invalidas', () => {
  const capitulo = { id: 'cap_01', casillas: circuitoEjemplo() };
  const resultado = prepararCapituloParaCircuito(capitulo, crearRandomDeterminista());
  assert.notEqual(resultado, capitulo);
  assert.equal(resultado.id, 'cap_01');
  assert.equal(resultado.casillas.length, capitulo.casillas.length);

  assert.equal(prepararCapituloParaCircuito(null), null);
  const sinCasillas = { id: 'cap_02' };
  assert.equal(prepararCapituloParaCircuito(sinCasillas), sinCasillas);
});

function capituloConPool() {
  return {
    id: 'cap_01_edades',
    casillas: [
      casillaFija('teoria', 'Teoria'),
      casillaJuego(1, 'Parejas'),
      casillaJuego(2, 'Linea del tiempo'),
      casillaFija('quiz', 'Quiz')
    ],
    juegos: {
      parejas: { titulo: 'Parejas', instrucciones: 'Junta las parejas.' },
      linea_tiempo: { titulo: 'Linea del tiempo', instrucciones: 'Ordena.' },
      ahorcado: { titulo: 'Ahorcado', instrucciones: 'Adivina.' }
    }
  };
}

test('montarJuegosDelTema: coloca los juegos pedidos en las paradas, conservando id y numero', () => {
  const capitulo = capituloConPool();
  const tema = { juegos: ['ahorcado', 'linea_tiempo'] };
  const resultado = montarJuegosDelTema(capitulo, tema);

  // La teoria y el quiz no se tocan.
  assert.equal(resultado.casillas[0], capitulo.casillas[0]);
  assert.equal(resultado.casillas[3], capitulo.casillas[3]);

  // Cada parada conserva su id y su titulo numerado.
  assert.equal(resultado.casillas[1].id, 1);
  assert.equal(resultado.casillas[1].subtipo, 'ahorcado');
  assert.equal(resultado.casillas[1].titulo, '1. Ahorcado');
  assert.equal(resultado.casillas[2].id, 2);
  assert.equal(resultado.casillas[2].subtipo, 'linea_tiempo');
  assert.equal(resultado.casillas[2].titulo, '2. Linea del tiempo');

  // El material del juego se despliega sobre la casilla.
  assert.equal(resultado.casillas[1].instrucciones, 'Adivina.');
  assert.equal(resultado.casillas[1].tipo, 'minijuego');
});

test('montarJuegosDelTema: avisa si el tema pide juegos que el capitulo no define', () => {
  const avisos = [];
  const warnOriginal = console.warn;
  console.warn = (...args) => avisos.push(args.join(' '));
  try {
    const capitulo = capituloConPool();
    const resultado = montarJuegosDelTema(capitulo, { juegos: ['sopa', 'parejas'] });

    assert.ok(
      avisos.some(a => a.includes('sopa')),
      'avisa de que "sopa" falta en el capitulo'
    );
    // Las paradas se rellenan con juegos disponibles.
    assert.equal(resultado.casillas[1].subtipo, 'parejas');
    assert.ok(['linea_tiempo', 'ahorcado'].includes(resultado.casillas[2].subtipo));
  } finally {
    console.warn = warnOriginal;
  }
});

test('montarJuegosDelTema: avisa si faltan juegos para cubrir las paradas', () => {
  const avisos = [];
  const warnOriginal = console.warn;
  console.warn = (...args) => avisos.push(args.join(' '));
  try {
    const capitulo = capituloConPool();
    capitulo.juegos = { parejas: capitulo.juegos.parejas }; // un solo juego, dos paradas
    const resultado = montarJuegosDelTema(capitulo, null);

    assert.ok(avisos.some(a => a.includes('Faltan juegos')));
    assert.equal(resultado.casillas[1].subtipo, 'parejas');
    // La segunda parada no tiene juego que montar: queda como estaba.
    assert.equal(resultado.casillas[2], capitulo.casillas[2]);
  } finally {
    console.warn = warnOriginal;
  }
});

test('montarJuegosDelTema: avisa si sobran juegos para las paradas', () => {
  const avisos = [];
  const warnOriginal = console.warn;
  console.warn = (...args) => avisos.push(args.join(' '));
  try {
    const capitulo = capituloConPool();
    const tema = { juegos: ['ahorcado', 'linea_tiempo', 'parejas'] }; // 3 juegos, 2 paradas
    montarJuegosDelTema(capitulo, tema);
    assert.ok(avisos.some(a => a.includes('solo tiene')), 'avisa de que sobran juegos');
  } finally {
    console.warn = warnOriginal;
  }
});

test('montarJuegosDelTema: capitulos antiguos (juegos dentro de las casillas) no se tocan', () => {
  const capitulo = {
    id: 'cap_antiguo',
    casillas: [casillaFija('teoria', 'T'), casillaJuego(1, '1. Parejas')]
    // Sin catalogo `juegos`: el montaje no aplica.
  };
  const tema = { juegos: ['parejas'] };
  assert.equal(montarJuegosDelTema(capitulo, tema), capitulo);

  // Tambien con entradas degeneradas.
  assert.equal(montarJuegosDelTema(null), null);
  assert.deepEqual(montarJuegosDelTema({ id: 'x' }), { id: 'x' });
  const capSinCasillas = { id: 'y', juegos: { a: { titulo: 'A' } } };
  assert.equal(montarJuegosDelTema(capSinCasillas, null), capSinCasillas);
});