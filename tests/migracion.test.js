/**
 * Test de integracion de la migracion de claves antiguas.
 *
 * Este archivo se ejecuta en su propio proceso: las claves viejas se escriben
 * en el localStorage falso ANTES de importar storage.js y los modulos que lo
 * usan, igual que le pasaria a un jugador que actualiza el juego.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { MockStorage } from './helpers.js';

const storage = new MockStorage();
storage.setItem('aventura_educativa_state_v3', JSON.stringify({
  temas: {
    tema_1: { casillaDesbloqueada: 2, estrellas: { 1: 3 } }
  },
  temaActualId: 'cap_01_edades',
  estrellasTotales: 3
}));
storage.setItem('sound_enabled', 'false');
storage.setItem('playstudy_theory_mute', 'true');
storage.setItem('playstudy_ai_tutor_v1', JSON.stringify({
  version: 1,
  provider: 'anthropic',
  keys: { anthropic: 'sk-ant-prueba' },
  models: { anthropic: 'claude-haiku-4-5' }
}));
storage.setItem('playstudy_voice_settings_v1', JSON.stringify({
  version: 1,
  mode: 'auto',
  voice: null,
  rate: 1.1
}));
globalThis.localStorage = storage;

const { CLAVES } = await import('../src/storage.js');
const { gameState } = await import('../src/state.js');
const { audio } = await import('../src/audio.js');
const { speechManager } = await import('../src/speech.js');
const { aiTutor } = await import('../src/aiTutor.js');

test('las claves antiguas se migran al importar el almacenamiento central', () => {
  assert.equal(storage.getItem(CLAVES.migracion), '1');
  [
    'aventura_educativa_state_v3',
    'sound_enabled',
    'playstudy_theory_mute',
    'playstudy_ai_tutor_v1',
    'playstudy_voice_settings_v1'
  ].forEach(antigua => {
    assert.equal(storage.getItem(antigua), null, `se borra la clave antigua «${antigua}»`);
  });
  assert.notEqual(storage.getItem(CLAVES.progreso), null);
  assert.notEqual(storage.getItem(CLAVES.sonido), null);
  assert.notEqual(storage.getItem(CLAVES.teoriaVozSilenciada), null);
  assert.notEqual(storage.getItem(CLAVES.tutorIa), null);
  assert.notEqual(storage.getItem(CLAVES.preferenciasVoz), null);
});

test('el progreso antiguo sigue disponible tras la migracion', () => {
  assert.equal(gameState.getEstrellasCasilla('tema_1', 1), 3);
  assert.equal(gameState.isCasillaDesbloqueada('tema_1', 2), true);
  assert.equal(gameState.getEstrellasTotales(), 3);
});

test('la configuracion antigua de audio y voz se conserva', () => {
  assert.equal(audio.isEnabled(), false);
  assert.equal(speechManager.getPreference().rate, 1.1);
});

test('la configuracion antigua del tutor con IA se conserva', () => {
  const settings = aiTutor.getSettings();
  assert.equal(settings.provider, 'anthropic');
  assert.equal(settings.hasKey, true);
  assert.equal(settings.model, 'claude-haiku-4-5');
});
