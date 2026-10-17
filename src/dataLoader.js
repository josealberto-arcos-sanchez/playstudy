/**
 * Cargador de Catálogo y Capítulos Educativos
 */
import { defaultCatalogo, defaultHistoriaData } from './defaultData.js';

export class DataLoader {
  static async loadCatalogo() {
    try {
      const res = await fetch('data/catalogo.json');
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.info("Usando catálogo por defecto embebido:", e.message);
    }
    return defaultCatalogo;
  }

  static async loadCapitulo(capituloObj) {
    if (capituloObj && capituloObj.archivo) {
      try {
        const res = await fetch(capituloObj.archivo);
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        console.info(`Cargando capítulo '${capituloObj.id}' desde datos embebidos.`);
      }
    }
    return defaultHistoriaData;
  }
}
