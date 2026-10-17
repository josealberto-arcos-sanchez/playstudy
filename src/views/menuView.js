/**
 * Vista de Menú Jerárquico Principal (Paso a paso para niños)
 * 1. Selección de Curso (ej: 5º de Primaria)
 * 2. Selección de Asignatura (ej: Ciencias Sociales)
 * 3. Selección de Tema (ej: Tema 6: Caminando entre castillos)
 * 4. Selección de Capítulo (ej: Capítulo 1: Las Edades de la Historia) -> Lanza el juego
 */
import { audio } from '../audio.js';
import { gameState } from '../state.js';

export class MenuView {
  constructor(catalogo, onSelectCapitulo) {
    this.catalogo = catalogo;
    this.onSelectCapitulo = onSelectCapitulo;

    // Nivel actual: 'cursos' | 'asignaturas' | 'temas' | 'capitulos'
    this.currentLevel = 'cursos';
    this.selectedCurso = null;
    this.selectedAsignatura = null;
    this.selectedTema = null;
  }

  render(container) {
    this.container = container;
    this.container.innerHTML = `
      <div class="menu-screen">
        <header class="menu-hud">
          <div class="menu-hud-left">
            <button class="btn-hud btn-menu-back hidden" id="btn-menu-back">
              <span>⬅️ Atrás</span>
            </button>
            <div class="menu-breadcrumbs" id="menu-breadcrumbs">
              <!-- Migas de pan dinámicas -->
            </div>
          </div>

          <div class="menu-hud-right">
            <div class="menu-total-stars">
              <span>⭐</span>
              <strong id="menu-stars-display">0</strong>
            </div>
            <button class="btn-icon" id="btn-menu-sound" title="Sonido">
              <span id="menu-sound-icon">${audio.isEnabled() ? '🔊' : '🔇'}</span>
            </button>
          </div>
        </header>

        <main class="menu-main-stage">
          <div class="menu-section-header">
            <h2 class="menu-section-title" id="menu-section-title">Elige tu Curso</h2>
            <p class="menu-section-sub" id="menu-section-sub">Selecciona para empezar a estudiar jugando</p>
          </div>

          <div class="menu-grid-container" id="menu-grid">
            <!-- Tarjetas interactivas según el nivel actual -->
          </div>
        </main>
      </div>
    `;

    this.bindEvents();
    this.renderCurrentLevel();
  }

  bindEvents() {
    // Sonido toggle
    this.container.querySelector('#btn-menu-sound').addEventListener('click', () => {
      const isEnabled = audio.toggleSound();
      this.container.querySelector('#menu-sound-icon').textContent = isEnabled ? '🔊' : '🔇';
    });

    // Botón atrás
    this.container.querySelector('#btn-menu-back').addEventListener('click', () => {
      audio.playClick();
      this.goBack();
    });
  }

  goBack() {
    if (this.currentLevel === 'capitulos') {
      this.currentLevel = 'temas';
    } else if (this.currentLevel === 'temas') {
      this.currentLevel = 'asignaturas';
    } else if (this.currentLevel === 'asignaturas') {
      this.currentLevel = 'cursos';
    }
    this.renderCurrentLevel();
  }

  renderCurrentLevel() {
    this.updateHUD();
    const grid = this.container.querySelector('#menu-grid');
    const titleEl = this.container.querySelector('#menu-section-title');
    const subEl = this.container.querySelector('#menu-section-sub');

    switch (this.currentLevel) {
      case 'cursos':
        titleEl.textContent = 'Elige tu Curso escolar';
        subEl.textContent = 'Selecciona tu curso para ver los contenidos disponibles';
        this.renderCursos(grid);
        break;

      case 'asignaturas':
        titleEl.textContent = `Asignaturas de ${this.selectedCurso.titulo}`;
        subEl.textContent = '¿Qué materia quieres repasar hoy?';
        this.renderAsignaturas(grid);
        break;

      case 'temas':
        titleEl.textContent = `Temas de ${this.selectedAsignatura.titulo}`;
        subEl.textContent = 'Selecciona el tema que estás estudiando en clase';
        this.renderTemas(grid);
        break;

      case 'capitulos':
        titleEl.textContent = `${this.selectedTema.titulo}`;
        subEl.textContent = 'Elige un capítulo para entrar a jugar en el circuito';
        this.renderCapitulos(grid);
        break;
    }
  }

  updateHUD() {
    // Estrellas totales
    const starsEl = this.container.querySelector('#menu-stars-display');
    if (starsEl) starsEl.textContent = gameState.getEstrellasTotales();

    // Botón atrás
    const backBtn = this.container.querySelector('#btn-menu-back');
    if (this.currentLevel === 'cursos') {
      backBtn.classList.add('hidden');
    } else {
      backBtn.classList.remove('hidden');
    }

    // Migas de pan (Breadcrumbs)
    const breadcrumbs = this.container.querySelector('#menu-breadcrumbs');
    let crumbsHtml = `<span class="crumb-link" data-level="cursos">🎒 Cursos</span>`;

    if (this.selectedCurso && this.currentLevel !== 'cursos') {
      crumbsHtml += ` <span class="crumb-sep">›</span> <span class="crumb-link" data-level="asignaturas">${this.selectedCurso.titulo}</span>`;
    }
    if (this.selectedAsignatura && (this.currentLevel === 'temas' || this.currentLevel === 'capitulos')) {
      crumbsHtml += ` <span class="crumb-sep">›</span> <span class="crumb-link" data-level="temas">${this.selectedAsignatura.titulo}</span>`;
    }
    if (this.selectedTema && this.currentLevel === 'capitulos') {
      crumbsHtml += ` <span class="crumb-sep">›</span> <span class="crumb-current">${this.selectedTema.titulo}</span>`;
    }

    breadcrumbs.innerHTML = crumbsHtml;

    // Clic en migas de pan para retroceder rápido
    breadcrumbs.querySelectorAll('.crumb-link').forEach(link => {
      link.addEventListener('click', () => {
        const targetLevel = link.dataset.level;
        if (targetLevel !== this.currentLevel) {
          audio.playClick();
          this.currentLevel = targetLevel;
          this.renderCurrentLevel();
        }
      });
    });
  }

  renderCursos(grid) {
    grid.innerHTML = (this.catalogo.cursos || []).map(curso => `
      <div class="menu-card menu-card-course" data-id="${curso.id}" style="--accent: ${curso.color || '#3b82f6'};">
        <div class="card-hero-icon">${curso.icono}</div>
        <div class="card-info">
          <h3 class="card-main-title">${curso.titulo}</h3>
          <p class="card-sub-title">${curso.subtitulo}</p>
          <div class="card-meta-pill">
            <span>📚 ${(curso.asignaturas || []).length} Asignatura disponible</span>
          </div>
        </div>
        <div class="card-action-arrow">➡️</div>
      </div>
    `).join('');

    grid.querySelectorAll('.menu-card').forEach(card => {
      card.addEventListener('click', () => {
        audio.playClick();
        const cursoId = card.dataset.id;
        this.selectedCurso = this.catalogo.cursos.find(c => c.id === cursoId);
        this.currentLevel = 'asignaturas';
        this.renderCurrentLevel();
      });
    });
  }

  renderAsignaturas(grid) {
    const asignaturas = this.selectedCurso.asignaturas || [];
    grid.innerHTML = asignaturas.map(asig => `
      <div class="menu-card menu-card-subject" data-id="${asig.id}" style="--accent: ${asig.color || '#f59e0b'};">
        <div class="card-hero-icon">${asig.icono}</div>
        <div class="card-info">
          <h3 class="card-main-title">${asig.titulo}</h3>
          <p class="card-sub-title">${asig.subtitulo}</p>
          <div class="card-meta-pill">
            <span>📖 ${(asig.temas || []).length} Tema preparado</span>
          </div>
        </div>
        <div class="card-action-arrow">➡️</div>
      </div>
    `).join('');

    grid.querySelectorAll('.menu-card').forEach(card => {
      card.addEventListener('click', () => {
        audio.playClick();
        const asigId = card.dataset.id;
        this.selectedAsignatura = asignaturas.find(a => a.id === asigId);
        this.currentLevel = 'temas';
        this.renderCurrentLevel();
      });
    });
  }

  renderTemas(grid) {
    const temas = this.selectedAsignatura.temas || [];
    grid.innerHTML = temas.map(tema => `
      <div class="menu-card menu-card-topic" data-id="${tema.id}" style="--accent: ${tema.color || '#8b5cf6'};">
        <div class="card-hero-icon">${tema.icono}</div>
        <div class="card-info">
          <span class="card-badge-num">Unidad ${tema.numero}</span>
          <h3 class="card-main-title">${tema.titulo}</h3>
          <p class="card-sub-title">${tema.subtitulo}</p>
          <div class="card-meta-pill">
            <span>🎮 ${(tema.capitulos || []).length} Juego / Capítulo</span>
          </div>
        </div>
        <div class="card-action-arrow">➡️</div>
      </div>
    `).join('');

    grid.querySelectorAll('.menu-card').forEach(card => {
      card.addEventListener('click', () => {
        audio.playClick();
        const temaId = card.dataset.id;
        this.selectedTema = temas.find(t => t.id === temaId);
        this.currentLevel = 'capitulos';
        this.renderCurrentLevel();
      });
    });
  }

  renderCapitulos(grid) {
    const capitulos = this.selectedTema.capitulos || [];
    grid.innerHTML = capitulos.map(cap => {
      const progreso = gameState.getTemaProgreso(cap.id);
      const estrellas = Object.values(progreso.estrellas || {}).reduce((a, b) => a + b, 0);
      const isPerfect = estrellas >= (cap.total_estrellas_posibles || 18);

      return `
        <div class="menu-card menu-card-chapter ${isPerfect ? 'chapter-perfect' : ''}" data-id="${cap.id}">
          <div class="card-hero-icon">${cap.icono}</div>
          <div class="card-info">
            <span class="card-badge-num">Capítulo ${cap.numero}</span>
            <h3 class="card-main-title">${cap.titulo}</h3>
            <p class="card-sub-title">${cap.subtitulo}</p>
            
            <div class="chapter-stars-row">
              <span class="chapter-stars-icon">${isPerfect ? '👑' : '⭐'}</span>
              <span class="chapter-stars-text">${estrellas} / ${cap.total_estrellas_posibles || 18} estrellas</span>
            </div>
          </div>
          
          <button class="btn-primary btn-play-chapter">
            <span>¡Jugar! 🎮</span>
          </button>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.menu-card').forEach(card => {
      card.addEventListener('click', () => {
        audio.playClick();
        const capId = card.dataset.id;
        const capituloObj = capitulos.find(c => c.id === capId);
        this.onSelectCapitulo(capituloObj);
      });
    });
  }
}
