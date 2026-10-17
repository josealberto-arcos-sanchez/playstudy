/**
 * Aplicación Principal - Orquestador del Juego Educativo
 * Controla el ciclo de vida, el menú jerárquico y el tablero de juego
 */
import { DataLoader } from './dataLoader.js';
import { gameState } from './state.js';
import { audio } from './audio.js';
import { MenuView } from './views/menuView.js';
import { MapView } from './views/mapView.js';
import { TheoryView } from './views/theoryView.js';
import { QuizView } from './views/quizView.js';
import { MemoryGame } from './games/memoryGame.js';
import { PuzzleGame } from './games/puzzleGame.js';

class App {
  constructor() {
    this.root = document.getElementById('app-root');
    this.catalogo = null;
    this.currentCapitulo = null;
    this.currentViewInstance = null;
  }

  async init() {
    console.log("Iniciando Aventura Educativa...");
    
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
    const menuView = new MenuView(
      this.catalogo,
      async (capituloObj) => {
        // Cargar capítulo seleccionado y mostrar su circuito
        const capituloData = await DataLoader.loadCapitulo(capituloObj);
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

    switch (casillaData.tipo) {
      case 'minijuego':
        if (casillaData.subtipo === 'parejas') {
          this.currentViewInstance = new MemoryGame(this.currentCapitulo, casillaData, onStepComplete, onExit);
          this.currentViewInstance.render(this.root);
        } else if (casillaData.subtipo === 'puzzle') {
          this.currentViewInstance = new PuzzleGame(this.currentCapitulo, casillaData, onStepComplete, onExit);
          this.currentViewInstance.render(this.root);
        }
        break;

      case 'teoria':
        this.currentViewInstance = new TheoryView(this.currentCapitulo, casillaData, onStepComplete, onExit);
        this.currentViewInstance.render(this.root);
        break;

      case 'quiz':
        this.currentViewInstance = new QuizView(this.currentCapitulo, casillaData, onStepComplete, onExit);
        this.currentViewInstance.render(this.root);
        break;

      default:
        console.warn("Tipo de casilla desconocido:", casillaData.tipo);
        this.showMap();
        break;
    }
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
