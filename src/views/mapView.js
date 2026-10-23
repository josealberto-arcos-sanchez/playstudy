/**
 * Vista del Tablero de Aventura en Circuito Circular (Loop)
 * - 6 casillas distribuidas sobre un camino de arena con textura
 * - Botón para volver al menú principal de capítulos
 * - Se puede recorrer una y otra vez para conseguir 3 estrellas en todas
 * - Placa central con la Corona de Oro al conseguir las 18 estrellas
 */

import { audio } from '../audio.js';
import { gameState } from '../state.js';
import { SettingsView } from './settingsView.js';

/* Geometría del camino (viewBox 1000 x 560) */
const TRACK_PATH = 'M 330 120 H 750 A 110 110 0 0 1 860 230 V 330 A 110 110 0 0 1 750 440 H 250 A 110 110 0 0 1 140 330 V 230 A 110 110 0 0 1 250 120 H 330 Z';

/* Centros de las 6 paradas, en el mismo sistema de coordenadas */
const NODE_POINTS = [
  { x: 330, y: 120 },
  { x: 670, y: 120 },
  { x: 860, y: 280 },
  { x: 670, y: 440 },
  { x: 330, y: 440 },
  { x: 140, y: 280 }
];

const VIEW_W = 1000;
const VIEW_H = 560;

export class MapView {
  constructor(tema, onSelectCasilla, onResetProgress, onReturnMenu) {
    this.tema = tema;
    this.onSelectCasilla = onSelectCasilla;
    this.onResetProgress = onResetProgress;
    this.onReturnMenu = onReturnMenu;
    this.settingsView = null;
    this.nodeFractions = null;
  }

  render(container) {
    this.container = container;
    const progreso = gameState.getTemaProgreso(this.tema.id);
    const totalEstrellas = Object.values(progreso.estrellas).reduce((a, b) => a + b, 0);
    const totalPosibleEstrellas = this.tema.casillas.length * 3;
    const isPerfect = totalEstrellas >= totalPosibleEstrellas;
    const progresoPct = totalPosibleEstrellas > 0
      ? Math.round((totalEstrellas / totalPosibleEstrellas) * 100)
      : 0;

    this.container.innerHTML = `
      <div class="map-screen ${isPerfect ? 'all-stars' : ''}">
        <header class="app-header map-header">
          <div class="header-left">
            <button class="btn-hud btn-back" id="btn-return-menu" title="Volver al menú de temas">
              <span>⬅️ Menú</span>
            </button>
            <span class="theme-badge-icon">${this.tema.icono}</span>
            <div class="theme-info">
              <h1 class="header-title" title="${this.tema.titulo}">${this.tema.titulo}</h1>
              <span class="header-subtitle" title="${this.tema.subtitulo}">${this.tema.subtitulo}</span>
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

            <button class="btn-icon" id="btn-map-settings" title="Configuración" aria-label="Configuración">⚙️</button>

            <button class="btn-icon btn-secondary-icon" id="btn-reset-topic" title="Reiniciar circuito">
              <span>🔄</span>
            </button>
          </div>
        </header>

        <main class="map-viewport">
          <div class="map-scenery" aria-hidden="true">
            <div class="map-sun"></div>
            <div class="map-cloud cloud-1"></div>
            <div class="map-cloud cloud-2"></div>
            <div class="map-cloud cloud-3"></div>
            <div class="map-hills">
              <div class="map-hill hill-back"></div>
              <div class="map-hill hill-mid"></div>
              <div class="map-hill hill-front"></div>
            </div>
            <div class="map-tree tree-1"></div>
            <div class="map-tree tree-2"></div>
            <div class="map-tree tree-3"></div>
            <div class="map-tree tree-4"></div>
          </div>

          <div class="circuit-stage">
            <svg class="circuit-svg" preserveAspectRatio="none" viewBox="0 0 ${VIEW_W} ${VIEW_H}" aria-hidden="true">
              <defs>
                <linearGradient id="mapTrackSand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#fffaf0" />
                  <stop offset="55%" stop-color="#f6e6c2" />
                  <stop offset="100%" stop-color="#eed9a9" />
                </linearGradient>
                <linearGradient id="mapTrackGold" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#fcd34d" />
                  <stop offset="45%" stop-color="#f59e0b" />
                  <stop offset="100%" stop-color="#ea8a0c" />
                </linearGradient>
              </defs>

              <path class="circuit-track circuit-track-shadow" d="${TRACK_PATH}" />
              <path class="circuit-track circuit-track-rim" d="${TRACK_PATH}" />
              <path class="circuit-track circuit-track-base" d="${TRACK_PATH}" />
              <path class="circuit-track circuit-track-dashes" d="${TRACK_PATH}" />
              <path class="circuit-track circuit-track-active" id="circuit-active-path" d="${TRACK_PATH}" />
            </svg>

            <div class="circuit-center-hub ${isPerfect ? 'all-stars-perfect' : ''}">
              <div class="hub-emblem">${isPerfect ? '👑' : '🏆'}</div>
              <h3 class="hub-title">${isPerfect ? '¡Corona de Oro!' : 'Circuito del Tiempo'}</h3>
              <div class="hub-progress">
                <div class="hub-progress-track">
                  <span class="hub-progress-fill" style="width: ${progresoPct}%"></span>
                </div>
                <span class="hub-stars-badge">${totalEstrellas} / ${totalPosibleEstrellas} ⭐</span>
              </div>
              <p class="hub-hint">
                ${isPerfect
                  ? '¡Enhorabuena! Tienes 3 estrellas en todas las paradas.'
                  : 'Recorre el circuito una y otra vez para conseguir 3⭐ en cada parada.'}
              </p>
            </div>

            ${this.renderCircuitNodes()}
          </div>
        </main>

        <footer class="map-footer-tip">
          <span class="tip-icon">🧭</span>
          <span class="tip-text">Camino circular infinito: puedes repetir cualquier parada superada para mejorar tu récord de estrellas.</span>
        </footer>
      </div>
    `;

    this.bindEvents();
    this.updateCircuitPath();
  }

  renderCircuitNodes() {
    return this.tema.casillas.map((casilla, index) => {
      const isUnlocked = gameState.isCasillaDesbloqueada(this.tema.id, casilla.id);
      const stars = gameState.getEstrellasCasilla(this.tema.id, casilla.id);
      const point = NODE_POINTS[index % NODE_POINTS.length];

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

      const labelPosition = point.y < VIEW_H / 2 ? '' : 'label-below';
      const cleanTitle = String(casilla.titulo || '').replace(/^\s*\d+[.)]\s*/, '');

      return `
        <div class="circuit-node ${statusClass} ${labelPosition}"
             data-casilla-id="${casilla.id}"
             style="--nx: ${((point.x / VIEW_W) * 100).toFixed(2)}%; --ny: ${((point.y / VIEW_H) * 100).toFixed(2)}%;">
          <div class="circuit-node-label">
            <span class="circuit-node-step">Parada ${casilla.id}</span>
            <span class="circuit-node-title">${cleanTitle}</span>
          </div>

          <button class="circuit-btn" ${!isUnlocked ? 'disabled' : ''} aria-label="${cleanTitle}">
            <span class="circuit-btn-number">${casilla.id}</span>
            <span class="circuit-btn-icon">${isUnlocked ? casilla.icono : '🔒'}</span>
            ${stars > 0 ? `<span class="circuit-stars-tag">${'⭐'.repeat(stars)}</span>` : ''}
          </button>
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

    this.container.querySelector('#btn-map-settings').addEventListener('click', event => {
      audio.playClick();
      if (!this.settingsView?.isOpen) this.settingsView = new SettingsView();
      this.settingsView.render(event.currentTarget);
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

  cleanup() {
    this.settingsView?.cleanup();
    this.settingsView = null;
  }

  /** Calcula en qué punto del camino está cada parada (0..1) */
  computeNodeFractions(pathEl) {
    const totalLength = pathEl.getTotalLength();
    if (!totalLength) return NODE_POINTS.map((_, i) => i / NODE_POINTS.length);

    const steps = 240;
    return NODE_POINTS.map(point => {
      let bestFraction = 0;
      let bestDistance = Infinity;

      for (let i = 0; i <= steps; i++) {
        const fraction = i / steps;
        const p = pathEl.getPointAtLength(totalLength * fraction);
        const dx = p.x - point.x;
        const dy = p.y - point.y;
        const distance = dx * dx + dy * dy;

        if (distance < bestDistance) {
          bestDistance = distance;
          bestFraction = fraction;
        }
      }

      return bestFraction;
    });
  }

  updateCircuitPath() {
    const pathActive = this.container.querySelector('#circuit-active-path');
    if (!pathActive) return;

    const totalLength = pathActive.getTotalLength();
    if (!totalLength) return;

    if (!this.nodeFractions) {
      this.nodeFractions = this.computeNodeFractions(pathActive);
    }

    const progreso = gameState.getTemaProgreso(this.tema.id);
    const totalCasillas = this.tema.casillas.length;
    let ratio;

    if (progreso.casillaDesbloqueada > totalCasillas) {
      ratio = 1;
    } else {
      const index = Math.max(0, Math.min(progreso.casillaDesbloqueada - 1, totalCasillas - 1));
      ratio = totalCasillas === this.nodeFractions.length
        ? this.nodeFractions[index]
        : index / totalCasillas;
    }

    pathActive.style.strokeDasharray = `${totalLength * ratio} ${totalLength}`;
    pathActive.style.strokeDashoffset = '0';
  }
}
