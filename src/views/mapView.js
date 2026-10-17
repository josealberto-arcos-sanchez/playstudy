/**
 * Vista del Tablero de Aventura en Circuito Circular (Loop)
 * - 6 casillas distribuidas en un circuito continuo
 * - Botón para volver al menú principal de capítulos
 * - Se puede recorrer una y otra vez para conseguir 3 estrellas en todas
 * - Podio central con la Corona de Oro al conseguir las 18 estrellas
 */
import { audio } from '../audio.js';
import { gameState } from '../state.js';

export class MapView {
  constructor(tema, onSelectCasilla, onResetProgress, onReturnMenu) {
    this.tema = tema;
    this.onSelectCasilla = onSelectCasilla;
    this.onResetProgress = onResetProgress;
    this.onReturnMenu = onReturnMenu;
  }

  render(container) {
    this.container = container;
    const progreso = gameState.getTemaProgreso(this.tema.id);
    const totalEstrellas = Object.values(progreso.estrellas).reduce((a, b) => a + b, 0);
    const totalPosibleEstrellas = this.tema.casillas.length * 3;
    const isPerfect = totalEstrellas >= totalPosibleEstrellas;

    this.container.innerHTML = `
      <div class="map-screen">
        <header class="app-header">
          <div class="header-left">
            <button class="btn-hud btn-back" id="btn-return-menu" title="Volver al menú de temas">
              <span>⬅️ Menú</span>
            </button>
            <span class="theme-badge-icon">${this.tema.icono}</span>
            <div class="theme-info">
              <h1 class="header-title">${this.tema.titulo}</h1>
              <span class="header-subtitle">${this.tema.subtitulo}</span>
            </div>
          </div>

          <div class="header-right">
            <div class="star-counter-pill" title="Estrellas en el circuito">
              <span>${isPerfect ? '👑' : '⭐'}</span>
              <strong id="header-stars-count">${totalEstrellas} / ${totalPosibleEstrellas}</strong>
            </div>

            <button class="btn-icon" id="btn-sound-toggle" title="Activar/Silenciar sonido">
              <span id="sound-icon">${audio.isEnabled() ? '🔊' : '🔇'}</span>
            </button>

            <button class="btn-icon btn-secondary-icon" id="btn-reset-topic" title="Reiniciar circuito">
              <span>🔄</span>
            </button>
          </div>
        </header>

        <main class="map-viewport">
          <div class="map-scenery">
            <div class="cloud cloud-1">☁️</div>
            <div class="cloud cloud-2">☁️</div>
            <div class="mountain-decor">⛰️</div>
            <div class="castle-decor">🏰</div>
          </div>

          <div class="circuit-stage">
            <svg class="circuit-svg" preserveAspectRatio="none" viewBox="0 0 1000 460">
              <path class="circuit-track-base" 
                    d="M 220,100 C 400,20 650,20 830,100 C 960,160 960,320 830,380 C 650,460 400,460 220,380 C 90,320 90,160 220,100 Z" />
              <path class="circuit-track-active" id="circuit-active-path"
                    d="M 220,100 C 400,20 650,20 830,100 C 960,160 960,320 830,380 C 650,460 400,460 220,380 C 90,320 90,160 220,100 Z" />
            </svg>

            <div class="circuit-center-hub ${isPerfect ? 'all-stars-perfect' : ''}">
              <div class="hub-trophy">${isPerfect ? '👑' : '🏆'}</div>
              <h3 class="hub-title">${isPerfect ? '¡CORONA DE ORO!' : 'Circuito del Tiempo'}</h3>
              <div class="hub-stars-badge">${totalEstrellas} de ${totalPosibleEstrellas} ⭐</div>
              <p class="hub-hint">
                ${isPerfect 
                  ? '¡Enhorabuena! Tienes 3 estrellas en todas las paradas.' 
                  : 'Recorre el circuito una y otra vez para conseguir 3⭐ en cada casilla.'}
              </p>
            </div>

            ${this.renderCircuitNodes()}
          </div>
        </main>

        <footer class="map-footer-tip">
          <span class="tip-icon">🔄</span>
          <span class="tip-text">¡Camino circular infinito! Puedes repetir cualquier casilla superada para mejorar tu récord de estrellas.</span>
        </footer>
      </div>
    `;

    this.bindEvents();
    this.updateCircuitPath();
  }

  renderCircuitNodes() {
    return this.tema.casillas.map((casilla) => {
      const isUnlocked = gameState.isCasillaDesbloqueada(this.tema.id, casilla.id);
      const stars = gameState.getEstrellasCasilla(this.tema.id, casilla.id);

      let statusClass = 'locked';
      if (isUnlocked) {
        if (stars === 3) {
          statusClass = 'three-stars';
        } else if (stars > 0) {
          statusClass = 'completed';
        } else {
          statusClass = 'current';
        }
      }

      return `
        <div class="circuit-node pos-${casilla.id} ${statusClass}" data-casilla-id="${casilla.id}">
          <button class="circuit-btn" ${!isUnlocked ? 'disabled' : ''}>
            <div class="circuit-btn-icon">
              ${isUnlocked ? casilla.icono : '🔒'}
            </div>
            ${stars > 0 ? `<div class="circuit-stars-tag">${'⭐'.repeat(stars)}</div>` : ''}
          </button>

          <div class="circuit-node-label">
            <span class="circuit-node-title">${casilla.titulo}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  bindEvents() {
    // Volver al menú de capítulos
    const returnBtn = this.container.querySelector('#btn-return-menu');
    if (returnBtn && this.onReturnMenu) {
      returnBtn.addEventListener('click', () => {
        audio.playClick();
        this.onReturnMenu();
      });
    }

    // Sonido toggle
    this.container.querySelector('#btn-sound-toggle').addEventListener('click', () => {
      const isEnabled = audio.toggleSound();
      this.container.querySelector('#sound-icon').textContent = isEnabled ? '🔊' : '🔇';
    });

    // Reiniciar circuito
    this.container.querySelector('#btn-reset-topic').addEventListener('click', () => {
      if (confirm('¿Quieres reiniciar las estrellas del circuito para empezar de nuevo?')) {
        audio.playClick();
        gameState.reiniciarProgresoTema(this.tema.id);
        this.render(this.container);
      }
    });

    // Clics en los nodos del circuito
    const nodeEls = this.container.querySelectorAll('.circuit-node');
    nodeEls.forEach(node => {
      node.addEventListener('click', () => {
        const casillaId = parseInt(node.dataset.casillaId, 10);
        const isUnlocked = gameState.isCasillaDesbloqueada(this.tema.id, casillaId);

        if (isUnlocked) {
          audio.playClick();
          const casillaData = this.tema.casillas.find(c => c.id === casillaId);
          this.onSelectCasilla(casillaData);
        } else {
          audio.playWrong();
          node.classList.add('shake');
          setTimeout(() => node.classList.remove('shake'), 400);
        }
      });
    });
  }

  updateCircuitPath() {
    const progreso = gameState.getTemaProgreso(this.tema.id);
    const pathActive = this.container.querySelector('#circuit-active-path');
    if (!pathActive) return;

    const totalLength = 2500;
    const totalCasillas = this.tema.casillas.length;
    let ratio = progreso.casillaDesbloqueada / (totalCasillas + 1);
    if (progreso.casillaDesbloqueada > totalCasillas) {
      ratio = 1.0;
    }

    pathActive.style.strokeDasharray = `${totalLength}`;
    pathActive.style.strokeDashoffset = `${totalLength * (1 - ratio)}`;
  }
}
