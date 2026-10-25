/**
 * Aplicación Principal - Orquestador del Juego Educativo
 * Controla el ciclo de vida, el menú jerárquico y el tablero de juego
 */
import { DataLoader } from './dataLoader.js';
import { gameState } from './state.js';
import { audio } from './audio.js';
import { speechManager } from './speech.js';
import { MenuView } from './views/menuView.js';
import { MapView } from './views/mapView.js';
import { TheoryView } from './views/theoryView.js';
import { QuizView } from './views/quizView.js';
import { MemoryGame } from './games/memoryGame.js';
import { PuzzleGame } from './games/puzzleGame.js';
import { TimelineGame } from './games/timelineGame.js';

/**
 * Registros de vistas por tipo de casilla.
 *
 * `GAME_REGISTRY` mapea cada subtipo de minijuego a su clase y `TYPE_REGISTRY`
 * cada tipo de casilla fija a su vista. Para añadir un minijuego nuevo basta con
 * crear su archivo en src/games/, importarlo aquí y sumar una línea a este
 * registro; el material se define en el `contenido.json` del capítulo.
 */
const GAME_REGISTRY = {
  parejas: MemoryGame,
  puzzle: PuzzleGame,
  linea_tiempo: TimelineGame
};

const TYPE_REGISTRY = {
  teoria: TheoryView,
  quiz: QuizView
};

class App {
  constructor() {
    this.root = document.getElementById('app-root');
    this.catalogo = null;
    this.currentCapitulo = null;
    this.currentViewInstance = null;
  }

  async init() {
    console.log("Iniciando Aventura Educativa...");
    speechManager.init();
    
    const unlockAudio = () => {
      audio.init();
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('pointerdown', unlockAudio);
    window.addEventListener('keydown', unlockAudio);

    // Cargar catálogo jerárquico (Cursos > Asignaturas > Temas > Capítulos)
    this.catalogo = await DataLoader.loadCatalogo();

    // Iniciar en el menú principal
    this.showMenu();
  }

  showMenu() {
    this.cleanupCurrentView();
    if (!this.catalogo) {
      this.root.innerHTML = `
        <div class="error-panel">
          <h2>No se han podido cargar los datos</h2>
          <p>Ejecuta <code>scripts/actualizar_datos.ps1</code> para sincronizar <code>data/catalogo_data.js</code> y vuelve a abrir el juego.</p>
        </div>
      `;
      return;
    }
    const menuView = new MenuView(
      this.catalogo,
      async (capituloObj, temaObj) => {
        // Cargar capítulo seleccionado y mostrar su circuito.
        // El tema aporta la lista de juegos que debe mostrar el capítulo.
        const capituloData = await DataLoader.loadCapitulo(capituloObj, temaObj);
        if (!capituloData) return;
        this.currentCapitulo = capituloData;
        this.showMap();
      }
    );
    this.currentViewInstance = menuView;
    menuView.render(this.root);
  }

  showMap() {
    this.cleanupCurrentView();
    const mapView = new MapView(
      this.currentCapitulo,
      (casillaData) => this.openCasilla(casillaData),
      () => this.showMap(),
      () => this.showMenu() // Volver al menú de capítulos
    );
    this.currentViewInstance = mapView;
    mapView.render(this.root);
  }

  openCasilla(casillaData) {
    this.cleanupCurrentView();

    const onStepComplete = () => {
      this.showMap();
    };

    const onExit = () => {
      this.showMap();
    };

    const ViewClass = casillaData.tipo === 'minijuego'
      ? GAME_REGISTRY[casillaData.subtipo]
      : TYPE_REGISTRY[casillaData.tipo];

    if (!ViewClass) {
      console.warn('Tipo o subtipo de casilla no registrado:', casillaData.tipo, casillaData.subtipo);
      this.showMap();
      return;
    }

    this.currentViewInstance = new ViewClass(this.currentCapitulo, casillaData, onStepComplete, onExit);
    this.currentViewInstance.render(this.root);
  }

  cleanupCurrentView() {
    if (this.currentViewInstance && typeof this.currentViewInstance.cleanup === 'function') {
      this.currentViewInstance.cleanup();
    }
    this.root.innerHTML = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
