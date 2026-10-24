/**
 * Minijuego de Puzzle Divertido (6 piezas: 3 columnas x 2 filas)
 * - Usa la imagen local indicada en `casillaData.imagen` (assets/ del capítulo)
 * - Si no hay imagen, usa por defecto la ilustración divertida del mamut
 * - Al completarse, muestra la imagen resuelta durante 2.5 segundos con animación antes del modal
 */
import { audio } from '../audio.js';
import { gameState } from '../state.js';

export class PuzzleGame {
  constructor(tema, casillaData, onComplete, onExit) {
    this.tema = tema;
    this.casillaData = casillaData;
    this.onComplete = onComplete;
    this.onExit = onExit;

    this.cols = 3;
    this.rows = 2;
    this.totalPieces = 6;

    this.board = [];
    this.selectedCell = null;
    this.moves = 0;
    this.timerSeconds = 0;
    this.timerInterval = null;
    this.isVictory = false;

    // Gestión de imagen: intentar cargar la imagen del capítulo o fallback a SVG
    this.imageSrc = casillaData.imagen || null;
    this.useCustomImage = false;
    this.svgIllustration = this.generateFunnyMammothSVG();

    this.preloadCustomImage();
  }

  preloadCustomImage() {
    if (!this.imageSrc) {
      this.useCustomImage = false;
      return;
    }
    const img = new Image();
    img.onload = () => {
      this.useCustomImage = true;
      if (this.container) {
        this.renderBoard();
        this.updatePeekModalContent();
      }
    };
    img.onerror = () => {
      // Si aún no han subido la imagen, se usa el dibujo animado SVG
      this.useCustomImage = false;
    };
    img.src = this.imageSrc;
  }

  generateFunnyMammothSVG() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
        <defs>
          <linearGradient id="caveBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#451a03" />
            <stop offset="50%" stop-color="#78350f" />
            <stop offset="100%" stop-color="#292524" />
          </linearGradient>
          <linearGradient id="mammothFur" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#b45309" />
            <stop offset="100%" stop-color="#78350f" />
          </linearGradient>
          <linearGradient id="sneakerRed" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ef4444" />
            <stop offset="100%" stop-color="#b91c1c" />
          </linearGradient>
        </defs>
        <rect width="600" height="400" fill="url(#caveBg)" />
        <g opacity="0.35" transform="translate(60, 45) scale(0.65)">
          <path d="M50,80 Q90,40 140,80 Q160,110 130,130 Q80,140 50,80" fill="#f59e0b" />
          <path d="M140,80 Q170,95 180,125" stroke="#f59e0b" stroke-width="6" fill="none" />
          <rect x="40" y="145" width="120" height="10" rx="5" fill="#f59e0b" />
          <circle cx="65" cy="165" r="8" fill="#f59e0b" />
          <circle cx="135" cy="165" r="8" fill="#f59e0b" />
          <text x="50" y="25" fill="#fde68a" font-family="sans-serif" font-size="18" font-weight="bold">🛹 ¡Altamira Skate!</text>
        </g>
        <g transform="translate(530, 80)">
          <rect x="0" y="30" width="14" height="60" fill="#52525b" rx="4" />
          <polygon points="7,0 20,25 -6,25" fill="#f59e0b" />
          <polygon points="7,5 16,25 -2,25" fill="#ef4444" />
          <polygon points="7,10 13,25 1,25" fill="#fef08a" />
        </g>
        <ellipse cx="260" cy="270" rx="32" ry="55" fill="#78350f" />
        <ellipse cx="380" cy="270" rx="30" ry="55" fill="#78350f" />
        <ellipse cx="330" cy="220" rx="100" ry="85" fill="url(#mammothFur)" />
        <circle cx="240" cy="160" r="65" fill="url(#mammothFur)" />
        <path d="M190,130 Q240,85 290,130 Q270,110 240,115 Q210,110 190,130" fill="#92400e" />
        <ellipse cx="295" cy="155" rx="26" ry="38" fill="#92400e" />
        <path d="M210,185 Q160,200 150,150" stroke="#fef3c7" stroke-width="14" stroke-linecap="round" fill="none" />
        <path d="M235,195 Q190,230 170,170" stroke="#fef3c7" stroke-width="12" stroke-linecap="round" fill="none" />
        <path d="M225,180 Q210,240 260,255 Q290,260 280,235" stroke="url(#mammothFur)" stroke-width="26" stroke-linecap="round" fill="none" />
        <g transform="translate(268, 205)">
          <polygon points="12,25 0,0 24,0" fill="#d97706" />
          <circle cx="12" cy="-4" r="14" fill="#fb7185" />
          <circle cx="12" cy="-14" r="10" fill="#f43f5e" />
          <circle cx="12" cy="-26" r="6" fill="#be123c" />
        </g>
        <g transform="translate(200, 135)">
          <rect x="0" y="0" width="34" height="24" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="3" />
          <rect x="42" y="0" width="34" height="24" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="3" />
          <rect x="32" y="6" width="12" height="5" fill="#38bdf8" />
          <line x1="6" y1="4" x2="26" y2="20" stroke="#ffffff" stroke-width="2.5" opacity="0.8" />
          <line x1="48" y1="4" x2="68" y2="20" stroke="#ffffff" stroke-width="2.5" opacity="0.8" />
        </g>
        <g transform="translate(210, 310)">
          <path d="M10,10 L50,10 L65,35 L0,35 Q0,20 10,10" fill="url(#sneakerRed)" />
          <rect x="0" y="35" width="70" height="12" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
          <line x1="25" y1="18" x2="45" y2="18" stroke="#ffffff" stroke-width="3" />
          <line x1="28" y1="24" x2="48" y2="24" stroke="#ffffff" stroke-width="3" />
          <circle cx="22" cy="24" r="7" fill="#ffffff" />
        </g>
        <g transform="translate(350, 310)">
          <path d="M10,10 L50,10 L65,35 L0,35 Q0,20 10,10" fill="url(#sneakerRed)" />
          <rect x="0" y="35" width="70" height="12" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
          <line x1="25" y1="18" x2="45" y2="18" stroke="#ffffff" stroke-width="3" />
          <line x1="28" y1="24" x2="48" y2="24" stroke="#ffffff" stroke-width="3" />
          <circle cx="22" cy="24" r="7" fill="#ffffff" />
        </g>
        <g transform="translate(420, 160)">
          <path d="M30,70 Q70,40 100,50" stroke="#fcd34d" stroke-width="16" stroke-linecap="round" fill="none" />
          <g transform="translate(95, 30) rotate(-15)">
            <rect x="0" y="0" width="30" height="50" rx="6" fill="#78716c" stroke="#44403c" stroke-width="2" />
            <circle cx="15" cy="12" r="6" fill="#0284c7" />
            <rect x="6" y="24" width="18" height="20" rx="3" fill="#38bdf8" />
          </g>
          <ellipse cx="25" cy="95" rx="24" ry="40" fill="#f59e0b" />
          <circle cx="20" cy="80" r="3" fill="#78350f" />
          <circle cx="30" cy="95" r="4" fill="#78350f" />
          <circle cx="18" cy="110" r="3" fill="#78350f" />
          <circle cx="25" cy="40" r="28" fill="#fcd34d" />
          <path d="M-5,35 Q25,-10 55,30 Q40,15 25,20 Q10,15 -5,35" fill="#451a03" />
          <g transform="translate(15, 0) rotate(25)">
            <rect x="0" y="3" width="26" height="8" rx="4" fill="#f8fafc" />
            <circle cx="0" cy="2" r="5" fill="#f8fafc" />
            <circle cx="26" cy="2" r="5" fill="#f8fafc" />
          </g>
          <circle cx="18" cy="36" r="4" fill="#0f172a" />
          <circle cx="34" cy="36" r="4" fill="#0f172a" />
          <path d="M14,48 Q26,64 38,48 Z" fill="#991b1b" />
          <rect x="22" y="48" width="6" height="5" fill="#ffffff" />
        </g>
        <rect x="120" y="365" width="360" height="26" rx="13" fill="rgba(0,0,0,0.6)" />
        <text x="300" y="383" fill="#fef08a" font-family="sans-serif" font-size="14" font-weight="900" text-anchor="middle">
          📸 ¡Altamira: Mamut con zapatillas y selfie cavernícola!
        </text>
      </svg>
    `;
  }

  render(container) {
    this.container = container;
    this.container.innerHTML = `
      <div class="game-wrapper puzzle-wrapper">
        <header class="game-hud">
          <button class="btn-hud btn-back" id="btn-puzzle-exit" title="Volver al circuito">
            <span>⬅️ Circuito</span>
          </button>
          
          <div class="hud-center">
            <h2 class="game-title">${this.casillaData.titulo}</h2>
            <div class="hud-stats">
              <span class="stat-pill">⏳ <strong id="puz-timer">00:00</strong></span>
              <span class="stat-pill">🔄 Movimientos: <strong id="puz-moves">0</strong></span>
              <span class="stat-pill">🧩 Encajadas: <strong id="puz-correct">0 / 6</strong></span>
            </div>
          </div>

          <div class="hud-actions">
            <button class="btn-hud btn-preview" id="btn-peek-image" title="Ver imagen completa">
              <span>👁️ Ver Original</span>
            </button>
            <button class="btn-hud btn-restart" id="btn-restart-puzzle" title="Volver a mezclar">
              <span>🔄 Barajar</span>
            </button>
          </div>
        </header>

        <div class="puzzle-main-stage">
          <div class="puzzle-board" id="puzzle-board">
            <!-- 6 piezas del puzzle -->
          </div>
        </div>

        <div class="puzzle-tip-bar">
          <span>💡 <strong>Cómo jugar:</strong> Toca una pieza y luego otra para intercambiarlas de sitio.</span>
        </div>

        <!-- Modal Vista Previa -->
        <div class="modal-overlay hidden" id="puzzle-peek-modal">
          <div class="modal-card peek-card">
            <h3 class="peek-title">¡Así debe quedar el dibujo!</h3>
            <div class="peek-image-container" id="peek-image-container">
              ${this.getOriginalImageHtml()}
            </div>
            <button class="btn-primary" id="btn-close-peek">
              <span>¡Entendido, a jugar! 🎮</span>
            </button>
          </div>
        </div>

        <!-- Modal Victoria del Puzzle -->
        <div class="modal-overlay hidden" id="puzzle-victory-modal">
          <div class="modal-card victory-card">
            <div class="victory-icon">🎉🧩</div>
            <h2 class="victory-title">¡PUZZLE COMPLETADO!</h2>
            <p class="victory-subtitle">¡Lo has resuelto fenomenal!</p>
            
            <div class="stars-awarded" id="puzzle-stars">
              <span class="star">⭐</span>
              <span class="star">⭐</span>
              <span class="star">⭐</span>
            </div>

            <div class="victory-details">
              <p>⏱️ Tiempo: <strong id="puz-final-time">00:00</strong></p>
              <p>🎯 Movimientos: <strong id="puz-final-moves">0</strong></p>
            </div>

            <div class="modal-actions">
              <button class="btn-primary btn-large" id="btn-puzzle-next">
                <span>Continuar a la Ficha de Historia 📜 ➡️</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.startNewPuzzle();
  }

  getOriginalImageHtml() {
    if (this.useCustomImage) {
      return `<img src="${this.imageSrc}" style="width:100%; height:100%; object-fit:contain;" alt="Puzzle Original" />`;
    }
    return this.svgIllustration;
  }

  updatePeekModalContent() {
    const peekContainer = this.container.querySelector('#peek-image-container');
    if (peekContainer) {
      peekContainer.innerHTML = this.getOriginalImageHtml();
    }
  }

  bindEvents() {
    this.container.querySelector('#btn-puzzle-exit').addEventListener('click', () => {
      audio.playClick();
      this.stopTimer();
      this.onExit();
    });

    this.container.querySelector('#btn-restart-puzzle').addEventListener('click', () => {
      audio.playClick();
      this.startNewPuzzle();
    });

    const peekModal = this.container.querySelector('#puzzle-peek-modal');
    this.container.querySelector('#btn-peek-image').addEventListener('click', () => {
      audio.playClick();
      this.updatePeekModalContent();
      peekModal.classList.remove('hidden');
    });

    this.container.querySelector('#btn-close-peek').addEventListener('click', () => {
      audio.playClick();
      peekModal.classList.add('hidden');
    });

    this.container.querySelector('#btn-puzzle-next').addEventListener('click', () => {
      audio.playClick();
      this.onComplete(this.calculatedStars);
    });
  }

  startNewPuzzle() {
    this.stopTimer();
    this.timerSeconds = 0;
    this.moves = 0;
    this.selectedCell = null;
    this.isVictory = false;
    this.updateHUD();

    const boardEl = this.container.querySelector('#puzzle-board');
    if (boardEl) {
      boardEl.classList.remove('puzzle-completed-reveal');
      const oldBanner = boardEl.querySelector('.puzzle-solved-banner');
      if (oldBanner) oldBanner.remove();
    }

    this.board = [0, 1, 2, 3, 4, 5];
    do {
      for (let i = this.board.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.board[i], this.board[j]] = [this.board[j], this.board[i]];
      }
    } while (this.countCorrectPieces() > 2);

    this.renderBoard();
    this.startTimer();
  }

  countCorrectPieces() {
    let count = 0;
    for (let i = 0; i < this.totalPieces; i++) {
      if (this.board[i] === i) count++;
    }
    return count;
  }

  renderBoard() {
    const boardEl = this.container.querySelector('#puzzle-board');
    if (!boardEl) return;
    boardEl.innerHTML = '';

    for (let cellIndex = 0; cellIndex < this.totalPieces; cellIndex++) {
      const pieceId = this.board[cellIndex];
      const isCorrect = pieceId === cellIndex;

      const pieceEl = document.createElement('div');
      pieceEl.className = `puzzle-piece-cell ${isCorrect ? 'is-correct' : ''}`;
      pieceEl.dataset.cellIndex = cellIndex;

      const origCol = pieceId % this.cols;
      const origRow = Math.floor(pieceId / this.cols);

      if (this.useCustomImage) {
        // Recorte con CSS background-position para cualquier imagen personalizada
        const bgX = (origCol / (this.cols - 1)) * 100;
        const bgY = (origRow / (this.rows - 1)) * 100;

        pieceEl.innerHTML = `
          <div class="piece-clipper custom-img-piece" style="
            background-image: url('${this.imageSrc}');
            background-size: 300% 200%;
            background-position: ${bgX}% ${bgY}%;
          ">
            ${isCorrect && !this.isVictory ? '<span class="piece-snap-check">✓</span>' : ''}
          </div>
        `;
      } else {
        // Recorte con SVG viewBox
        const vbX = origCol * 200;
        const vbY = origRow * 200;

        pieceEl.innerHTML = `
          <div class="piece-clipper">
            <svg viewBox="${vbX} ${vbY} 200 200" width="100%" height="100%" preserveAspectRatio="none">
              ${this.extractSvgContent(this.svgIllustration)}
            </svg>
            ${isCorrect && !this.isVictory ? '<span class="piece-snap-check">✓</span>' : ''}
          </div>
        `;
      }

      pieceEl.addEventListener('click', () => this.handleCellClick(cellIndex));
      boardEl.appendChild(pieceEl);
    }

    this.updateHUD();
  }

  extractSvgContent(svgStr) {
    const match = svgStr.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
    return match ? match[1] : svgStr;
  }

  handleCellClick(cellIndex) {
    if (this.isVictory) return;

    if (this.selectedCell === null) {
      this.selectedCell = cellIndex;
      audio.playClick();
      this.highlightCell(cellIndex, true);
    } else if (this.selectedCell === cellIndex) {
      audio.playClick();
      this.highlightCell(cellIndex, false);
      this.selectedCell = null;
    } else {
      const firstCell = this.selectedCell;
      const secondCell = cellIndex;

      [this.board[firstCell], this.board[secondCell]] = [this.board[secondCell], this.board[firstCell]];
      this.moves++;
      this.selectedCell = null;

      audio.playSnap();
      this.renderBoard();

      const correct = this.countCorrectPieces();
      if (correct === this.totalPieces) {
        this.handleVictory();
      }
    }
  }

  highlightCell(cellIndex, isActive) {
    const cells = this.container.querySelectorAll('.puzzle-piece-cell');
    cells.forEach((el, idx) => {
      if (idx === cellIndex && isActive) {
        el.classList.add('selected-piece');
      } else {
        el.classList.remove('selected-piece');
      }
    });
  }

  handleVictory() {
    this.isVictory = true;
    this.stopTimer();

    // 1. Quitar bordes y unir las piezas para que se vea la imagen completa limpia
    const boardEl = this.container.querySelector('#puzzle-board');
    if (boardEl) {
      boardEl.classList.add('puzzle-completed-reveal');
      
      const banner = document.createElement('div');
      banner.className = 'puzzle-solved-banner';
      banner.innerHTML = '<span>✨ ¡PUZZLE RESUELTO! ✨</span>';
      boardEl.appendChild(banner);
    }

    // Volver a renderizar sin los checks para que la imagen se vea perfecta
    this.renderBoard();

    // 2. Efectos sonoros alegres
    audio.playBoing();
    setTimeout(() => audio.playGiggle(), 350);
    setTimeout(() => audio.playVictory(), 900);

    // Calcular estrellas
    let stars = 3;
    if (this.moves > 14) {
      stars = 1;
    } else if (this.moves > 8) {
      stars = 2;
    }
    this.calculatedStars = stars;
    gameState.completarCasilla(this.tema.id, this.casillaData.id, stars);

    // 3. MOSTRAR LA IMAGEN TERMINADA DURANTE 2.5 SEGUNDOS ANTES DEL MODAL
    setTimeout(() => {
      this.showVictoryModal();
    }, 2500);
  }

  showVictoryModal() {
    const modal = this.container.querySelector('#puzzle-victory-modal');
    if (!modal) return;

    this.container.querySelector('#puzzle-stars').innerHTML =
      '⭐'.repeat(this.calculatedStars) + '☆'.repeat(3 - this.calculatedStars);

    this.container.querySelector('#puz-final-time').textContent = this.formatTime(this.timerSeconds);
    this.container.querySelector('#puz-final-moves').textContent = this.moves;

    modal.classList.remove('hidden');
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timerSeconds++;
      const timerEl = this.container.querySelector('#puz-timer');
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
    const movesEl = this.container.querySelector('#puz-moves');
    const correctEl = this.container.querySelector('#puz-correct');
    if (movesEl) movesEl.textContent = this.moves;
    if (correctEl) correctEl.textContent = `${this.countCorrectPieces()} / ${this.totalPieces}`;
  }
}
