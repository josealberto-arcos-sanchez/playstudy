/**
 * Vista de Micro-Fichas de Teoría (Modo Presentación Educativa con Locución por Voz)
 * - Diapositiva a diapositiva con esquemas claros e infografías
 * - Lectura guiada en voz alta con Web Speech Synthesis nativa
 * - Control de avance con 'Siguiente', pausa y repetición
 */
import { audio } from '../audio.js';
import { gameState } from '../state.js';
import { speechManager } from '../speech.js';
import { aiTutor, AI_MAX_QUESTION_LENGTH, AI_MAX_CONTEXT_LENGTH } from '../aiTutor.js';
import { CLAVES, leerBooleano, guardarBooleano } from '../storage.js';
import { SettingsView } from './settingsView.js';

export class TheoryView {
  constructor(tema, casillaData, onComplete, onExit) {
    this.tema = tema;
    this.casillaData = casillaData;
    this.onComplete = onComplete;
    this.onExit = onExit;

    this.slides = this.buildSlides(casillaData);
    this.currentIndex = 0;

    // Estado del narrador de voz
    this.isSpeaking = false;
    this.isVoicePaused = false;
    this.isVoiceMuted = leerBooleano(CLAVES.teoriaVozSilenciada, false);
    this.currentUtterance = null;
    this.speechRequestId = 0;
    this.aiPanel = null;
    this.aiRequest = null;
    this.aiRecognition = null;
    this.settingsView = null;
  }

  /**
   * Transforma las tarjetas de cada ficha en una secuencia de diapositivas narradas.
   * Cada tarjeta es una diapositiva: una idea, una imagen y su locución.
   */
  buildSlides(casillaData) {
    const rawFichas = casillaData.fichas || [];
    const slides = [];

    rawFichas.forEach((ficha) => {
      (ficha.tarjetas || []).forEach((t) => {
        if (!t.imagen || !t.locucion) {
          console.warn(
            `[Teoría] La diapositiva «${t.nombre}» de «${casillaData.titulo}» debe tener "imagen" y "locucion".`
          );
        }
        slides.push({
          tipo: 'diapositiva',
          fichaTitulo: ficha.titulo,
          fichaSubtitulo: ficha.subtitulo,
          fichaIcono: ficha.icono,
          nombre: t.nombre,
          fecha: t.fecha || '',
          icono: t.icono || '📖',
          color: t.color || '#3b82f6',
          puntos: t.puntos || [],
          locucion: t.locucion || '',
          imagen: t.imagen || null,
          ajusteImagen: t.ajuste_imagen || 'recorte',
          texto: t.texto || ''
        });
      });
    });

    return slides;
  }

  render(container) {
    this.container = container;
    const totalSlides = this.slides.length;

    if (totalSlides === 0) {
      this.container.innerHTML = `
        <div class="theory-wrapper">
          <div class="theory-card is-presentation">
            <p>Esta teoría no tiene diapositivas. Añade tarjetas con <code>imagen</code> y <code>locucion</code> en <code>contenido.json</code>.</p>
            <button class="btn-primary" id="btn-theory-exit-empty">⬅️ Volver al circuito</button>
          </div>
        </div>
      `;
      this.container.querySelector('#btn-theory-exit-empty').addEventListener('click', () => {
        audio.playClick();
        this.onExit();
      });
      return;
    }

    this.container.innerHTML = `
      <div class="theory-wrapper">
        <header class="theory-hud">
          <button class="btn-hud btn-back" id="btn-theory-exit" title="Volver al circuito">
            <span>⬅️ Circuito</span>
          </button>
          
          <div class="theory-title-area">
            <h2 class="theory-main-title">${this.casillaData.titulo}</h2>
          </div>

          <div class="theory-hud-actions">
            <button class="btn-hud btn-ask-ai" id="btn-ask-ai" type="button" title="Preguntar al tutor sobre esta teoría">
              <span>🙋 Preguntar</span>
            </button>
            <div class="theory-badge">
              <span id="slide-indicator">Diapositiva 1 de ${totalSlides}</span>
            </div>
          </div>
        </header>

        <div class="theory-content-viewport">
          <div class="theory-card is-presentation" id="theory-current-card">
            <!-- Contenido dinámico de la diapositiva -->
          </div>
        </div>

        <footer class="theory-nav-footer">
          <div class="slide-dots-container" id="theory-dots-bar">
            ${this.slides.map((_, i) => `<span class="slide-dot-pill ${i === 0 ? 'active' : ''}" data-index="${i}" title="Ir a diapositiva ${i + 1}"></span>`).join('')}
          </div>

          <button class="btn-secondary btn-nav" id="btn-prev-slide" disabled>
            <span>⬅️ Anterior</span>
          </button>

          <button class="btn-primary btn-nav pulse-glow" id="btn-next-slide">
            <span>${totalSlides === 1 ? '¡Entendido! Ir al Quiz ❓ ➡️' : 'Siguiente ➡️'}</span>
          </button>
        </footer>
      </div>
    `;

    this.bindEvents();
    this.renderCurrentSlide();
  }

  bindEvents() {
    this.container.querySelector('#btn-theory-exit').addEventListener('click', () => {
      audio.playClick();
      this.stopSpeaking();
      this.onExit();
    });

    this.container.querySelector('#btn-prev-slide').addEventListener('click', () => {
      if (this.currentIndex > 0) {
        audio.playClick();
        this.stopSpeaking();
        this.currentIndex--;
        this.renderCurrentSlide();
      }
    });

    this.container.querySelector('#btn-next-slide').addEventListener('click', () => {
      audio.playClick();
      this.stopSpeaking();
      if (this.currentIndex < this.slides.length - 1) {
        this.currentIndex++;
        this.renderCurrentSlide();
      } else {
        this.handleComplete();
      }
    });

    this.container.querySelector('#btn-ask-ai').addEventListener('click', () => {
      audio.playClick();
      this.openAiPanel();
    });

    // Clic en los puntos de navegación
    const dots = this.container.querySelectorAll('.slide-dot-pill');
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const targetIdx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        if (!isNaN(targetIdx) && targetIdx !== this.currentIndex) {
          audio.playClick();
          this.stopSpeaking();
          this.currentIndex = targetIdx;
          this.renderCurrentSlide();
        }
      });
    });

    this.keyHandler = (e) => {
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (this.aiPanel) return;
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        const nextBtn = this.container.querySelector('#btn-next-slide');
        if (nextBtn) nextBtn.click();
      } else if (e.key === 'ArrowLeft') {
        const prevBtn = this.container.querySelector('#btn-prev-slide');
        if (prevBtn && !prevBtn.disabled) prevBtn.click();
      }
    };
    window.addEventListener('keydown', this.keyHandler);
  }

  cleanup() {
    this.stopSpeaking();
    this.closeAiPanel();
    if (this.settingsView) {
      this.settingsView.cleanup();
      this.settingsView = null;
    }
    if (this.keyHandler) {
      window.removeEventListener('keydown', this.keyHandler);
    }
  }

  renderCurrentSlide() {
    const slide = this.slides[this.currentIndex];
    const totalSlides = this.slides.length;
    const cardEl = this.container.querySelector('#theory-current-card');
    const prevBtn = this.container.querySelector('#btn-prev-slide');
    const nextBtn = this.container.querySelector('#btn-next-slide');
    const indicator = this.container.querySelector('#slide-indicator');

    // Actualizar indicador del HUD y botones
    indicator.textContent = `Diapositiva ${this.currentIndex + 1} de ${totalSlides}`;
    prevBtn.disabled = this.currentIndex === 0;

    const isLast = this.currentIndex === totalSlides - 1;
    if (isLast) {
      nextBtn.innerHTML = `<span>¡Entendido! Ir al Quiz ❓ ➡️</span>`;
    } else {
      nextBtn.innerHTML = `<span>Siguiente ➡️</span>`;
    }

    // Actualizar puntos de navegación
    const dots = this.container.querySelectorAll('.slide-dot-pill');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === this.currentIndex);
    });

    cardEl.style.setProperty('--slide-accent', slide.color || '#3b82f6');
    cardEl.innerHTML = `
      <header class="presentation-header">
        <div class="presentation-title-group">
          <span class="presentation-stage-icon">${slide.icono}</span>
          <div class="presentation-stage-titles">
            <h3 class="presentation-stage-name">${slide.nombre}</h3>
            ${slide.fecha ? `<span class="presentation-stage-date">${slide.fecha}</span>` : ''}
          </div>
        </div>
        ${this.getNarratorBarHtml()}
      </header>

      <div class="presentation-body has-image ${slide.ajusteImagen === 'completo' ? 'is-full-image' : ''}">
        <div class="presentation-visual-frame">
          <img class="presentation-main-image" src="${slide.imagen}" alt="${slide.nombre}" />
        </div>
        <div class="presentation-content-side">
          ${slide.texto ? `<p class="presentation-image-caption">${this.formatMarkdown(slide.texto)}</p>` : ''}
          ${(slide.puntos || []).map(p => `
            <div class="presentation-bullet-card">
              <span class="presentation-bullet-icon">✨</span>
              <div class="presentation-bullet-text">${this.formatMarkdown(p)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.bindVoiceControls(slide);
    this.speakSlide(slide);
  }

  getNarratorBarHtml() {
    return `
      <div class="theory-narrator-bar ${this.isSpeaking ? 'speaking' : ''} ${this.isVoicePaused ? 'paused' : ''}" id="narrator-bar">
        <div class="voice-wave-anim">
          <span></span><span></span><span></span>
        </div>
        <span class="narrator-label" id="narrator-status-text">
          ${this.isVoiceMuted ? 'Voz silenciada' : (this.isSpeaking ? 'Explicando...' : (this.isVoicePaused ? 'Pausado' : 'Lectura por voz'))}
        </span>
        <button class="btn-voice-ctrl" id="btn-voice-toggle" title="Pausar o reanudar explicación">
          ${this.isSpeaking ? '⏸️ Pausar' : '▶️ Escuchar'}
        </button>
        <button class="btn-voice-ctrl" id="btn-voice-replay" title="Volver a escuchar esta diapositiva">
          🔁 Repetir
        </button>
        <button class="btn-voice-ctrl" id="btn-voice-mute" title="Activar o silenciar voz">
          ${this.isVoiceMuted ? '🔇' : '🔊'}
        </button>
      </div>
    `;
  }

  bindVoiceControls(slide) {
    const bar = this.container.querySelector('#narrator-bar');
    if (!bar) return;

    const toggleBtn = bar.querySelector('#btn-voice-toggle');
    const replayBtn = bar.querySelector('#btn-voice-replay');
    const muteBtn = bar.querySelector('#btn-voice-mute');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleSpeech(slide);
      });
    }

    if (replayBtn) {
      replayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.speakSlide(slide, true);
      });
    }

    if (muteBtn) {
      muteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.isVoiceMuted = !this.isVoiceMuted;
        guardarBooleano(CLAVES.teoriaVozSilenciada, this.isVoiceMuted);
        if (this.isVoiceMuted) {
          this.stopSpeaking();
        } else {
          this.speakSlide(slide, true);
        }
        this.updateNarratorUi();
      });
    }
  }

  /**
   * Lee la diapositiva actual mediante SpeechSynthesis
   */
  speakSlide(slide, force = false) {
    if (!('speechSynthesis' in window)) return;
    this.stopSpeaking();

    if (this.isVoiceMuted && !force) {
      this.updateNarratorUi();
      return;
    }

    // Texto limpio a locutar
    let textToSpeak = '';
    if (slide.locucion) {
      textToSpeak = slide.locucion;
    } else {
      const puntosText = (slide.puntos || []).map(p => p.replace(/\*\*/g, '')).join('. ');
      textToSpeak = `${slide.nombre}. ${slide.fecha ? slide.fecha + '. ' : ''}${puntosText}`;
    }

    if (!textToSpeak.trim()) return;

    const requestId = this.speechRequestId;
    const slideIndex = this.currentIndex;
    const preference = speechManager.getPreference();
    const startSpeech = (preferLocal = false) => {
      if (requestId !== this.speechRequestId || slideIndex !== this.currentIndex || !this.container) return;
      const result = speechManager.createUtterance(textToSpeak, preference, { preferLocal });
      if (!result) return;
      const utter = result.utterance;

      utter.onstart = () => {
        if (this.currentUtterance !== utter) return;
        this.isSpeaking = true;
        this.isVoicePaused = false;
        this.updateNarratorUi();
      };

      utter.onend = () => {
        if (this.currentUtterance !== utter) return;
        this.isSpeaking = false;
        this.isVoicePaused = false;
        this.currentUtterance = null;
        this.updateNarratorUi();
        const nextBtn = this.container?.querySelector('#btn-next-slide');
        if (nextBtn) nextBtn.classList.add('pulse-glow');
      };

      utter.onerror = () => {
        if (this.currentUtterance !== utter) return;
        if (!preferLocal && result.voice?.localService === false) {
          this.currentUtterance = null;
          this.isSpeaking = false;
          this.isVoicePaused = false;
          startSpeech(true);
          return;
        }
        this.isSpeaking = false;
        this.isVoicePaused = false;
        this.currentUtterance = null;
        this.updateNarratorUi();
      };

      this.currentUtterance = utter;
      window.speechSynthesis.speak(utter);
    };

    if (preference.mode === 'selected' && !speechManager.getVoices().length) {
      speechManager.waitForVoices().then(() => startSpeech());
    } else {
      startSpeech();
    }
  }

  toggleSpeech(slide) {
    if (!('speechSynthesis' in window)) return;

    if (this.isSpeaking) {
      window.speechSynthesis.pause();
      this.isSpeaking = false;
      this.isVoicePaused = true;
      this.updateNarratorUi();
    } else if (this.isVoicePaused) {
      window.speechSynthesis.resume();
      this.isSpeaking = true;
      this.isVoicePaused = false;
      this.updateNarratorUi();
    } else {
      this.speakSlide(slide, true);
    }
  }

  stopSpeaking() {
    this.speechRequestId++;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.isVoicePaused = false;
    this.currentUtterance = null;
  }

  updateNarratorUi() {
    const bar = this.container?.querySelector('#narrator-bar');
    if (!bar) return;

    bar.classList.toggle('speaking', this.isSpeaking);
    bar.classList.toggle('paused', this.isVoicePaused);

    const label = bar.querySelector('#narrator-status-text');
    if (label) {
      if (this.isVoiceMuted) {
        label.textContent = 'Voz silenciada';
      } else if (this.isSpeaking) {
        label.textContent = 'Explicando...';
      } else if (this.isVoicePaused) {
        label.textContent = 'Pausado';
      } else {
        label.textContent = 'Lectura por voz';
      }
    }

    const toggleBtn = bar.querySelector('#btn-voice-toggle');
    if (toggleBtn) {
      toggleBtn.innerHTML = this.isSpeaking ? '⏸️ Pausar' : '▶️ Escuchar';
    }

    const muteBtn = bar.querySelector('#btn-voice-mute');
    if (muteBtn) {
      muteBtn.innerHTML = this.isVoiceMuted ? '🔇' : '🔊';
    }
  }

  /* ==========================================================================
     TUTOR CON IA (clave de API propia)
     ========================================================================== */
  openAiPanel() {
    if (this.aiPanel) return;
    this.stopSpeaking();
    const hasKey = aiTutor.hasKey();
    const panel = document.createElement('div');
    panel.className = 'ai-tutor-backdrop';
    panel.id = 'ai-tutor-backdrop';
    panel.innerHTML = `
      <section class="ai-tutor-panel" role="dialog" aria-modal="true" aria-labelledby="ai-tutor-title" tabindex="-1">
        <header class="ai-tutor-header">
          <div class="ai-tutor-heading">
            <span class="ai-tutor-emoji" aria-hidden="true">🤖</span>
            <div>
              <h2 id="ai-tutor-title">Pregunta sobre la teoría</h2>
              <p class="ai-tutor-context" id="ai-tutor-context"></p>
            </div>
          </div>
          <button class="btn-icon ai-tutor-close" type="button" aria-label="Cerrar el tutor">✕</button>
        </header>
        <div class="ai-tutor-body">
          <div class="ai-tutor-setup" id="ai-tutor-setup" hidden>
            <p>El tutor con IA todavía no está activado. Un adulto puede activarlo con una clave de API desde ⚙️ Configuración.</p>
            <button class="btn-primary" id="ai-tutor-open-settings" type="button">Abrir configuración</button>
          </div>
          <form class="ai-tutor-form" id="ai-tutor-form">
            <div class="ai-tutor-question-head">
              <label class="ai-tutor-label" for="ai-tutor-question">Escribe o dicta tu pregunta</label>
              <button class="ai-tutor-mic" id="ai-tutor-mic" type="button" aria-label="Dictar la pregunta por voz" title="Hablar en vez de escribir" aria-pressed="false" hidden>
                <span aria-hidden="true">🎤</span> Hablar
              </button>
            </div>
            <p class="ai-tutor-dictation-status" id="ai-tutor-dictation-status" role="status" aria-live="polite" hidden></p>
            <textarea class="ai-tutor-question" id="ai-tutor-question" maxlength="${AI_MAX_QUESTION_LENGTH}" rows="3" placeholder="¿Por qué...? ¿Qué significa...?"></textarea>
            <div class="ai-tutor-suggestions" id="ai-tutor-suggestions">
              <button type="button" data-question="Explícamelo con palabras más fáciles.">Explícamelo fácil</button>
              <button type="button" data-question="¿Qué es lo más importante de esta diapositiva?">Lo más importante</button>
              <button type="button" data-question="Ponme un ejemplo para entenderlo mejor.">Ponme un ejemplo</button>
            </div>
            <div class="ai-tutor-form-actions">
              <span class="ai-tutor-count" id="ai-tutor-count">0/${AI_MAX_QUESTION_LENGTH}</span>
              <button class="btn-primary ai-tutor-submit" id="ai-tutor-submit" type="submit">Preguntar 🤖</button>
            </div>
          </form>
          <div class="ai-tutor-answer" id="ai-tutor-answer" aria-live="polite"></div>
        </div>
      </section>
    `;
    document.body.append(panel);
    this.aiPanel = panel;

    const form = panel.querySelector('#ai-tutor-form');
    const setup = panel.querySelector('#ai-tutor-setup');
    const questionInput = panel.querySelector('#ai-tutor-question');
    const submit = panel.querySelector('#ai-tutor-submit');
    const answerEl = panel.querySelector('#ai-tutor-answer');
    const counter = panel.querySelector('#ai-tutor-count');
    const contextEl = panel.querySelector('#ai-tutor-context');
    const micButton = panel.querySelector('#ai-tutor-mic');
    const dictationStatus = panel.querySelector('#ai-tutor-dictation-status');

    contextEl.textContent = this.currentSlideLabel() ? `Sobre: ${this.currentSlideLabel()}` : '';
    if (this.supportsAiDictation()) micButton.hidden = false;
    if (!hasKey) {
      setup.hidden = false;
      form.hidden = true;
    }

    panel.querySelector('.ai-tutor-close').addEventListener('click', () => this.closeAiPanel());
    panel.addEventListener('click', event => {
      if (event.target === panel) this.closeAiPanel();
    });
    panel.querySelector('#ai-tutor-open-settings').addEventListener('click', (event) => {
      this.closeAiPanel();
      if (!this.settingsView) this.settingsView = new SettingsView();
      this.settingsView.render(event.currentTarget);
    });

    questionInput.addEventListener('input', () => {
      counter.textContent = `${questionInput.value.length}/${AI_MAX_QUESTION_LENGTH}`;
    });
    micButton.addEventListener('click', () => {
      if (this.aiRecognition) this.stopAiDictation();
      else this.startAiDictation({ questionInput, counter, micButton, statusEl: dictationStatus });
    });
    panel.querySelectorAll('#ai-tutor-suggestions button').forEach(button => {
      button.addEventListener('click', () => {
        questionInput.value = button.dataset.question || '';
        counter.textContent = `${questionInput.value.length}/${AI_MAX_QUESTION_LENGTH}`;
        questionInput.focus();
      });
    });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (this.aiRecognition) this.stopAiDictation();
      this.askAiQuestion(questionInput.value, submit, answerEl);
    });

    this.aiKeyHandler = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        this.closeAiPanel();
      }
    };
    document.addEventListener('keydown', this.aiKeyHandler);

    if (hasKey) questionInput.focus();
    else panel.querySelector('#ai-tutor-open-settings').focus();
  }

  closeAiPanel() {
    this.stopAiDictation();
    if (this.aiRequest) {
      this.aiRequest.abort();
      this.aiRequest = null;
    }
    if (this.aiKeyHandler) {
      document.removeEventListener('keydown', this.aiKeyHandler);
      this.aiKeyHandler = null;
    }
    if (this.aiPanel) {
      this.aiPanel.remove();
      this.aiPanel = null;
    }
  }

  supportsAiDictation() {
    return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  stopAiDictation() {
    const recognition = this.aiRecognition;
    if (!recognition) return;
    try {
      recognition.stop();
    } catch (error) {
      this.aiRecognition = null;
    }
  }

  setAiDictationUi(micButton, listening) {
    micButton.classList.toggle('is-listening', listening);
    micButton.setAttribute('aria-pressed', listening ? 'true' : 'false');
    micButton.innerHTML = listening
      ? '<span aria-hidden="true">⏹️</span> Detener'
      : '<span aria-hidden="true">🎤</span> Hablar';
  }

  showAiDictationStatus(statusEl, message, isError = false) {
    statusEl.hidden = !message;
    statusEl.textContent = message;
    statusEl.classList.toggle('is-error', Boolean(message) && isError);
  }

  startAiDictation({ questionInput, counter, micButton, statusEl }) {
    const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor || this.aiRecognition) return;

    let recognition;
    try {
      recognition = new SpeechRecognitionCtor();
    } catch (error) {
      this.showAiDictationStatus(statusEl, 'Este navegador no puede usar el micrófono.', true);
      return;
    }

    const baseText = questionInput.value.trim();
    let finalText = '';
    let hadError = false;

    recognition.lang = 'es-ES';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;
    this.aiRecognition = recognition;
    this.setAiDictationUi(micButton, true);
    this.showAiDictationStatus(statusEl, 'Escuchando… habla ahora.');

    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = 0; i < event.results.length; i += 1) {
        const result = event.results[i];
        transcript += (result[0]?.transcript || '') + (result.isFinal ? ' ' : '');
      }
      finalText = transcript.trim();
      const question = [baseText, finalText].filter(Boolean).join(' ');
      questionInput.value = question.slice(0, AI_MAX_QUESTION_LENGTH);
      counter.textContent = `${questionInput.value.length}/${AI_MAX_QUESTION_LENGTH}`;
    };

    recognition.onerror = (event) => {
      if (event.error === 'aborted') return;
      hadError = true;
      const messages = {
        'not-allowed': 'No se ha dado permiso al micrófono. Actívalo en los ajustes del navegador.',
        'service-not-allowed': 'El dictado no está permitido aquí. Prueba desde HTTPS o localhost.',
        'audio-capture': 'No se encuentra un micrófono disponible.',
        network: 'El dictado necesita conexión a Internet y no ha podido conectar.',
        'no-speech': 'No se ha oído ninguna pregunta. Inténtalo de nuevo hablando más cerca del micrófono.'
      };
      this.showAiDictationStatus(statusEl, messages[event.error] || 'No se ha podido dictar la pregunta.', true);
    };

    recognition.onend = () => {
      if (this.aiRecognition === recognition) this.aiRecognition = null;
      this.setAiDictationUi(micButton, false);
      if (hadError) return;
      if (finalText) {
        this.showAiDictationStatus(statusEl, 'Pregunta dictada. Revísala y pulsa Preguntar.');
        questionInput.focus();
      } else {
        this.showAiDictationStatus(statusEl, 'No se ha oído nada. Inténtalo de nuevo.', true);
      }
    };

    try {
      recognition.start();
    } catch (error) {
      this.aiRecognition = null;
      this.setAiDictationUi(micButton, false);
      this.showAiDictationStatus(statusEl, 'No se ha podido activar el micrófono.', true);
    }
  }

  async askAiQuestion(question, submit, answerEl) {
    const clean = String(question || '').trim();
    if (!clean) {
      answerEl.innerHTML = '<p class="ai-tutor-error">Escribe una pregunta para el tutor.</p>';
      return;
    }
    const controller = new AbortController();
    this.aiRequest = controller;
    submit.disabled = true;
    answerEl.innerHTML = '<p class="ai-tutor-thinking">Pensando… 🤔</p>';
    const slowTimer = setTimeout(() => {
      if (this.aiPanel) {
        answerEl.innerHTML = '<p class="ai-tutor-thinking">Sigue pensando… Gemini está tardando últimamente. Puede llegar a un minuto; no cierres esta ventana.</p>';
      }
    }, 8000);
    try {
      const answer = await aiTutor.ask({
        question: clean,
        theoryContext: this.buildAiContext(),
        currentSlide: this.currentSlideLabel(),
        signal: controller.signal
      });
      if (!this.aiPanel) return;
      this.renderAiAnswer(answer, answerEl);
    } catch (error) {
      if (!this.aiPanel || controller.signal.aborted) return;
      const message = error?.message || 'No se ha podido obtener una respuesta.';
      answerEl.innerHTML = '';
      const paragraph = document.createElement('p');
      paragraph.className = 'ai-tutor-error';
      paragraph.textContent = message;
      answerEl.append(paragraph);
    } finally {
      clearTimeout(slowTimer);
      if (this.aiRequest === controller) this.aiRequest = null;
      if (submit.isConnected) submit.disabled = false;
    }
  }

  renderAiAnswer(answer, answerEl) {
    answerEl.innerHTML = '';
    const paragraph = document.createElement('p');
    paragraph.className = 'ai-tutor-answer-text';
    paragraph.textContent = answer;
    const actions = document.createElement('div');
    actions.className = 'ai-tutor-answer-actions';
    if ('speechSynthesis' in window) {
      const listen = document.createElement('button');
      listen.type = 'button';
      listen.className = 'btn-secondary';
      listen.textContent = '🔊 Escuchar';
      listen.addEventListener('click', () => this.speakAiAnswer(answer));
      actions.append(listen);
    }
    answerEl.append(paragraph, actions);
  }

  speakAiAnswer(text) {
    if (!('speechSynthesis' in window)) return;
    const result = speechManager.createUtterance(text, speechManager.getPreference(), { preferLocal: false });
    if (!result) return;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(result.utterance);
  }

  buildAiContext() {
    const title = this.casillaData.titulo || 'Capítulo';
    const lines = this.slides.map((slide, index) => {
      const name = slide.nombre || slide.titulo || slide.fichaTitulo || `Diapositiva ${index + 1}`;
      const body = [slide.texto, ...(slide.puntos || []), slide.locucion].filter(Boolean).join(' ');
      return `${index + 1}. ${name}: ${body}`;
    });
    let context = `${title}\n${lines.join('\n')}`;
    if (context.length > AI_MAX_CONTEXT_LENGTH) context = context.slice(0, AI_MAX_CONTEXT_LENGTH) + '…';
    return context;
  }

  currentSlideLabel() {
    const slide = this.slides[this.currentIndex];
    if (!slide) return '';
    return slide.nombre || slide.titulo || slide.fichaTitulo || `Diapositiva ${this.currentIndex + 1}`;
  }

  formatMarkdown(text) {
    if (!text) return '';
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  }

  handleComplete() {
    this.cleanup();
    audio.playVictory();
    gameState.completarCasilla(this.tema.id, this.casillaData.id, 3);
    this.onComplete(3);
  }
}
