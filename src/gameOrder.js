/**
 * Orden aleatorio de los juegos dentro de un circuito.
 *
 * Los minijuegos se barajan entre las paradas reservadas para juegos, pero
 * nunca cambian de sitio la teoría ni los quizzes. Así se conserva la
 * secuencia didáctica (teoría -> quiz) y el progreso sigue asociado a cada
 * parada, no al juego que la ocupa en ese momento.
 *
 * Para añadir nuevos juegos en el futuro basta con crear casillas con
 * "tipo": "minijuego" y un "subtipo" propio; el barajado es genérico y
 * funciona con cualquier número de juegos.
 */

/** Tipos de casilla que se consideran juegos y, por tanto, se barajan. */
export const TIPOS_JUEGO = Object.freeze(['minijuego']);

/** Devuelve true si la casilla es un juego que debe entrar en el barajado. */
export function esCasillaDeJuego(casilla) {
  return Boolean(casilla) && TIPOS_JUEGO.includes(casilla.tipo);
}

/** Barajado Fisher-Yates sobre una copia del array. */
function mezclar(array, random) {
  const resultado = array.slice();
  for (let i = resultado.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [resultado[i], resultado[j]] = [resultado[j], resultado[i]];
  }
  return resultado;
}

/**
 * Renumera el título del juego para que coincida con la parada que ocupa.
 * Ejemplo: "4. Puzzle..." en la parada 1 pasa a "1. Puzzle...".
 */
function renumerarTitulo(titulo, numeroParada) {
  if (typeof titulo !== 'string') return titulo;

  const prefijo = /^\s*\d+\s*[.)-]\s*/;
  if (prefijo.test(titulo)) {
    return titulo.replace(prefijo, `${numeroParada}. `);
  }

  return titulo;
}

/**
 * Baraja los juegos del circuito entre sus paradas de juego.
 *
 * - Conserva el id de cada parada para no romper estrellas ni desbloqueos.
 * - Mantiene teoría y quizzes exactamente en su posición.
 * - Si hay menos de dos juegos no hace nada.
 *
 * @param {Array} casillas Casillas del capítulo.
 * @param {Function} random Generador aleatorio (inyectable en pruebas).
 * @returns {Array} Nueva lista de casillas con los juegos reordenados.
 */
export function barajarJuegosCircuito(casillas, random = Math.random) {
  if (!Array.isArray(casillas)) return casillas;

  const indicesDeJuego = [];
  const juegos = [];

  casillas.forEach((casilla, index) => {
    if (esCasillaDeJuego(casilla)) {
      indicesDeJuego.push(index);
      juegos.push(casilla);
    }
  });

  if (juegos.length < 2) return casillas;

  const juegosMezclados = mezclar(juegos, random);
  const resultado = casillas.slice();

  indicesDeJuego.forEach((slotIndex, i) => {
    const parada = casillas[slotIndex];
    const juego = juegosMezclados[i];

    resultado[slotIndex] = {
      ...juego,
      id: parada.id,
      titulo: renumerarTitulo(juego.titulo, parada.id)
    };
  });

  return resultado;
}

/**
 * Devuelve una copia del capítulo con los juegos barajados.
 * Se llama cada vez que se carga un capítulo para entrar en su circuito.
 */
export function prepararCapituloParaCircuito(capitulo, random = Math.random) {
  if (!capitulo || !Array.isArray(capitulo.casillas)) return capitulo;

  const casillas = barajarJuegosCircuito(capitulo.casillas, random);
  if (casillas === capitulo.casillas) return capitulo;

  return { ...capitulo, casillas };
}
