/**
 * Motor de Quiz / Preguntas Interactivas
 * - Botones táctiles grandes aptos para ratón y pantallas táctiles
 * - Feedback inmediato y refuerzo positivo con explicaciones
 */
import { audio } from '../audio.js';
import { gameState } from '../state.js';

export class QuizView {
  constructor(tema, casillaData, onComplete, onExit) {
    this.tema = tema;
    this.casillaData = casillaData;
    this.onComplete = onComplete;
    this.onExit = onExit;

    this.preguntas = this.prepararPreguntas(casillaData.preguntas || []);
    this.currentIndex = 0;
    this.correctAnswersCount = 0;
    this.hasAnsweredCurrent = false;
  }

  prepararPreguntas(preguntasOriginales) {
    if (!preguntasOriginales || !preguntasOriginales.length) return [];

    // 1. Clonar cada pregunta y mezclar aleatoriamente sus opciones ajustando el índice correcto
    const preguntasPreparadas = preguntasOriginales.map(q => {
      const opcionesConInfo = q.opciones.map((texto, idx) => ({
        texto,
        esCorrecta: idx === q.correcta
      }));

      // Fisher-Yates para barajar las opciones
      for (let i = opcionesConInfo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opcionesConInfo[i], opcionesConInfo[j]] = [opcionesConInfo[j], opcionesConInfo[i]];
      }

      return {
        ...q,
        opciones: opcionesConInfo.map(o => o.texto),
        correcta: opcionesConInfo.findIndex(o => o.esCorrecta)
      };
    });

    // 2. Fisher-Yates para barajar el orden de las preguntas
    for (let i = preguntasPreparadas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [preguntasPreparadas[i], preguntasPreparadas[j]] = [preguntasPreparadas[j], preguntasPreparadas[i]];
    }

    return preguntasPreparadas;
  }

  render(container) {
    this.container = container;
    this.container.innerHTML = `
      <div class="quiz-wrapper">
        <header class="quiz-hud">
          <button class="btn-hud btn-back" id="btn-quiz-exit" title="Volver al circuito">
            <span>⬅️ Circuito</span>
          </button>
          
          <div class="quiz-hud-center">
            <h2 class="quiz-main-title">${this.casillaData.titulo}</h2>
            <div class="quiz-progress-bar-container">
              <div class="quiz-progress-fill" id="quiz-progress-fill" style="width: 0%"></div>
            </div>
          </div>

          <div class="quiz-badge">
            <span id="quiz-question-counter">Pregunta 1 de ${this.preguntas.length}</span>
          </div>
        </header>

        <div class="quiz-card-viewport">
          <div class="quiz-question-card" id="quiz-card">
            <!-- Contenido de la pregunta activa -->
          </div>
        </div>

        <div class="modal-overlay hidden" id="quiz-results-modal">
          <div class="modal-card victory-card">
            <div class="victory-icon">🏆</div>
            <h2 class="victory-title">¡Desafío Superado!</h2>
            <p class="victory-subtitle" id="quiz-final-score-text">Has respondido correctamente</p>
            
            <div class="stars-awarded" id="quiz-stars">
              <!-- Estrellas generadas -->
            </div>

            <p class="quiz-congrats-message" id="quiz-congrats">
              ¡Eres todo un experto en las Edades de la Historia!
            </p>

            <div class="modal-actions">
              <button class="btn-primary btn-large" id="btn-finish-quiz">
                <span>Volver al Circuito 🗺️</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.renderCurrentQuestion();
  }

  bindEvents() {
    this.container.querySelector('#btn-quiz-exit').addEventListener('click', () => {
      audio.playClick();
      this.onExit();
    });

    this.container.querySelector('#btn-finish-quiz').addEventListener('click', () => {
      audio.playClick();
      this.onComplete(this.calculatedStars);
    });
  }

  renderCurrentQuestion() {
    this.hasAnsweredCurrent = false;
    const q = this.preguntas[this.currentIndex];
    const cardEl = this.container.querySelector('#quiz-card');
    const counterEl = this.container.querySelector('#quiz-question-counter');
    const progressFill = this.container.querySelector('#quiz-progress-fill');

    const total = this.preguntas.length;
    counterEl.textContent = `Pregunta ${this.currentIndex + 1} de ${total}`;
    progressFill.style.width = `${((this.currentIndex) / total) * 100}%`;

    cardEl.innerHTML = `
      <div class="question-header">
        <span class="question-number-pill">#${this.currentIndex + 1}</span>
        <h3 class="question-text">${q.enunciado}</h3>
      </div>

      <div class="options-grid" id="options-grid">
        ${q.opciones.map((op, idx) => `
          <button class="btn-option" data-option-index="${idx}">
            <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
            <span class="option-text">${op}</span>
          </button>
        `).join('')}
      </div>

      <div class="quiz-feedback-box hidden" id="quiz-feedback">
        <div class="feedback-content">
          <span class="feedback-icon" id="feedback-icon"></span>
          <p class="feedback-text" id="feedback-text"></p>
        </div>
        <button class="btn-primary btn-next-question" id="btn-next-question">
          <span>${this.currentIndex === total - 1 ? 'Ver Resultados 🏆' : 'Siguiente Pregunta ➡️'}</span>
        </button>
      </div>
    `;

    // Vincular botones de respuesta
    const buttons = cardEl.querySelectorAll('.btn-option');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedIdx = parseInt(btn.dataset.optionIndex, 10);
        this.handleSelectOption(selectedIdx, buttons);
      });
    });

    // Vincular botón siguiente
    const nextBtn = cardEl.querySelector('#btn-next-question');
    nextBtn.addEventListener('click', () => {
      audio.playClick();
      if (this.currentIndex < this.preguntas.length - 1) {
        this.currentIndex++;
        this.renderCurrentQuestion();
      } else {
        this.showFinalResults();
      }
    });
  }

  handleSelectOption(selectedIdx, buttons) {
    if (this.hasAnsweredCurrent) return;
    this.hasAnsweredCurrent = true;

    const q = this.preguntas[this.currentIndex];
    const isCorrect = selectedIdx === q.correcta;

    // Deshabilitar todos los botones y marcar estilos
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correcta) {
        btn.classList.add('correct');
      } else if (idx === selectedIdx && !isCorrect) {
        btn.classList.add('wrong');
      }
    });

    // Feedback visual y auditivo
    const feedbackBox = this.container.querySelector('#quiz-feedback');
    const feedbackIcon = this.container.querySelector('#feedback-icon');
    const feedbackText = this.container.querySelector('#feedback-text');

    if (isCorrect) {
      this.correctAnswersCount++;
      audio.playCorrect();
      feedbackIcon.textContent = '🎉';
      feedbackText.innerHTML = `<strong>¡Correcto!</strong> ${q.explicacion || ''}`;
      feedbackBox.className = 'quiz-feedback-box correct-box';
    } else {
      audio.playWrong();
      feedbackIcon.textContent = '💡';
      feedbackText.innerHTML = `<strong>¡Casi!</strong> ${q.explicacion || 'Revisa la ficha de teoría para recordarlo.'}`;
      feedbackBox.className = 'quiz-feedback-box wrong-box';
    }

    feedbackBox.classList.remove('hidden');
  }

  showFinalResults() {
    audio.playVictory();
    const total = this.preguntas.length;
    const ratio = this.correctAnswersCount / total;

    let stars = 3;
    let message = "¡Increíble! Dominas perfectamente este bloque histórico.";

    if (ratio < 0.6) {
      stars = 1;
      message = "¡Buen intento! Puedes volver a leer la ficha para sacar 3 estrellas.";
    } else if (ratio < 0.85) {
      stars = 2;
      message = "¡Muy bien! Tienes los conceptos muy claros. ¡Sigue así para las 3 estrellas!";
    }

    this.calculatedStars = stars;
    gameState.completarCasilla(this.tema.id, this.casillaData.id, stars);

    const modal = this.container.querySelector('#quiz-results-modal');
    this.container.querySelector('#quiz-final-score-text').textContent =
      `Has acertado ${this.correctAnswersCount} de ${total} preguntas`;

    this.container.querySelector('#quiz-stars').innerHTML =
      '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

    this.container.querySelector('#quiz-congrats').textContent = message;

    modal.classList.remove('hidden');
  }
}
