/**
 * Vista de Micro-Fichas de Teoría (Modo Presentación Educativa con Locución por Voz)
 * - Diapositiva a diapositiva con esquemas claros e infografías
 * - Lectura guiada en voz alta con Web Speech Synthesis nativa
 * - Control de avance con 'Siguiente', pausa y repetición
 */
import { audio } from '../audio.js';
import { gameState } from '../state.js';
import { speechManager } from '../speech.js';

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
    this.isVoiceMuted = localStorage.getItem('playstudy_theory_mute') === 'true';
    this.currentUtterance = null;
    this.speechRequestId = 0;
  }

  /**
   * Transforma las fichas y tarjetas en una secuencia de diapositivas individuales
   */
  buildSlides(casillaData) {
    const rawFichas = casillaData.fichas || [];
    const slides = [];

    rawFichas.forEach((ficha, fIndex) => {
      // Si la ficha contiene tarjetas individuales (etapas o conceptos)
      if (ficha.tarjetas && ficha.tarjetas.length > 0) {
        ficha.tarjetas.forEach((t, tIndex) => {
          slides.push({
            tipo: 'tarjeta',
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
            texto: t.texto || ''
          });
        });

        // Si tiene un destacado/resumen final, se añade como diapositiva de cierre
        if (ficha.destacado) {
          const d = ficha.destacado;
          slides.push({
            tipo: 'destacado',
            fichaTitulo: ficha.titulo,
            fichaSubtitulo: ficha.subtitulo,
            fichaIcono: ficha.icono,
            icono: typeof d === 'object' ? (d.icono || '💡') : '💡',
            titulo: typeof d === 'object' ? (d.titulo || 'Dato Clave') : 'Dato Clave',
            texto: typeof d === 'object' ? d.texto : d,
            locucion: typeof d === 'object' ? (d.locucion || '') : '',
            color: '#f59e0b'
          });
        }
      } else if (ficha.secciones && ficha.secciones.length > 0) {
        ficha.secciones.forEach((sec) => {
          slides.push({
            tipo: 'seccion',
            fichaTitulo: ficha.titulo,
            nombre: sec.nombre,
            icono: ficha.icono || '📖',
            color: '#3b82f6',
            texto: sec.texto,
            locucion: sec.locucion || ''
          });
        });
      } else {
        // Ficha estándar individual
        slides.push({
          tipo: 'ficha_simple',
          fichaTitulo: ficha.titulo,
          fichaSubtitulo: ficha.subtitulo,
          icono: ficha.icono || '📖',
          color: '#3b82f6',
          puntos: ficha.puntos || [],
          destacado: ficha.destacado || null,
          locucion: ficha.locucion || ''
        });
      }
    });

    return slides.length > 0 ? slides : [{
      tipo: 'tarjeta',
      fichaTitulo: casillaData.titulo,
      nombre: casillaData.titulo,
      icono: casillaData.icono || '📖',
      color: '#3b82f6',
      puntos: [casillaData.descripcion || 'Contenido de la lección.']
    }];
  }

  render(container) {
    this.container = container;
    const totalSlides = this.slides.length;

    this.container.innerHTML = `
      <div class="theory-wrapper">
        <header class="theory-hud">
          <button class="btn-hud btn-back" id="btn-theory-exit" title="Volver al circuito">
            <span>⬅️ Circuito</span>
          </button>
          
          <div class="theory-title-area">
            <h2 class="theory-main-title">${this.casillaData.titulo}</h2>
          </div>

          <div class="theory-badge">
            <span id="slide-indicator">Diapositiva 1 de ${totalSlides}</span>
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

    // Renderizar según el tipo de diapositiva
    if (slide.tipo === 'destacado') {
      cardEl.style.setProperty('--slide-accent', slide.color);
      cardEl.innerHTML = `
        <header class="presentation-header">
          <div class="presentation-title-group">
            <span class="presentation-stage-icon">💡</span>
            <div class="presentation-stage-titles">
              <h3 class="presentation-stage-name">${slide.titulo}</h3>
              <span class="presentation-stage-date">Resumen Clave</span>
            </div>
          </div>
          ${this.getNarratorBarHtml()}
        </header>

        <div class="presentation-body">
          <div class="presentation-destacado-slide">
            <span class="presentation-destacado-big-icon">${slide.icono}</span>
            <h4 class="presentation-destacado-title">${slide.titulo}</h4>
            <p class="presentation-destacado-text">${this.formatMarkdown(slide.texto)}</p>
          </div>
        </div>
      `;
    } else {
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

        <div class="presentation-body ${slide.imagen ? 'has-image' : ''}">
          ${slide.imagen ? `
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
          ` : (slide.puntos || []).map(p => `
            <div class="presentation-bullet-card">
              <span class="presentation-bullet-icon">✨</span>
              <div class="presentation-bullet-text">${this.formatMarkdown(p)}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

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
        localStorage.setItem('playstudy_theory_mute', this.isVoiceMuted);
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
    } else if (slide.tipo === 'destacado') {
      textToSpeak = `${slide.titulo}. ${slide.texto.replace(/\*\*/g, '')}`;
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
