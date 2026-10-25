/**
 * Reglas de la respuesta correcta de los quizzes.
 *
 * Formatos aceptados en `contenido.json`:
 * - `"correcta": "texto exacto de una opción"` (recomendado): es explícito y
 *   sigue siendo correcto aunque se reordenen las opciones.
 * - `"correcta": 0` (formato heredado): índice basado en cero de la opción
 *   correcta dentro de `opciones`.
 *
 * Esta función es la única implementación de la regla: la usan el motor del
 * quiz (`src/views/quizView.js`) y el validador del pipeline
 * (`scripts/datos.mjs`), para que contenido y juego no puedan discrepar.
 */

/**
 * Resuelve la respuesta correcta de una pregunta.
 *
 * @param {{ opciones?: unknown[], correcta?: unknown }} pregunta
 * @returns {{ indice: number, error?: string }} Índice de la opción correcta
 *   (o -1 si la pregunta no es válida) y, si procede, el motivo del error.
 */
export function resolverRespuestaCorrecta(pregunta) {
  const opciones = Array.isArray(pregunta?.opciones) ? pregunta.opciones : [];
  const correcta = pregunta?.correcta;

  if (typeof correcta === 'string') {
    const indice = opciones.indexOf(correcta);
    if (indice === -1) {
      return {
        indice: -1,
        error: `la respuesta correcta «${correcta}» no coincide con ninguna opcion`
      };
    }
    if (opciones.indexOf(correcta, indice + 1) !== -1) {
      return {
        indice: -1,
        error: `la respuesta correcta «${correcta}» aparece en varias opciones`
      };
    }
    return { indice };
  }

  if (Number.isInteger(correcta)) {
    if (correcta < 0 || correcta >= opciones.length) {
      return {
        indice: -1,
        error: `el indice de la respuesta correcta (${correcta}) no apunta a ninguna opcion`
      };
    }
    return { indice: correcta };
  }

  return {
    indice: -1,
    error: "'correcta' debe ser el texto exacto de una opcion o su indice numerico"
  };
}
