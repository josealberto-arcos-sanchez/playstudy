/**
 * Almacenamiento local centralizado.
 *
 * Todas las claves de `localStorage` del juego se declaran aquí, con el mismo
 * prefijo (`playstudy.*`), junto a helpers tolerantes a fallos (modo privado,
 * cuota llena, valor corrupto…) y la migración de las claves antiguas.
 *
 * Así se puede ver de un vistazo qué persiste el juego, borrar su estado sin
 * grepear el código y cambiar de esquema sin perder los datos del jugador.
 * Este módulo no toca `localStorage` en ningún otro sitio: el resto de módulos
 * solo usan `CLAVES` y los helpers de aquí.
 */

export const CLAVES = {
  /** Progreso del jugador: casillas desbloqueadas y estrellas. */
  progreso: 'playstudy.progreso.v3',
  /** Sonido de efectos activado (booleano como texto). */
  sonido: 'playstudy.sonido',
  /** Voz de la teoría silenciada (booleano como texto). */
  teoriaVozSilenciada: 'playstudy.teoria.voz_silenciada',
  /** Configuración del tutor con IA (proveedor, claves y modelos). */
  tutorIa: 'playstudy.tutor_ia.v1',
  /** Voz y velocidad elegidas para las explicaciones. */
  preferenciasVoz: 'playstudy.voces.v1',
  /** Marca interna: las claves antiguas ya se migraron. */
  migracion: 'playstudy.migracion.v1'
};

/** Claves anteriores a la centralización y su equivalente actual. */
export const CLAVES_ANTIGUAS = {
  aventura_educativa_state_v3: CLAVES.progreso,
  sound_enabled: CLAVES.sonido,
  playstudy_theory_mute: CLAVES.teoriaVozSilenciada,
  playstudy_ai_tutor_v1: CLAVES.tutorIa,
  playstudy_voice_settings_v1: CLAVES.preferenciasVoz
};

/**
 * Devuelve `localStorage` si está disponible. En Node, en algunos modos
 * privados o si el navegador bloquea el almacenamiento, devuelve `null` para
 * que el juego siga funcionando sin persistir nada.
 */
function obtenerAlmacen() {
  try {
    return globalThis.localStorage || null;
  } catch (error) {
    return null;
  }
}

/** Lee un texto. Devuelve `porDefecto` si la clave no existe o falla el acceso. */
export function leerTexto(clave, porDefecto = null) {
  const almacen = obtenerAlmacen();
  if (!almacen) return porDefecto;
  try {
    const valor = almacen.getItem(clave);
    return valor === null ? porDefecto : valor;
  } catch (error) {
    console.warn(`No se pudo leer «${clave}» del almacenamiento local:`, error);
    return porDefecto;
  }
}

/** Guarda un texto. Devuelve `true` si se guardó. */
export function guardarTexto(clave, valor) {
  const almacen = obtenerAlmacen();
  if (!almacen) return false;
  try {
    almacen.setItem(clave, String(valor));
    return true;
  } catch (error) {
    console.warn(`No se pudo guardar «${clave}» en el almacenamiento local:`, error);
    return false;
  }
}

/** Lee y deserializa un JSON. Un valor corrupto devuelve `porDefecto` y avisa. */
export function leerJSON(clave, porDefecto = null) {
  const texto = leerTexto(clave, null);
  if (texto === null) return porDefecto;
  try {
    return JSON.parse(texto);
  } catch (error) {
    console.warn(`El valor guardado en «${clave}» no es JSON válido; se usa el valor por defecto:`, error);
    return porDefecto;
  }
}

/** Serializa y guarda un valor. Devuelve `true` si se guardó. */
export function guardarJSON(clave, valor) {
  try {
    return guardarTexto(clave, JSON.stringify(valor));
  } catch (error) {
    console.warn(`No se pudo serializar el valor de «${clave}»:`, error);
    return false;
  }
}

/**
 * Lee un booleano guardado como texto. Los valores `'false'` y `'0'` son
 * falsos; cualquier otro valor presente es verdadero. Si no hay valor, se usa
 * `porDefecto`.
 */
export function leerBooleano(clave, porDefecto = false) {
  const valor = leerTexto(clave, null);
  if (valor === null) return porDefecto;
  return valor !== 'false' && valor !== '0';
}

/** Guarda un booleano como `'true'` o `'false'`. */
export function guardarBooleano(clave, valor) {
  return guardarTexto(clave, valor ? 'true' : 'false');
}

/** Elimina una clave. Devuelve `true` si se eliminó (o no existía). */
export function eliminarClave(clave) {
  const almacen = obtenerAlmacen();
  if (!almacen) return false;
  try {
    almacen.removeItem(clave);
    return true;
  } catch (error) {
    console.warn(`No se pudo eliminar «${clave}» del almacenamiento local:`, error);
    return false;
  }
}

/**
 * Traslada las claves antiguas a las nuevas una sola vez. Si la clave nueva ya
 * existe se conserva (tiene prioridad); en ambos casos se borra la antigua.
 * La marca `CLAVES.migracion` evita repetir el proceso en cada arranque.
 *
 * @param {Storage} [almacen] almacenamiento a migrar; por defecto, `localStorage`.
 * @returns {{ migradas: string[], error: Error|null }}
 */
export function migrarClavesAntiguas(almacen = obtenerAlmacen()) {
  const resultado = { migradas: [], error: null };
  if (!almacen) return resultado;

  try {
    if (almacen.getItem(CLAVES.migracion) === '1') return resultado;
  } catch (error) {
    resultado.error = error;
    return resultado;
  }

  for (const [antigua, nueva] of Object.entries(CLAVES_ANTIGUAS)) {
    try {
      const valor = almacen.getItem(antigua);
      if (valor === null) continue;
      if (almacen.getItem(nueva) === null) almacen.setItem(nueva, valor);
      almacen.removeItem(antigua);
      resultado.migradas.push(antigua);
    } catch (error) {
      resultado.error = error;
      console.warn(`No se pudo migrar la clave «${antigua}»:`, error);
    }
  }

  // Solo se marca como migrado si no ha fallado ninguna clave: así un error
  // puntual (cuota, modo privado) se reintenta en el siguiente arranque.
  if (!resultado.error) {
    try {
      almacen.setItem(CLAVES.migracion, '1');
    } catch (error) {
      resultado.error = error;
    }
  }

  if (resultado.migradas.length) {
    console.info(`[Almacenamiento] Claves migradas: ${resultado.migradas.join(', ')}`);
  }
  return resultado;
}

// Se ejecuta al importar el módulo, antes de que state/audio/etc. lean nada.
migrarClavesAntiguas();
