/**
 * Orden aleatorio de los juegos dentro de un circuito.
 *
 * Los minijuegos se barajan entre las paradas reservadas para juegos, pero
 * nunca cambian de sitio la teoría ni los quizzes. Así se conserva la
 * secuencia didáctica (teoría -> quiz) y el progreso sigue asociado a cada
 * parada, no al juego que la ocupa en ese momento.
 *
 * El tema elige sus dos juegos en `juegos` y el capítulo guarda el material
 * de cada minijuego en su catálogo `juegos`. El montaje y el barajado son
 * genéricos: añadir un juego nuevo no requiere tocar este módulo.
 */

/** Tipos de casilla que se consideran juegos y, por tanto, se barajan. */
export const TIPOS_JUEGO = Object.freeze(['minijuego']);

/** Devuelve true si la casilla es un juego que debe entrar en el barajado. */
export function esCasillaDeJuego(casilla) {
  return Boolean(casilla) && TIPOS_JUEGO.includes(casilla.tipo);
}

/**
 * Devuelve la lista de juegos configurada para un tema.
 * Ejemplo en data/catalogo.json:
 *   "juegos": ["parejas", "linea_tiempo"]
 * Si el tema no define nada, devuelve null (modo compatible).
 */
export function obtenerJuegosDelTema(tema) {
  if (!tema || !Array.isArray(tema.juegos)) return null;

  const juegos = tema.juegos
    .filter(subtipo => typeof subtipo === 'string' && subtipo.trim())
    .map(subtipo => subtipo.trim());

  return juegos.length ? Array.from(new Set(juegos)) : null;
}

/** Antepone el número de parada al título, eliminando cualquier número previo. */
function numerarTitulo(titulo, numeroParada) {
  const limpio = String(titulo || 'Juego').replace(/^\s*\d+\s*[.)-]\s*/, '');
  return `${numeroParada}. ${limpio}`;
}

/**
 * Coloca en las paradas de juego del capítulo los dos juegos elegidos por el tema.
 *
 * El capítulo puede definir un catálogo de juegos en `juegos` (clave = subtipo).
 * Así un mismo capítulo conserva material de varios juegos, pero el circuito
 * solo muestra los que el tema tenga configurados. Los capítulos antiguos que
 * llevan los juegos dentro de las casillas siguen funcionando sin cambios.
 *
 * @param {Object} capitulo Capítulo cargado desde contenido.json.
 * @param {Object|null} tema Tema del catálogo con la propiedad `juegos`.
 * @returns {Object} Capítulo con las casillas de juego ya montadas.
 */
export function montarJuegosDelTema(capitulo, tema = null) {
  if (!capitulo || !Array.isArray(capitulo.casillas)) return capitulo;

  const pool = capitulo.juegos;
  if (!pool || typeof pool !== 'object' || Array.isArray(pool)) return capitulo;

  const slots = capitulo.casillas.filter(esCasillaDeJuego);
  if (slots.length === 0) return capitulo;

  const disponibles = Object.keys(pool).filter(subtipo => {
    const juego = pool[subtipo];
    return juego && typeof juego === 'object' && !Array.isArray(juego);
  });
  if (disponibles.length === 0) return capitulo;

  const configurados = obtenerJuegosDelTema(tema);
  let seleccion = configurados
    ? configurados.filter(subtipo => disponibles.includes(subtipo))
    : disponibles.slice();

  if (configurados) {
    const ausentes = configurados.filter(subtipo => !disponibles.includes(subtipo));
    if (ausentes.length) {
      console.warn(`[Juegos] El tema pide juegos que el capítulo "${capitulo.id}" no define:`, ausentes.join(', '));
    }
  }

  if (seleccion.length < slots.length) {
    console.warn(`[Juegos] Faltan juegos configurados en "${capitulo.id}"; se completan con los disponibles.`);
    const resto = disponibles.filter(subtipo => !seleccion.includes(subtipo));
    seleccion = seleccion.concat(resto).slice(0, slots.length);
  }

  if (seleccion.length > slots.length) {
    console.warn(`[Juegos] El circuito solo tiene ${slots.length} paradas de juego; se usarán las primeras.`);
    seleccion = seleccion.slice(0, slots.length);
  }

  let indiceJuego = 0;
  const casillas = capitulo.casillas.map(casilla => {
    if (!esCasillaDeJuego(casilla)) return casilla;

    const subtipo = seleccion[indiceJuego];
    indiceJuego++;

    if (!subtipo) return casilla;
    const juego = pool[subtipo];

    return {
      ...casilla,
      ...juego,
      id: casilla.id,
      tipo: 'minijuego',
      subtipo,
      titulo: numerarTitulo(juego.titulo, casilla.id)
    };
  });

  return { ...capitulo, casillas };
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
