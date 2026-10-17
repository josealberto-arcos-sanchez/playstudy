/**
 * Vista de Micro-Fichas de Teoría (El Libro Interactivo)
 * - Tarjetas visuales de alto impacto (estilo infografía infantil)
 * - Texto conciso, estructurado con viñetas claras y colores temáticos
 */
import { audio } from '../audio.js';
import { gameState } from '../state.js';

export class TheoryView {
  constructor(tema, casillaData, onComplete, onExit) {
    this.tema = tema;
    this.casillaData = casillaData;
    this.onComplete = onComplete;
    this.onExit = onExit;

    this.fichas = casillaData.fichas || [];
    this.currentIndex = 0;
  }

  render(container) {
    this.container = container;
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
            <span id="slide-indicator">📖 Lectura Rápida</span>
          </div>
        </header>

        <div class="theory-content-viewport">
          <div class="theory-card" id="theory-current-card">
            <!-- Contenido de la ficha activa -->
          </div>
        </div>

        <footer class="theory-nav-footer">
          <button class="btn-secondary btn-nav" id="btn-prev-slide" disabled>
            <span>⬅️ Anterior</span>
          </button>

          <button class="btn-primary btn-nav pulse-glow" id="btn-next-slide">
            <span>¡Entendido! Ir al Quiz ❓ ➡️</span>
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
      this.onExit();
    });

    this.container.querySelector('#btn-prev-slide').addEventListener('click', () => {
      if (this.currentIndex > 0) {
        audio.playClick();
        this.currentIndex--;
        this.renderCurrentSlide();
      }
    });

    this.container.querySelector('#btn-next-slide').addEventListener('click', () => {
      audio.playClick();
      if (this.currentIndex < this.fichas.length - 1) {
        this.currentIndex++;
        this.renderCurrentSlide();
      } else {
        this.handleComplete();
      }
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
    if (this.keyHandler) {
      window.removeEventListener('keydown', this.keyHandler);
    }
  }

  renderCurrentSlide() {
    const ficha = this.fichas[this.currentIndex];
    const cardEl = this.container.querySelector('#theory-current-card');
    const prevBtn = this.container.querySelector('#btn-prev-slide');
    const nextBtn = this.container.querySelector('#btn-next-slide');
    const indicator = this.container.querySelector('#slide-indicator');

    const totalFichas = this.fichas.length;
    if (totalFichas > 1) {
      indicator.textContent = `Ficha ${this.currentIndex + 1} de ${totalFichas}`;
      prevBtn.disabled = this.currentIndex === 0;
      prevBtn.classList.remove('hidden');
    } else {
      indicator.textContent = `Paso 2: Micro-Lectura`;
      prevBtn.disabled = true;
      prevBtn.classList.add('hidden');
    }

    const isLast = this.currentIndex === totalFichas - 1;
    if (isLast) {
      nextBtn.innerHTML = `<span>¡Entendido! Ir al Quiz ❓ ➡️</span>`;
    } else {
      nextBtn.innerHTML = `<span>Siguiente ➡️</span>`;
    }

    // Renderizar tarjetas visuales de las etapas
    let contentHtml = '';

    if (ficha.tarjetas) {
      contentHtml += `
        <div class="theory-cards-grid cards-count-${ficha.tarjetas.length}">
          ${ficha.tarjetas.map(t => `
            <div class="stage-info-card" style="--stage-color: ${t.color || '#3b82f6'};">
              <div class="stage-card-header">
                <span class="stage-card-icon">${t.icono}</span>
                <div class="stage-card-title-box">
                  <h4 class="stage-name">${t.nombre}</h4>
                  <span class="stage-date">${t.fecha || ''}</span>
                </div>
              </div>
              <ul class="stage-bullets-list">
                ${t.puntos.map(p => `
                  <li><span class="bullet-check">✓</span> <span>${this.formatMarkdown(p)}</span></li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      `;
    } else if (ficha.secciones) {
      contentHtml += `
        <div class="theory-cards-grid">
          ${ficha.secciones.map(sec => `
            <div class="stage-info-card">
              <h4 class="stage-name">${sec.nombre}</h4>
              <p>${this.formatMarkdown(sec.texto)}</p>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Destacado resumen al pie
    if (ficha.destacado) {
      const d = ficha.destacado;
      const dIcon = typeof d === 'object' ? (d.icono || '💡') : '💡';
      const dTitle = typeof d === 'object' ? (d.titulo || 'Dato Clave') : 'Dato Clave';
      const dText = typeof d === 'object' ? d.texto : d;

      contentHtml += `
        <div class="theory-golden-highlight">
          <span class="highlight-big-icon">${dIcon}</span>
          <div class="highlight-body">
            <h5 class="highlight-title">${dTitle}</h5>
            <p class="highlight-text">${this.formatMarkdown(dText)}</p>
          </div>
        </div>
      `;
    }

    cardEl.innerHTML = `
      <div class="theory-card-top-bar">
        <span class="theory-main-icon">${ficha.icono || '📖'}</span>
        <div>
          <h3 class="theory-top-title">${ficha.titulo}</h3>
          <p class="theory-top-sub">${ficha.subtitulo || ''}</p>
        </div>
      </div>
      <div class="theory-body-content">
        ${contentHtml}
      </div>
    `;
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
