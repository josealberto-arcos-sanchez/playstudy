/**
 * Minijuego de la Línea del Tiempo
 * - Ordena acontecimientos históricos del más antiguo al más reciente.
 * - El orden del array "eventos" del contenido.json es el orden correcto.
 * - Interacción táctil: toca una tarjeta y luego otra para intercambiarlas.
 * - Las fechas se pueden ocultar para convertir el juego en un reto de memoria.
 */
import { audio } from '../audio.js';
import { gameState } from '../state.js';

export class TimelineGame {
  constructor(tema, casillaData, onComplete, onExit) {
    this.tema = tema;
    this.casillaData = casillaData;
    this.onComplete = onComplete;
    this.onExit = onExit;

    this.eventos = Array.isArray(casillaData.eventos) ? casillaData.eventos : [];
    this.total = this.eventos.length;

    this.board = [];
    this.selected = null;
    this.moves = 0;
    this.checks = 0;
    this.timerSeconds = 0;
    this.timerInterval = null;
    this.messageTimeout = null;
    this.isVictory = false;
    this.showDates = casillaData.mostrar_fechas !== false;
  }

  render(container) {
    if (this.total < 2) {
      container.innerHTML = `
        <div class="game-wrapper timeline-wrapper">
          <header class="game-hud">
            <button class="btn-hud btn-back" id="btn-timeline-exit"><span>⬅️ Circuito</span></button>
            <div class="hud-center"><h2 class="game-title">${this.casillaData.titulo}</h2></div>
            <span></span>
          </header>
          <div class="timeline-empty">
            <p>🕰️ Este juego necesita al menos dos acontecimientos en <code>eventos</code>.</p>
          </div>
        </div>
      `;
      container.querySelector('#btn-timeline-exit').addEventListener('click', () => {
        audio.playClick();
        this.onExit();
      });
      return;
    }

    this.container = container;
    this.container.innerHTML = `
      <div class="game-wrapper timeline-wrapper">
        <header class="game-hud">
          <button class="btn-hud btn-back" id="btn-timeline-exit" title="Volver al circuito">
            <span>⬅️ Circuito</span>
          </button>

          <div class="hud-center">
            <h2 class="game-title">${this.casillaData.titulo}</h2>
            <div class="hud-stats">
              <span class="stat-pill">⏳ <strong id="tl-timer">00:00</strong></span>
              <span class="stat-pill">🔄 Cambios: <strong id="tl-moves">0</strong></span>
              <span class="stat-pill" title="Comprobaciones realizadas">✅ Comprob.: <strong id="tl-checks">0</strong></span>
            </div>
          </div>

          <div class="hud-actions">
            <button class="btn-hud btn-dates" id="btn-timeline-dates" title="Mostrar u ocultar las fechas">
              <span id="tl-dates-label">🙈 Ocultar fechas</span>
            </button>
            <button class="btn-hud btn-restart" id="btn-timeline-restart" title="Volver a mezclar">
              <span>🔄 Reiniciar</span>
            </button>
          </div>
        </header>

        <div class="timeline-stage">
          <p class="timeline-instructions">
            🧭 Ordena los acontecimientos del <strong>más antiguo</strong> al <strong>más reciente</strong>.
            Toca dos tarjetas para cambiarlas de sitio. Si no caben todas, desliza la línea.
          </p>

          <div class="timeline-track" id="timeline-track" role="list" aria-label="Línea del tiempo desordenada">
            <!-- Tarjetas generadas dinámicamente -->
          </div>

          <div class="timeline-actions">
            <span class="timeline-status" id="timeline-status" aria-live="polite">
              ${this.total} acontecimientos por ordenar.
            </span>
            <button class="btn-primary btn-large" id="btn-timeline-check">
              <span>Comprobar orden ✅</span>
            </button>
          </div>
        </div>

        <div class="modal-overlay hidden" id="timeline-victory-modal">
          <div class="modal-card victory-card">
            <div class="victory-icon">🎉🕰️</div>
            <h2 class="victory-title">¡LÍNEA DEL TIEMPO COMPLETADA!</h2>
            <p class="victory-subtitle">Has ordenado los acontecimientos como un verdadero historiador.</p>

            <div class="stars-awarded" id="timeline-stars">
              <span class="star">⭐</span>
              <span class="star">⭐</span>
              <span class="star">⭐</span>
            </div>

            <div class="victory-details">
              <p>⏱️ Tiempo: <strong id="tl-final-time">00:00</strong></p>
              <p>🔄 Cambios: <strong id="tl-final-moves">0</strong></p>
              <p>✅ Comprobaciones: <strong id="tl-final-checks">0</strong></p>
            </div>

            <div class="modal-actions">
              <button class="btn-primary btn-large" id="btn-timeline-next">
                <span>Continuar ➡️</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.updateDatesButton();
    this.startNewGame();
  }

  bindEvents() {
    this.container.querySelector('#btn-timeline-exit').addEventListener('click', () => {
      audio.playClick();
      this.stopTimer();
      this.onExit();
    });

    this.container.querySelector('#btn-timeline-restart').addEventListener('click', () => {
      audio.playClick();
      this.startNewGame();
    });

    this.container.querySelector('#btn-timeline-dates').addEventListener('click', () => {
      audio.playClick();
      this.showDates = !this.showDates;
      this.updateDatesButton();
      this.renderBoard();
    });

    this.container.querySelector('#btn-timeline-check').addEventListener('click', () => {
      audio.playClick();
      this.checkOrder();
    });

    this.container.querySelector('#btn-timeline-next').addEventListener('click', () => {
      audio.playClick();
      this.onComplete(this.calculatedStars);
    });
  }

  updateDatesButton() {
    const label = this.container.querySelector('#tl-dates-label');
    if (label) {
      label.textContent = this.showDates ? '🙈 Ocultar fechas' : '👁️ Mostrar fechas';
    }
  }

  startNewGame() {
    this.stopTimer();
    this.timerSeconds = 0;
    this.moves = 0;
    this.checks = 0;
    this.selected = null;
    this.isVictory = false;
    this.board = this.generateBoard();
    this.updateHUD();
    this.setStatus(`${this.total} acontecimientos por ordenar.`);
    this.renderBoard();
    this.startTimer();
  }

  generateBoard() {
    const indices = this.eventos.map((_, index) => index);
    if (indices.length < 2) return indices;

    let shuffled = indices;
    let intentos = 0;

    do {
      shuffled = indices.slice();
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      intentos++;
    } while (this.isInOrder(shuffled) && intentos < 20);

    return shuffled;
  }

  isInOrder(board) {
    return board.every((eventoIndex, position) => eventoIndex === position);
  }

  renderBoard() {
    const track = this.container.querySelector('#timeline-track');
    if (!track) return;

    track.innerHTML = this.board.map((eventoIndex, position) => {
      const evento = this.eventos[eventoIndex] || {};
      const isSelected = this.selected === position;
      const dateContent = this.showDates
        ? `<span class="timeline-card-date">${evento.fecha || ''}</span>`
        : `<span class="timeline-card-date timeline-date-hidden">¿Cuándo fue?</span>`;

      return `
        <div class="timeline-slot" role="listitem">
          <button type="button"
                  class="timeline-card ${isSelected ? 'selected' : ''}"
                  data-position="${position}"
                  style="--event-color: ${evento.color || '#3b82f6'};"
                  aria-pressed="${isSelected}"
                  aria-label="${evento.etiqueta || 'Acontecimiento'}${this.showDates && evento.fecha ? `, ${evento.fecha}` : ''}">
            <span class="timeline-card-position">${position + 1}</span>
            <span class="timeline-card-icon">${evento.icono || '📌'}</span>
            <span class="timeline-card-label">${evento.etiqueta || ''}</span>
            ${dateContent}
          </button>
          ${position < this.total - 1 ? '<span class="timeline-arrow" aria-hidden="true">➜</span>' : ''}
        </div>
      `;
    }).join('');

    track.querySelectorAll('.timeline-card').forEach(card => {
      card.addEventListener('click', () => {
        this.handleCardClick(Number(card.dataset.position));
      });
    });
  }

  handleCardClick(position) {
    if (this.isVictory) return;

    if (this.selected === null) {
      this.selected = position;
      audio.playClick();
      this.renderBoard();
      return;
    }

    if (this.selected === position) {
      this.selected = null;
      audio.playClick();
      this.renderBoard();
      return;
    }

    const first = this.selected;
    [this.board[first], this.board[position]] = [this.board[position], this.board[first]];
    this.moves++;
    this.selected = null;
    audio.playSnap();
    this.updateHUD();
    this.setStatus('Pulsa "Comprobar orden" cuando creas que ya están colocados.');
    this.renderBoard();
  }

  checkOrder() {
    if (this.isVictory) return;

    this.checks++;
    this.updateHUD();
    this.selected = null;
    this.renderBoard();

    const incorrectPositions = [];
    this.board.forEach((eventoIndex, position) => {
      if (eventoIndex !== position) incorrectPositions.push(position);
    });

    if (incorrectPositions.length === 0) {
      this.handleVictory();
      return;
    }

    audio.playWrong();
    const correct = this.total - incorrectPositions.length;
    this.setStatus(`✅ ${correct} en su sitio · ❌ ${incorrectPositions.length} fuera de lugar. ¡Sigue así!`);

    const cards = this.container.querySelectorAll('.timeline-card');
    incorrectPositions.forEach(position => {
      const card = cards[position];
      if (!card) return;
      card.classList.add('timeline-wrong');
      setTimeout(() => card.classList.remove('timeline-wrong'), 900);
    });
  }

  setStatus(text) {
    const status = this.container.querySelector('#timeline-status');
    if (!status) return;
    status.textContent = text;

    if (this.messageTimeout) clearTimeout(this.messageTimeout);
    this.messageTimeout = setTimeout(() => {
      if (!this.isVictory) {
        status.textContent = `${this.total} acontecimientos · ${this.moves} cambios realizados.`;
      }
    }, 4000);
  }

  handleVictory() {
    this.isVictory = true;
    this.stopTimer();
    audio.playVictory();

    let stars = 3;
    const esfuerzo = this.moves + this.checks;
    if (esfuerzo > this.total + 4) {
      stars = 1;
    } else if (esfuerzo > this.total + 1) {
      stars = 2;
    }
    this.calculatedStars = stars;

    gameState.completarCasilla(this.tema.id, this.casillaData.id, stars);

    const modal = this.container.querySelector('#timeline-victory-modal');
    const starsContainer = this.container.querySelector('#timeline-stars');
    starsContainer.innerHTML = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

    this.container.querySelector('#tl-final-time').textContent = this.formatTime(this.timerSeconds);
    this.container.querySelector('#tl-final-moves').textContent = this.moves;
    this.container.querySelector('#tl-final-checks').textContent = this.checks;

    modal.classList.remove('hidden');
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timerSeconds++;
      const timerEl = this.container.querySelector('#tl-timer');
      if (timerEl) timerEl.textContent = this.formatTime(this.timerSeconds);
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  formatTime(totalSec) {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  updateHUD() {
    const movesEl = this.container.querySelector('#tl-moves');
    const checksEl = this.container.querySelector('#tl-checks');
    if (movesEl) movesEl.textContent = this.moves;
    if (checksEl) checksEl.textContent = this.checks;
  }

  cleanup() {
    this.stopTimer();
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
      this.messageTimeout = null;
    }
  }
}
