/**
 * Tests del progreso del jugador (src/state.js).
 *
 * StateManager usa `localStorage`, que no existe en Node: se instala un mock
 * en memoria ANTES de importar el modulo (el singleton se construye al cargar).
 */

import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { instalarLocalStorageGlobal } from './helpers.js';

// El singleton `gameState` se crea en el import: primero el localStorage falso.
const storage = instalarLocalStorageGlobal();
const { CLAVES } = await import('../src/storage.js');
const { gameState } = await import('../src/state.js');

function estadoInicial() {
  return { temas: {}, temaActualId: 'cap_01_edades', estrellasTotales: 0 };
}

beforeEach(() => {
  // Estado limpio y almacenamiento vacio para cada test.
  storage.clear();
  gameState.state = estadoInicial();
});

test('al empezar, el tema tiene la casilla 1 desbloqueada y ninguna estrella', () => {
  const progreso = gameState.getTemaProgreso('tema_nuevo');
  assert.equal(progreso.casillaDesbloqueada, 1);
  assert.deepEqual(progreso.estrellas, {});
  assert.equal(gameState.isCasillaDesbloqueada('tema_nuevo', 1), true);
  assert.equal(gameState.isCasillaDesbloqueada('tema_nuevo', 2), false);
  assert.equal(gameState.getEstrellasCasilla('tema_nuevo', 1), 0);
});

test('completarCasilla desbloquea progresivamente la siguiente casilla', () => {
  gameState.completarCasilla('tema_1', 1, 3);
  assert.equal(gameState.isCasillaDesbloqueada('tema_1', 2), true, 'casilla 2 desbloqueada');
  assert.equal(gameState.isCasillaDesbloqueada('tema_1', 3), false, 'casilla 3 sigue cerrada');

  gameState.completarCasilla('tema_1', 2, 2);
  assert.equal(gameState.isCasillaDesbloqueada('tema_1', 3), true);

  // Completar una casilla anterior no retrocede el desbloqueo.
  gameState.completarCasilla('tema_1', 1, 3);
  const progreso = gameState.getTemaProgreso('tema_1');
  assert.equal(progreso.casillaDesbloqueada, 3, 'el desbloqueo nunca retrocede');
});

test('completarCasilla conserva las mejores estrellas', () => {
  gameState.completarCasilla('tema_1', 1, 2);
  assert.equal(gameState.getEstrellasCasilla('tema_1', 1), 2);

  // Mejora: se queda con la mejor.
  gameState.completarCasilla('tema_1', 1, 3);
  assert.equal(gameState.getEstrellasCasilla('tema_1', 1), 3);

  // Repite con menos: conserva la mejor.
  gameState.completarCasilla('tema_1', 1, 1);
  assert.equal(gameState.getEstrellasCasilla('tema_1', 1), 3);
});

test('getEstrellasTotales suma las estrellas de todos los temas', () => {
  gameState.completarCasilla('tema_1', 1, 3);
  gameState.completarCasilla('tema_1', 2, 2);
  gameState.completarCasilla('tema_2', 1, 1);

  assert.equal(gameState.getEstrellasTotales(), 6);
  // Y queda persistido (saveState recalcula antes de guardar).
  const guardado = JSON.parse(storage.getItem(CLAVES.progreso));
  assert.equal(guardado.estrellasTotales, 6);
});

test('reiniciarProgresoTema borra estrellas y vuelve a la casilla 1', () => {
  gameState.completarCasilla('tema_1', 1, 3);
  gameState.completarCasilla('tema_1', 2, 3);
  gameState.reiniciarProgresoTema('tema_1');

  const progreso = gameState.getTemaProgreso('tema_1');
  assert.equal(progreso.casillaDesbloqueada, 1);
  assert.deepEqual(progreso.estrellas, {});
  assert.equal(gameState.getEstrellasCasilla('tema_1', 1), 0);

  // Reiniciar un tema no borra otros.
  gameState.completarCasilla('tema_2', 1, 2);
  gameState.reiniciarProgresoTema('tema_1');
  assert.equal(gameState.getEstrellasCasilla('tema_2', 1), 2);

  // Reiniciar un tema inexistente no revienta.
  assert.doesNotThrow(() => gameState.reiniciarProgresoTema('no_existe'));
});

test('el progreso se persiste en localStorage y se recupera al cargar', async () => {
  gameState.completarCasilla('tema_1', 1, 3);
  const guardado = storage.getItem(CLAVES.progreso);
  assert.ok(guardado, 'saveState escribe en localStorage');

  // Recargar el modulo simula una vuelta del jugador otro dia.
  assert.equal(storage.getItem(CLAVES.progreso), guardado);

  const recarga = await import('../src/state.js');
  assert.equal(recarga.gameState, gameState, 'el modulo cachea el singleton');
  assert.equal(recarga.gameState.getEstrellasCasilla('tema_1', 1), 3);
});

test('un localStorage corrupto no tumba el juego: arranca de cero', () => {
  storage.setItem(CLAVES.progreso, '{esto no es json');
  const avisos = [];
  const warnOriginal = console.warn;
  console.warn = (...args) => avisos.push(args.join(' '));
  try {
    const estado = gameState.loadState();
    assert.deepEqual(estado, estadoInicial());
    assert.ok(avisos.some(a => a.includes('JSON válido')), 'avisa del fallo');
  } finally {
    console.warn = warnOriginal;
  }
});

test('los temas avanzan de forma independiente', () => {
  gameState.completarCasilla('tema_A', 1, 3);
  // tema_B no hereda nada de tema_A.
  assert.equal(gameState.isCasillaDesbloqueada('tema_B', 2), false);
  assert.equal(gameState.getEstrellasCasilla('tema_B', 1), 0);
  assert.equal(gameState.getEstrellasTotales(), 3);
});