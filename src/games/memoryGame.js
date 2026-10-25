/**
 * Minijuego de las Parejas (Memory Game)
 * - 14 cartas en total (7 parejas temáticas)
 * - Diseñado en horizontal para PC y Tablets
 * - Relaciona el Periodo Histórico con su Hito Clave
 */
import { audio } from '../audio.js';
import { gameState } from '../state.js';

export class MemoryGame {
  constructor(tema, casillaData, onComplete, onExit) {
    this.tema = tema;
    this.casillaData = casillaData;
    this.onComplete = onComplete;
    this.onExit = onExit;

    this.cards = [];
    this.flippedCards = [];
    this.matchedPairsCount = 0;
    this.totalPairs = 7;
    this.moves = 0;
    this.timerSeconds = 0;
    this.timerInterval = null;
    this.isLocked = false;
  }

  render(container) {
    this.container = container;
    this.container.innerHTML = `
      <div class="game-wrapper memory-wrapper">
        <header class="game-hud">
          <button class="btn-hud btn-back" id="btn-exit-game" title="Volver al circuito">
            <span>⬅️ Circuito</span>
          </button>
          
          <div class="hud-center">
            <h2 class="game-title">${this.casillaData.titulo}</h2>
            <div class="hud-stats">
              <span class="stat-pill">⏳ <strong id="mem-timer">00:00</strong></span>
              <span class="stat-pill">🔄 Intentos: <strong id="mem-moves">0</strong></span>
              <span class="stat-pill">🎯 Parejas: <strong id="mem-pairs">0 / 7</strong></span>
            </div>
          </div>

          <button class="btn-hud btn-restart" id="btn-restart-game" title="Reiniciar partida">
            <span>🔄 Reiniciar</span>
          </button>
        </header>

        <div class="memory-board-container">
          <div class="memory-grid" id="memory-grid">
            <!-- 14 cartas generadas dinámicamente -->
          </div>
        </div>

        <div class="modal-overlay hidden" id="memory-victory-modal">
          <div class="modal-card victory-card">
            <div class="victory-icon">🎉</div>
            <h2 class="victory-title">¡Misión Cumplida!</h2>
            <p class="victory-subtitle">¡Has encontrado todas las parejas!</p>
            
            <div class="stars-awarded" id="victory-stars">
              <span class="star">⭐</span>
              <span class="star">⭐</span>
              <span class="star">⭐</span>
            </div>

            <div class="victory-details">
              <p>⏱️ Tiempo: <strong id="final-time">00:00</strong></p>
              <p>🎯 Intentos: <strong id="final-moves">0</strong></p>
            </div>

            <div class="modal-actions">
              <button class="btn-primary btn-large" id="btn-next-step">
                <span>Continuar al siguiente reto 🗺️ ➡️</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.startNewGame();
  }

  bindEvents() {
    this.container.querySelector('#btn-exit-game').addEventListener('click', () => {
      audio.playClick();
      this.stopTimer();
      this.onExit();
    });

    this.container.querySelector('#btn-restart-game').addEventListener('click', () => {
      audio.playClick();
      this.startNewGame();
    });

    this.container.querySelector('#btn-next-step').addEventListener('click', () => {
      audio.playClick();
      this.onComplete(this.calculatedStars);
    });
  }

  startNewGame() {
    this.stopTimer();
    this.timerSeconds = 0;
    this.moves = 0;
    this.matchedPairsCount = 0;
    this.flippedCards = [];
    this.isLocked = false;
    this.updateHUD();

    // Generar las 14 cartas (7 pares)
    this.cards = this.generateCards();
    this.renderCards();
    this.startTimer();
  }

  generateCards() {
    const parejas = this.casillaData.parejas || [];
    const deck = [];

    parejas.forEach(item => {
      // Carta A: Nombre del periodo + icono
      deck.push({
        id: item.id,
        tipo: 'periodo',
        titulo: item.etiqueta,
        icono: item.icono,
        subtexto: 'Etapa histórica',
        color: item.color,
        isFlipped: false,
        isMatched: false
      });

      // Carta B: Hito o característica clave + icono
      deck.push({
        id: item.id,
        tipo: 'detalle',
        titulo: item.detalle,
        icono: item.icono,
        subtexto: item.etiqueta,
        color: item.color,
        isFlipped: false,
        isMatched: false
      });
    });

    // Barajar con Fisher-Yates
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
  }

  renderCards() {
    const grid = this.container.querySelector('#memory-grid');
    grid.innerHTML = '';

    this.cards.forEach((card, index) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'memory-card';
      cardEl.dataset.index = index;

      cardEl.innerHTML = `
        <div class="card-inner">
          <div class="card-front">
            <span class="card-back-pattern">⏳</span>
            <span class="card-back-hint">Toca para descubrir</span>
          </div>
          <div class="card-back" style="--card-accent: ${card.color};">
            <div class="card-icon">${card.icono}</div>
            <div class="card-text-title">${card.titulo}</div>
            <div class="card-text-sub">${card.subtexto}</div>
          </div>
        </div>
      `;

      cardEl.addEventListener('click', () => this.handleCardClick(index, cardEl));
      grid.appendChild(cardEl);
    });
  }

  handleCardClick(index, cardEl) {
    if (this.isLocked) return;
    const card = this.cards[index];

    // Ignorar si ya está volteada o emparejada
    if (card.isFlipped || card.isMatched) return;

    // Voltear carta
    card.isFlipped = true;
    cardEl.classList.add('flipped');
    audio.playFlip();

    this.flippedCards.push({ card, el: cardEl, index });

    if (this.flippedCards.length === 2) {
      this.moves++;
      this.updateHUD();
      this.checkMatch();
    }
  }

  checkMatch() {
    const [first, second] = this.flippedCards;
    this.isLocked = true;

    if (first.card.id === second.card.id) {
      // ¡Acierto!
      setTimeout(() => {
        audio.playMatch();
        first.card.isMatched = true;
        second.card.isMatched = true;
        first.el.classList.add('matched');
        second.el.classList.add('matched');

        this.matchedPairsCount++;
        this.flippedCards = [];
        this.isLocked = false;
        this.updateHUD();

        if (this.matchedPairsCount === this.totalPairs) {
          this.handleVictory();
        }
      }, 400);
    } else {
      // Fallo: voltear de nuevo tras breve pausa
      setTimeout(() => {
        audio.playMismatch();
        first.el.classList.add('shake');
        second.el.classList.add('shake');

        setTimeout(() => {
          first.card.isFlipped = false;
          second.card.isFlipped = false;
          first.el.classList.remove('flipped', 'shake');
          second.el.classList.remove('flipped', 'shake');
          this.flippedCards = [];
          this.isLocked = false;
        }, 450);
      }, 700);
    }
  }

  handleVictory() {
    this.stopTimer();
    audio.playVictory();

    // Calcular estrellas (máx 3)
    // 7 pares en total. Óptimo teórico: 7 intentos.
    let stars = 3;
    if (this.moves > 16) {
      stars = 1;
    } else if (this.moves > 11) {
      stars = 2;
    }
    this.calculatedStars = stars;

    // Guardar progreso en el estado global
    gameState.completarCasilla(this.tema.id, this.casillaData.id, stars);

    // Actualizar modal
    const modal = this.container.querySelector('#memory-victory-modal');
    const starsContainer = this.container.querySelector('#victory-stars');
    starsContainer.innerHTML = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

    this.container.querySelector('#final-time').textContent = this.formatTime(this.timerSeconds);
    this.container.querySelector('#final-moves').textContent = this.moves;

    modal.classList.remove('hidden');
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timerSeconds++;
      const timerEl = this.container.querySelector('#mem-timer');
      if (timerEl) {
        timerEl.textContent = this.formatTime(this.timerSeconds);
      }
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
    const movesEl = this.container.querySelector('#mem-moves');
    const pairsEl = this.container.querySelector('#mem-pairs');
    if (movesEl) movesEl.textContent = this.moves;
    if (pairsEl) pairsEl.textContent = `${this.matchedPairsCount} / ${this.totalPairs}`;
  }
}
