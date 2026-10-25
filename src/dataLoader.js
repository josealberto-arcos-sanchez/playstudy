/**
 * Cargador de Catálogo y Capítulos Educativos
 *
 * El contenido vive siempre en `data/` (contenido.json y catalogo.json).
 * `data/catalogo_data.js` es la copia generada por scripts/datos.mjs
 * para que el juego funcione también desde file://.
 */
import { montarJuegosDelTema, prepararCapituloParaCircuito } from './gameOrder.js';

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

    console.error(
      '[Datos] No se ha encontrado el catálogo. Ejecuta "npm run datos" o abre el juego desde un servidor web.'
    );
    return null;
  }

  static async loadCapitulo(capituloObj, temaObj = null) {
    const capitulo = await DataLoader.cargarCapituloSinBarajar(capituloObj);
    if (!capitulo) return null;
    // El tema decide qué juegos se muestran; después se barajan las paradas.
    const conJuegos = montarJuegosDelTema(capitulo, temaObj);
    return prepararCapituloParaCircuito(conJuegos);
  }

  static async cargarCapituloSinBarajar(capituloObj) {
    if (!capituloObj) return null;

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

    console.error(
      `[Datos] No se ha encontrado el contenido de «${capituloObj.id || capituloObj.archivo}». Sincroniza los datos con "npm run datos".`
    );
    return null;
  }
}
