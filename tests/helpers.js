/**
 * Utilidades comunes para los tests.
 *
 * El proyecto no tiene dependencias: todo se resuelve con `node:test`
 * (incluido en Node >= 18) y pequeños mocks en memoria.
 */

/** localStorage en memoria para poder probar modulos que persisten estado. */
export class MockStorage {
  constructor() {
    this.map = new Map();
  }
  getItem(key) {
    return this.map.has(key) ? this.map.get(key) : null;
  }
  setItem(key, value) {
    this.map.set(key, String(value));
  }
  removeItem(key) {
    this.map.delete(key);
  }
  clear() {
    this.map.clear();
  }
}

/** Instala el mock como localStorage global antes de importar modulos que lo usan. */
export function instalarLocalStorageGlobal() {
  const storage = new MockStorage();
  globalThis.localStorage = storage;
  return storage;
}

/** Generador aleatorio determinista (inyectable en las funciones que aceptan `random`). */
export function crearRandomDeterminista(semilla = 42) {
  // LCG clasico: suficiente para tests reproducibles.
  let estado = semilla >>> 0;
  return () => {
    estado = (Math.imul(estado, 1664525) + 1013904223) >>> 0;
    return estado / 0x100000000;
  };
}