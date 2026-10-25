import { CLAVES, leerJSON, guardarJSON } from './storage.js';

/**
 * Gestor de Estado y Progreso del Jugador
 * Guarda y recupera de forma persistente con los helpers de `storage.js`:
 * - Progreso por tema (casillas desbloqueadas)
 * - Estrellas ganadas por casilla
 * - Puntuaciones máximas
 */
class StateManager {
  constructor() {
    this.storageKey = CLAVES.progreso;
    this.state = this.loadState();
  }

  loadState() {
    const saved = leerJSON(this.storageKey, null);
    if (saved && typeof saved === 'object') {
      return saved;
    }
    return {
      temas: {}, // { [temaId]: { casillaDesbloqueada: 1, estrellas: { 1: 3, 2: 3 } } }
      temaActualId: 'cap_01_edades',
      estrellasTotales: 0
    };
  }

  saveState() {
    this.recalcularEstrellasTotales();
    guardarJSON(this.storageKey, this.state);
  }

  recalcularEstrellasTotales() {
    let total = 0;
    Object.values(this.state.temas).forEach(t => {
      if (t.estrellas) {
        Object.values(t.estrellas).forEach(cant => {
          total += Number(cant) || 0;
        });
      }
    });
    this.state.estrellasTotales = total;
  }

  getTemaProgreso(temaId) {
    if (!this.state.temas[temaId]) {
      this.state.temas[temaId] = {
        casillaDesbloqueada: 1, // Casilla 1 empieza desbloqueada
        estrellas: {}
      };
    }
    return this.state.temas[temaId];
  }

  isCasillaDesbloqueada(temaId, casillaId) {
    const progreso = this.getTemaProgreso(temaId);
    return casillaId <= progreso.casillaDesbloqueada;
  }

  getEstrellasCasilla(temaId, casillaId) {
    const progreso = this.getTemaProgreso(temaId);
    return progreso.estrellas[casillaId] || 0;
  }

  completarCasilla(temaId, casillaId, estrellas = 3) {
    const progreso = this.getTemaProgreso(temaId);
    // Guardar mejores estrellas
    const actual = progreso.estrellas[casillaId] || 0;
    if (estrellas > actual) {
      progreso.estrellas[casillaId] = estrellas;
    }
    // Desbloquear siguiente casilla
    if (progreso.casillaDesbloqueada <= casillaId) {
      progreso.casillaDesbloqueada = casillaId + 1;
    }
    this.saveState();
  }

  reiniciarProgresoTema(temaId) {
    if (this.state.temas[temaId]) {
      this.state.temas[temaId] = {
        casillaDesbloqueada: 1,
        estrellas: {}
      };
      this.saveState();
    }
  }

  getEstrellasTotales() {
    return this.state.estrellasTotales || 0;
  }
}

export const gameState = new StateManager();
