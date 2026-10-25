/**
 * Tests del almacenamiento centralizado (src/storage.js).
 *
 * Los helpers usan `localStorage`, que no existe en Node: se instala un mock
 * en memoria ANTES de importar el modulo.
 */

import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { MockStorage, instalarLocalStorageGlobal } from './helpers.js';

const storage = instalarLocalStorageGlobal();
const {
  CLAVES,
  CLAVES_ANTIGUAS,
  leerTexto,
  guardarTexto,
  leerJSON,
  guardarJSON,
  leerBooleano,
  guardarBooleano,
  eliminarClave,
  migrarClavesAntiguas
} = await import('../src/storage.js');

beforeEach(() => {
  storage.clear();
});

test('las claves del juego usan el espacio de nombres playstudy.*', () => {
  assert.ok(Object.keys(CLAVES).length > 0);
  Object.values(CLAVES).forEach(clave => {
    assert.match(clave, /^playstudy\./, `la clave «${clave}» esta namespaced`);
  });
  // Cada clave antigua tiene un destino actual.
  Object.values(CLAVES_ANTIGUAS).forEach(clave => {
    assert.ok(Object.values(CLAVES).includes(clave), `la clave actual «${clave}» esta declarada`);
  });
});

test('leerTexto devuelve el valor guardado o el valor por defecto', () => {
  assert.equal(leerTexto(CLAVES.sonido), null);
  assert.equal(leerTexto(CLAVES.sonido, 'defecto'), 'defecto');
  assert.equal(guardarTexto(CLAVES.sonido, 'hola'), true);
  assert.equal(leerTexto(CLAVES.sonido), 'hola');
});

test('eliminarClave borra el valor guardado', () => {
  guardarTexto(CLAVES.sonido, 'hola');
  assert.equal(eliminarClave(CLAVES.sonido), true);
  assert.equal(leerTexto(CLAVES.sonido), null);
});

test('leerJSON devuelve el objeto guardado', () => {
  const valor = { version: 1, modo: 'auto' };
  assert.equal(guardarJSON(CLAVES.preferenciasVoz, valor), true);
  assert.deepEqual(leerJSON(CLAVES.preferenciasVoz), valor);
});

test('leerJSON con un valor corrupto devuelve el valor por defecto y avisa', () => {
  storage.setItem(CLAVES.progreso, '{esto no es json');
  const avisos = [];
  const warnOriginal = console.warn;
  console.warn = (...args) => avisos.push(args.join(' '));
  try {
    assert.deepEqual(leerJSON(CLAVES.progreso, { temas: {} }), { temas: {} });
    assert.ok(avisos.some(a => a.includes('JSON válido')), 'avisa del valor corrupto');
  } finally {
    console.warn = warnOriginal;
  }
});

test('leerBooleano interpreta los valores guardados como texto', () => {
  assert.equal(leerBooleano(CLAVES.sonido, true), true, 'sin valor usa el defecto');
  assert.equal(leerBooleano(CLAVES.sonido, false), false);

  guardarBooleano(CLAVES.sonido, false);
  assert.equal(storage.getItem(CLAVES.sonido), 'false');
  assert.equal(leerBooleano(CLAVES.sonido, true), false);

  guardarBooleano(CLAVES.sonido, true);
  assert.equal(storage.getItem(CLAVES.sonido), 'true');
  assert.equal(leerBooleano(CLAVES.sonido, false), true);

  storage.setItem(CLAVES.sonido, '0');
  assert.equal(leerBooleano(CLAVES.sonido, true), false, '«0» tambien es falso');
});

test('migrarClavesAntiguas traslada las claves y borra las antiguas', () => {
  const viejo = new MockStorage();
  const progreso = JSON.stringify({ temas: {}, estrellasTotales: 4 });
  viejo.setItem('aventura_educativa_state_v3', progreso);
  viejo.setItem('sound_enabled', 'false');
  viejo.setItem('playstudy_theory_mute', 'true');

  const resultado = migrarClavesAntiguas(viejo);

  assert.equal(viejo.getItem(CLAVES.progreso), progreso);
  assert.equal(viejo.getItem(CLAVES.sonido), 'false');
  assert.equal(viejo.getItem(CLAVES.teoriaVozSilenciada), 'true');
  assert.equal(viejo.getItem('aventura_educativa_state_v3'), null);
  assert.equal(viejo.getItem('sound_enabled'), null);
  assert.equal(viejo.getItem('playstudy_theory_mute'), null);
  assert.equal(viejo.getItem(CLAVES.migracion), '1');
  assert.deepEqual(resultado.migradas, [
    'aventura_educativa_state_v3',
    'sound_enabled',
    'playstudy_theory_mute'
  ]);
});

test('la migracion conserva la clave nueva si ya existe y no se repite', () => {
  const viejo = new MockStorage();
  viejo.setItem('sound_enabled', 'false');
  viejo.setItem(CLAVES.sonido, 'true');

  migrarClavesAntiguas(viejo);

  assert.equal(viejo.getItem(CLAVES.sonido), 'true', 'la clave nueva tiene prioridad');
  assert.equal(viejo.getItem('sound_enabled'), null, 'la antigua se elimina igualmente');
  assert.equal(viejo.getItem(CLAVES.migracion), '1');

  // Con la marca puesta, una clave antigua que reaparezca no se vuelve a migrar.
  viejo.setItem('sound_enabled', 'false');
  const resultado = migrarClavesAntiguas(viejo);
  assert.deepEqual(resultado.migradas, []);
  assert.equal(viejo.getItem(CLAVES.sonido), 'true');
  assert.equal(viejo.getItem('sound_enabled'), 'false');
});

test('sin localStorage el modulo no falla y no persiste', () => {
  const original = globalThis.localStorage;
  try {
    Object.defineProperty(globalThis, 'localStorage', { value: undefined, configurable: true });
    assert.equal(guardarTexto(CLAVES.sonido, 'x'), false);
    assert.equal(leerTexto(CLAVES.sonido, 'defecto'), 'defecto');
    assert.deepEqual(migrarClavesAntiguas(), { migradas: [], error: null });
  } finally {
    Object.defineProperty(globalThis, 'localStorage', { value: original, configurable: true });
  }
});
