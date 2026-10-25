/**
 * Tests de la regla compartida de respuesta correcta (src/quiz.js).
 *
 * El motor del quiz y el validador del pipeline usan esta función, así que
 * aquí se cubren los dos formatos aceptados y los casos que deben rechazarse.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { resolverRespuestaCorrecta } from '../src/quiz.js';

function pregunta(correcta, opciones = ['Uno', 'Dos', 'Tres']) {
  return { enunciado: 'Pregunta de prueba', opciones, correcta };
}

test('resuelve la respuesta correcta por el texto exacto de la opcion', () => {
  assert.deepEqual(resolverRespuestaCorrecta(pregunta('Dos')), { indice: 1 });
});

test('mantiene el formato heredado basado en indices', () => {
  assert.deepEqual(resolverRespuestaCorrecta(pregunta(0)), { indice: 0 });
  assert.deepEqual(resolverRespuestaCorrecta(pregunta(2)), { indice: 2 });
});

test('el texto sigue apuntando a la misma respuesta aunque se reordenen las opciones', () => {
  const original = pregunta('Dos');
  assert.equal(resolverRespuestaCorrecta(original).indice, 1);

  original.opciones = ['Tres', 'Uno', 'Dos'];
  assert.equal(resolverRespuestaCorrecta(original).indice, 2);
});

test('rechaza textos que no coinciden con ninguna opcion', () => {
  const { indice, error } = resolverRespuestaCorrecta(pregunta('Cuatro'));
  assert.equal(indice, -1);
  assert.match(error, /no coincide con ninguna opcion/);
});

test('rechaza indices fuera de rango o no enteros', () => {
  for (const valor of [-1, 3, 1.5]) {
    const { indice, error } = resolverRespuestaCorrecta(pregunta(valor));
    assert.equal(indice, -1);
    assert.ok(error, `el valor ${valor} debe devolver un error`);
  }
});

test('rechaza tipos que no son texto ni indice', () => {
  for (const valor of [null, true, { texto: 'Dos' }, ['Dos']]) {
    const { indice, error } = resolverRespuestaCorrecta(pregunta(valor));
    assert.equal(indice, -1);
    assert.match(error, /debe ser el texto exacto/);
  }
});

test('rechaza una respuesta correcta que aparece en varias opciones', () => {
  const { indice, error } = resolverRespuestaCorrecta({
    opciones: ['Dos', 'Dos', 'Tres'],
    correcta: 'Dos'
  });
  assert.equal(indice, -1);
  assert.match(error, /varias opciones/);
});

test('rechaza preguntas sin opciones o sin datos', () => {
  assert.equal(resolverRespuestaCorrecta({ correcta: 0 }).indice, -1);
  assert.equal(resolverRespuestaCorrecta({ opciones: [], correcta: 0 }).indice, -1);
  assert.equal(resolverRespuestaCorrecta(null).indice, -1);
});
