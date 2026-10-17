/**
 * Gestor de Estado y Progreso del Jugador
 * Guarda y recupera de forma persistente en localStorage:
 * - Progreso por tema (casillas desbloqueadas)
 * - Estrellas ganadas por casilla
 * - Puntuaciones máximas
 */
class StateManager {
  constructor() {
    this.storageKey = 'aventura_educativa_state_v1';
    this.state = this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("No se pudo cargar el progreso, iniciando nuevo:", e);
    }
    return {
      temas: {}, // { [temaId]: { casillaDesbloqueada: 1, estrellas: { 1: 3, 2: 3 } } }
      temaActualId: 'edades_historia',
      estrellasTotales: 0
    };
  }

  saveState() {
    try {
      this.recalcularEstrellasTotales();
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.warn("No se pudo guardar el progreso:", e);
    }
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
