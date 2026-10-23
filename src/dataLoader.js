/**
 * Cargador de Catálogo y Capítulos Educativos
 */
import { defaultCatalogo, defaultHistoriaData } from './defaultData.js';
import { prepararCapituloParaCircuito } from './gameOrder.js';

export class DataLoader {
  static async loadCatalogo() {
    // 1. Probar carga vía fetch (servidores HTTP)
    try {
      const res = await fetch('data/catalogo.json');
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // Entorno offline o file://
    }

    // 2. Probar datos cargados mediante data/catalogo_data.js
    if (typeof window !== 'undefined' && window.CATALOGO_DATA) {
      return window.CATALOGO_DATA;
    }

    return defaultCatalogo;
  }

  static async loadCapitulo(capituloObj) {
    const capitulo = await DataLoader.cargarCapituloSinBarajar(capituloObj);
    // Cada entrada al circuito baraja los juegos entre sus paradas.
    return prepararCapituloParaCircuito(capitulo);
  }

  static async cargarCapituloSinBarajar(capituloObj) {
    if (!capituloObj) return defaultHistoriaData;

    // 1. Probar carga vía fetch (servidores HTTP)
    if (capituloObj.archivo) {
      try {
        const res = await fetch(capituloObj.archivo);
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        // Entorno offline o file://
      }
    }

    // 2. Probar datos cargados mediante data/catalogo_data.js
    if (typeof window !== 'undefined' && window.CAPITULOS_DATA) {
      if (capituloObj.id && window.CAPITULOS_DATA[capituloObj.id]) {
        return window.CAPITULOS_DATA[capituloObj.id];
      }
      if (capituloObj.archivo && window.CAPITULOS_DATA[capituloObj.archivo]) {
        return window.CAPITULOS_DATA[capituloObj.archivo];
      }
    }

    return defaultHistoriaData;
  }
}
