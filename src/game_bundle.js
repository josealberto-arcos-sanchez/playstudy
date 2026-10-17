/**
 * Videojuego Educativo: Aventura en el Tiempo (Versión con Menú Jerárquico v3.0)
 * 100% Autónomo para ejecución directa con doble clic en index.html o servidor HTTP
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. GESTOR DE AUDIO SINTETIZADO (Web Audio API)
     ========================================================================== */
  class AudioManager {
    constructor() {
      this.ctx = null;
      this.enabled = localStorage.getItem('sound_enabled') !== 'false';
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggleSound() {
      this.enabled = !this.enabled;
      localStorage.setItem('sound_enabled', this.enabled);
      if (this.enabled) {
        this.init();
        this.playClick();
      }
      return this.enabled;
    }

    isEnabled() {
      return this.enabled;
    }

    playClick() {
      if (!this.enabled) return;
      this.init();
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
      } catch (e) {}
    }

    playFlip() {
      if (!this.enabled) return;
      this.init();
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
      } catch (e) {}
    }

    playMatch() {
      if (!this.enabled) return;
      this.init();
      try {
        const now = this.ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.08);

          gain.gain.setValueAtTime(0.2, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.25);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.25);
        });
      } catch (e) {}
    }

    playMismatch() {
      if (!this.enabled) return;
      this.init();
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(190, now + 0.18);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.18);
      } catch (e) {}
    }

    playCorrect() {
      if (!this.enabled) return;
      this.init();
      try {
        const now = this.ctx.currentTime;
        const notes = [587.33, 739.99, 880, 1174.66];
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);

          gain.gain.setValueAtTime(0.25, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.35);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.35);
        });
      } catch (e) {}
    }

    playWrong() {
      if (!this.enabled) return;
      this.init();
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.linearRampToValueAtTime(120, now + 0.25);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.25);
      } catch (e) {}
    }

    playVictory() {
      if (!this.enabled) return;
      this.init();
      try {
        const now = this.ctx.currentTime;
        const notes = [
          { f: 523.25, t: 0.0, d: 0.15 },
          { f: 659.25, t: 0.15, d: 0.15 },
          { f: 783.99, t: 0.30, d: 0.15 },
          { f: 1046.50, t: 0.45, d: 0.50 }
        ];

        notes.forEach(({ f, t, d }) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + t);

          gain.gain.setValueAtTime(0.3, now + t);
          gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now + t);
          osc.stop(now + t + d);
        });
      } catch (e) {}
    }

    playSnap() {
      if (!this.enabled) return;
      this.init();
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.08);
      } catch (e) {}
    }

    playBoing() {
      if (!this.enabled) return;
      this.init();
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(550, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.3);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.35);
      } catch (e) {}
    }

    playGiggle() {
      if (!this.enabled) return;
      this.init();
      try {
        const now = this.ctx.currentTime;
        [600, 750, 600, 800, 650].forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);

          gain.gain.setValueAtTime(0.18, now + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.06);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now + idx * 0.07);
          osc.stop(now + idx * 0.07 + 0.06);
        });
      } catch (e) {}
    }
  }

  const audio = new AudioManager();

  /* ==========================================================================
     2. GESTOR DE ESTADO PERSISTENTE (LocalStorage)
     ========================================================================== */
  class StateManager {
    constructor() {
      this.storageKey = 'aventura_educativa_state_v3';
      this.state = this.loadState();
    }

    loadState() {
      try {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) return JSON.parse(saved);
      } catch (e) {}
      return {
        temas: {},
        temaActualId: 'cap_01_edades',
        estrellasTotales: 0
      };
    }

    saveState() {
      try {
        this.recalcularEstrellasTotales();
        localStorage.setItem(this.storageKey, JSON.stringify(this.state));
      } catch (e) {}
    }

    recalcularEstrellasTotales() {
      let total = 0;
      Object.values(this.state.temas).forEach(t => {
        if (t.estrellas) {
          Object.values(t.estrellas).forEach(cant => {
            total += Number(cant) || 0;
          });
        }
      });
      this.state.estrellasTotales = total;
    }

    getTemaProgreso(temaId) {
      if (!this.state.temas[temaId]) {
        this.state.temas[temaId] = {
          casillaDesbloqueada: 1,
          estrellas: {}
        };
      }
      return this.state.temas[temaId];
    }

    isCasillaDesbloqueada(temaId, casillaId) {
      const progreso = this.getTemaProgreso(temaId);
      return casillaId <= progreso.casillaDesbloqueada;
    }

    getEstrellasCasilla(temaId, casillaId) {
      const progreso = this.getTemaProgreso(temaId);
      return progreso.estrellas[casillaId] || 0;
    }

    completarCasilla(temaId, casillaId, estrellas = 3) {
      const progreso = this.getTemaProgreso(temaId);
      const actual = progreso.estrellas[casillaId] || 0;
      if (estrellas > actual) {
        progreso.estrellas[casillaId] = estrellas;
      }
      if (progreso.casillaDesbloqueada <= casillaId) {
        progreso.casillaDesbloqueada = casillaId + 1;
      }
      this.saveState();
    }

    reiniciarProgresoTema(temaId) {
      if (this.state.temas[temaId]) {
        this.state.temas[temaId] = {
          casillaDesbloqueada: 1,
          estrellas: {}
        };
        this.saveState();
      }
    }

    getEstrellasTotales() {
      this.recalcularEstrellasTotales();
      return this.state.estrellasTotales || 0;
    }
  }

  const gameState = new StateManager();

  /* ==========================================================================
     3. DATOS DE CATÁLOGO Y CONTENIDO
     ========================================================================== */
  const defaultCatalogo = {
    "version": "1.0",
    "cursos": [
      {
        "id": "5_primaria",
        "titulo": "5º de Primaria",
        "subtitulo": "Educación Primaria",
        "icono": "🎒",
        "color": "#3b82f6",
        "asignaturas": [
          {
            "id": "ciencias_sociales",
            "titulo": "Ciencias Sociales",
            "subtitulo": "Historia, Geografía y Sociedad",
            "icono": "🌍",
            "color": "#f59e0b",
            "temas": [
              {
                "id": "tema_06_castillos",
                "numero": 6,
                "titulo": "Tema 6: Caminando entre castillos",
                "subtitulo": "La Prehistoria y las Edades de la Historia",
                "icono": "🏰",
                "color": "#8b5cf6",
                "capitulos": [
                  {
                    "id": "cap_01_edades",
                    "numero": 1,
                    "titulo": "Capítulo 1: Las Edades de la Historia",
                    "subtitulo": "La Prehistoria, la Historia y sus etapas clave",
                    "icono": "🏛️",
                    "archivo": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_01_edades/contenido.json",
                    "assets_dir": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_01_edades/assets/",
                    "total_estrellas_posibles": 18
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  const defaultCapituloData = {
    "id": "cap_01_edades",
    "curso_id": "5_primaria",
    "asignatura_id": "ciencias_sociales",
    "tema_id": "tema_06_castillos",
    "titulo": "Capítulo 1: Las Edades de la Historia",
    "subtitulo": "Descubre las etapas de la Prehistoria y de la Historia",
    "icono": "🏛️",
    "color_primario": "#f59e0b",
    "color_secundario": "#d97706",
    "es_circular": true,
    "casillas": [
      {
        "id": 1,
        "tipo": "minijuego",
        "subtipo": "parejas",
        "titulo": "1. Parejas del Tiempo",
        "descripcion": "Encuentra las 7 parejas entre las 14 cartas misteriosas.",
        "icono": "🃏",
        "parejas": [
          { "id": "paleolitico", "etiqueta": "Paleolítico", "icono": "🔥", "detalle": "Nómadas, caza y fuego", "color": "#ef4444" },
          { "id": "neolitico", "etiqueta": "Neolítico", "icono": "🌾", "detalle": "Agricultura y poblados", "color": "#10b981" },
          { "id": "metales", "etiqueta": "Edad de los Metales", "icono": "⚔️", "detalle": "Cobre, bronce y hierro", "color": "#f97316" },
          { "id": "antigua", "etiqueta": "Edad Antigua", "icono": "🏛️", "detalle": "Invención de la escritura", "color": "#3b82f6" },
          { "id": "media", "etiqueta": "Edad Media", "icono": "🏰", "detalle": "Castillos y señores feudales", "color": "#8b5cf6" },
          { "id": "moderna", "etiqueta": "Edad Moderna", "icono": "⛵", "detalle": "Llegada a América (1492)", "color": "#06b6d4" },
          { "id": "contemporanea", "etiqueta": "Edad Contemporánea", "icono": "🚀", "detalle": "Desde 1789 hasta hoy", "color": "#ec4899" }
        ]
      },
      {
        "id": 2,
        "tipo": "teoria",
        "titulo": "2. Ficha: La Prehistoria",
        "descripcion": "Aprende las 3 etapas antes de que se inventara la escritura.",
        "icono": "🦴",
        "fichas": [
          {
            "titulo": "La Prehistoria (Hace 2,5 mill. de años - 3500 a.C.)",
            "subtitulo": "Desde la aparición de los primeros humanos hasta inventar la escritura",
            "icono": "🦴",
            "tarjetas": [
              {
                "nombre": "Paleolítico",
                "fecha": "Hace 2,5 mill. de años",
                "icono": "🔥",
                "color": "#ef4444",
                "puntos": [
                  "Eran **nómadas**: se desplazaban para cazar, pescar y recolectar frutos.",
                  "Descubrieron el dominio del **fuego** y pintaban en cuevas."
                ]
              },
              {
                "nombre": "Neolítico",
                "fecha": "8.000 a.C.",
                "icono": "🌾",
                "color": "#10b981",
                "puntos": [
                  "Nació la **agricultura** y la **ganadería**.",
                  "Se hicieron **sedentarios** (vivían en un sitio fijo) y crearon poblados."
                ]
              },
              {
                "nombre": "Edad de los Metales",
                "fecha": "5.000 a.C.",
                "icono": "⚔️",
                "color": "#f97316",
                "puntos": [
                  "Aprendieron a moldear metales: **Cobre**, **Bronce** y **Hierro**.",
                  "Fabricaron herramientas, armas y vasijas más resistentes."
                ]
              }
            ],
            "destacado": {
              "icono": "📍",
              "titulo": "Tesoros prehistóricos en España",
              "texto": "Destacan los fósiles humanos de **Atapuerca** (Burgos) y las pinturas rupestres de **Altamira** (Cantabria)."
            }
          }
        ]
      },
      {
        "id": 3,
        "tipo": "quiz",
        "titulo": "3. Quiz: Prehistoria",
        "descripcion": "Preguntas aleatorias para demostrar lo aprendido sobre la Prehistoria.",
        "icono": "❓",
        "preguntas": [
          {
            "enunciado": "¿Con qué acontecimiento comenzó la Prehistoria hace aproximadamente 2,5 millones de años?",
            "opciones": [
              "Con la aparición de los primeros seres humanos",
              "Con la invención de la rueda de coche",
              "Con la llegada del ser humano a la Luna",
              "Con la construcción de los primeros castillos"
            ],
            "correcta": 0,
            "explicacion": "¡Genial! La Prehistoria se inició hace 2,5 millones de años con la aparición del ser humano."
          },
          {
            "enunciado": "¿Cómo vivían los seres humanos en el Paleolítico antes de descubrir la agricultura?",
            "opciones": [
              "Eran nómadas (se desplazaban para cazar, pescar y recolectar)",
              "Vivían en ciudades con rascacielos y coches",
              "Eran sedentarios en castillos de piedra",
              "Viajaban en trenes de vapor entre poblados"
            ],
            "correcta": 0,
            "explicacion": "¡Exacto! En el Paleolítico eran nómadas y se movían continuamente en busca de alimento y refugio."
          },
          {
            "enunciado": "¿Qué gran descubrimiento del Paleolítico permitió calentarse, cocinar alimentos y ahuyentar fieras?",
            "opciones": [
              "El dominio del fuego",
              "La bombilla eléctrica",
              "La máquina de vapor",
              "La brújula magnética"
            ],
            "correcta": 0,
            "explicacion": "¡Correcto! El dominio del fuego fue fundamental para iluminar las cuevas, cocinar y calentarse."
          },
          {
            "enunciado": "¿Qué dos grandes actividades surgieron hacia el 8.000 a.C. dando inicio al Neolítico?",
            "opciones": [
              "La agricultura y la ganadería",
              "La minería del carbón y el ferrocarril",
              "La pesca con submarinos y la caza con arcos de metal",
              "La navegación a vapor y el comercio espacial"
            ],
            "correcta": 0,
            "explicacion": "¡Genial! Al cultivar plantas y criar animales, las personas transformaron por completo su modo de vida."
          },
          {
            "enunciado": "¿Qué significa que en el Neolítico los humanos se hicieron 'sedentarios'?",
            "opciones": [
              "Que pasaron a vivir en un sitio fijo y crearon poblados",
              "Que viajaban cada semana a un país diferente",
              "Que vivían únicamente flotando en balsas",
              "Que no podían hablar entre ellos"
            ],
            "correcta": 0,
            "explicacion": "¡Muy bien! Se volvieron sedentarios porque tenían que permanecer cerca de sus cultivos y rebaños."
          },
          {
            "enunciado": "¿En qué tres periodos se divide la Edad de los Metales según los materiales que aprendieron a moldear?",
            "opciones": [
              "Edad del Cobre, Edad del Bronce y Edad del Hierro",
              "Edad del Oro, Edad de la Plata y Edad del Diamante",
              "Edad del Plástico, Edad del Vidrio y Edad del Papel",
              "Edad del Carbón, Edad del Petróleo y Edad del Gas"
            ],
            "correcta": 0,
            "explicacion": "¡Así es! Aprendieron a fundir y moldear sucesivamente el cobre, el bronce y finalmente el hierro."
          },
          {
            "enunciado": "¿Qué ventaja aportó el trabajo con metales frente a las herramientas antiguas de piedra?",
            "opciones": [
              "Fabricar herramientas, armas y vasijas mucho más resistentes",
              "Hizo que los utensilios pesaran menos que una pluma",
              "Solo servían como juguetes para los niños",
              "Las herramientas de metal se rompían con más facilidad"
            ],
            "correcta": 0,
            "explicacion": "¡Excelente! Los metales permitieron fabricar instrumentos mucho más duraderos, afilados y resistentes."
          },
          {
            "enunciado": "¿En qué provincia española se encuentra el famoso yacimiento de Atapuerca, conocido por sus fósiles humanos?",
            "opciones": [
              "Burgos",
              "Sevilla",
              "Valencia",
              "Barcelona"
            ],
            "correcta": 0,
            "explicacion": "¡Perfecto! Atapuerca (Burgos) es un tesoro arqueológico mundial para conocer a los primeros humanos de Europa."
          },
          {
            "enunciado": "¿En qué comunidad autónoma se halla la célebre cueva de Altamira, famosa por sus pinturas rupestres?",
            "opciones": [
              "Cantabria",
              "Andalucía",
              "Galicia",
              "Islas Baleares"
            ],
            "correcta": 0,
            "explicacion": "¡Sensacional! Las pinturas de bisontes de la cueva de Altamira están en Cantabria."
          },
          {
            "enunciado": "¿Cuál es el orden cronológico correcto de las tres etapas de la Prehistoria?",
            "opciones": [
              "Paleolítico ➡️ Neolítico ➡️ Edad de los Metales",
              "Edad de los Metales ➡️ Neolítico ➡️ Paleolítico",
              "Neolítico ➡️ Paleolítico ➡️ Edad de los Metales",
              "Paleolítico ➡️ Edad de los Metales ➡️ Neolítico"
            ],
            "correcta": 0,
            "explicacion": "¡Bravo! Primero fue el Paleolítico, después el Neolítico y por último la Edad de los Metales."
          }
        ]
      },
      {
        "id": 4,
        "tipo": "minijuego",
        "subtipo": "puzzle",
        "titulo": "4. Puzzle: ¡Desafío de la Cueva!",
        "descripcion": "Ordena las 6 piezas del dibujo.",
        "icono": "🧩",
        "imagen": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_01_edades/assets/puzzle.jpg"
      },
      {
        "id": 5,
        "tipo": "teoria",
        "titulo": "5. Ficha: La Historia",
        "descripcion": "Las 4 grandes edades desde que el ser humano aprendió a escribir.",
        "icono": "📜",
        "fichas": [
          {
            "titulo": "La Historia (Desde 3500 a.C. hasta la actualidad)",
            "subtitulo": "Comienza oficialmente con la invención de la escritura",
            "icono": "📜",
            "tarjetas": [
              {
                "nombre": "Edad Antigua",
                "fecha": "3500 a.C. - 476 d.C.",
                "icono": "🏛️",
                "color": "#3b82f6",
                "puntos": [
                  "Civilizaciones: **Egipto, Grecia y Roma**.",
                  "Los romanos ocuparon la península y la llamaron **Hispania**."
                ]
              },
              {
                "nombre": "Edad Media",
                "fecha": "476 - 1492",
                "icono": "🏰",
                "color": "#8b5cf6",
                "puntos": [
                  "Comenzó con la **caída del Imperio romano**.",
                  "Época de señores feudales, castillos y el **reino visigodo**."
                ]
              },
              {
                "nombre": "Edad Moderna",
                "fecha": "1492 - 1789",
                "icono": "⛵",
                "color": "#06b6d4",
                "puntos": [
                  "Comenzó con la **llegada de Colón a América** (1492).",
                  "Destacó el reinado de los **Reyes Católicos** en España."
                ]
              },
              {
                "nombre": "Contemporánea",
                "fecha": "1789 - Actualidad",
                "icono": "🚀",
                "color": "#ec4899",
                "puntos": [
                  "Inició con la **Revolución francesa**.",
                  "España luchó en la Guerra de Independencia. Llega hasta hoy."
                ]
              }
            ],
            "destacado": {
              "icono": "💡",
              "titulo": "Dato Clave de la Historia",
              "texto": "¡La invención de la **escritura** marca la frontera entre la Prehistoria y la Historia!"
            }
          }
        ]
      },
      {
        "id": 6,
        "tipo": "quiz",
        "titulo": "6. Quiz: La Historia",
        "descripcion": "Preguntas aleatorias para demostrar lo aprendido sobre las Edades de la Historia.",
        "icono": "🏆",
        "preguntas": [
          {
            "enunciado": "¿Qué invento fundamental marca el inicio de la Historia y el fin de la Prehistoria hacia el 3500 a.C.?",
            "opciones": [
              "La invención de la escritura",
              "El descubrimiento del fuego",
              "La invención del microscopio",
              "El primer automóvil con motor"
            ],
            "correcta": 0,
            "explicacion": "¡Muy bien! Cuando el ser humano aprendió a escribir, comenzó oficialmente la Historia."
          },
          {
            "enunciado": "¿Por qué los historiadores dividen la Historia en distintas etapas o edades?",
            "opciones": [
              "Para facilitar su estudio, separadas por hechos de cambio profundo",
              "Para que los libros de texto no pesaran demasiado",
              "Porque cada siglo cambia el nombre de los planetas",
              "Para que cada época tuviera una bandera de color distinto"
            ],
            "correcta": 0,
            "explicacion": "¡Exacto! Se divide en edades para ordenar su estudio, delimitadas por cambios profundos en la sociedad."
          },
          {
            "enunciado": "¿Cuáles fueron tres de las grandes civilizaciones que florecieron durante la Edad Antigua?",
            "opciones": [
              "La egipcia, la griega y la romana",
              "Los vikingos, los piratas y los samuráis",
              "Los astronautas, los maquinistas y los pilotos",
              "Francia, Reino Unido y Alemania actuales"
            ],
            "correcta": 0,
            "explicacion": "¡Sensacional! Egipto, Grecia y Roma fueron las grandes civilizaciones de la Antigüedad."
          },
          {
            "enunciado": "¿Qué nombre pusieron los romanos a nuestra península ibérica en la Edad Antigua?",
            "opciones": [
              "Hispania",
              "Galia",
              "Britania",
              "Mesopotamia"
            ],
            "correcta": 0,
            "explicacion": "¡Correcto! Los romanos la bautizaron como Hispania, palabra de la que deriva España."
          },
          {
            "enunciado": "¿Qué acontecimiento crucial en el año 476 marcó el final de la Edad Antigua y el inicio de la Edad Media?",
            "opciones": [
              "La caída del Imperio romano",
              "El viaje a América de Cristóbal Colón",
              "La Revolución francesa",
              "La invención del teléfono"
            ],
            "correcta": 0,
            "explicacion": "¡Excelente! La caída del Imperio romano en el año 476 dio paso a la Edad Media."
          },
          {
            "enunciado": "En la península ibérica, ¿qué pueblo fundó su reino al inicio de la Edad Media tras la caída de Roma?",
            "opciones": [
              "El reino visigodo",
              "El imperio azteca",
              "Los antiguos griegos",
              "Los faraones egipcios"
            ],
            "correcta": 0,
            "explicacion": "¡Genial! Los visigodos crearon su reino en la península ibérica durante la Edad Media."
          },
          {
            "enunciado": "¿Qué personajes y fortalezas eran muy característicos de la sociedad en la Edad Media?",
            "opciones": [
              "Los castillos, los señores feudales y los caballeros",
              "Los rascacielos con ascensores y helipuertos",
              "Las fábricas de locomotoras y coches",
              "Los barcos de vapor y los submarinos"
            ],
            "correcta": 0,
            "explicacion": "¡Así es! La Edad Media es la época de los grandes castillos feudales, caballeros y reyes."
          },
          {
            "enunciado": "¿Qué suceso histórico en el año 1492 marcó el comienzo de la Edad Moderna?",
            "opciones": [
              "La llegada de Cristóbal Colón a América",
              "La construcción de las pirámides de Egipto",
              "La caída de la ciudad de Numancia",
              "El inicio de los primeros Juegos Olímpicos"
            ],
            "correcta": 0,
            "explicacion": "¡Perfecto! La expedición de Colón al continente americano en 1492 inició la Edad Moderna."
          },
          {
            "enunciado": "¿Qué monarcas gobernaron en España marcando el inicio de la Edad Moderna española?",
            "opciones": [
              "Los Reyes Católicos (Isabel y Fernando)",
              "Los emperadores romanos",
              "Los reyes godos de Toledo",
              "Los faraones de Egipto"
            ],
            "correcta": 0,
            "explicacion": "¡Muy bien! El reinado de los Reyes Católicos simboliza el paso de España a la Edad Moderna."
          },
          {
            "enunciado": "¿Con qué gran revolución comenzó la Edad Contemporánea en el año 1789?",
            "opciones": [
              "La Revolución francesa",
              "La Revolución industrial de los romanos",
              "La Guerra de Troya",
              "La caída del Imperio egipcio"
            ],
            "correcta": 0,
            "explicacion": "¡Bravo! La Revolución francesa de 1789 marcó el comienzo de la Edad Contemporánea."
          },
          {
            "enunciado": "Al inicio de la Edad Contemporánea, ¿a qué país se enfrentó España en la Guerra de la Independencia?",
            "opciones": [
              "A Francia (tropas de Napoleón)",
              "A Egipto",
              "A Grecia",
              "A Japón"
            ],
            "correcta": 0,
            "explicacion": "¡Exacto! El pueblo español luchó contra la invasión napoleónica francesa en la Guerra de la Independencia."
          },
          {
            "enunciado": "¿Hasta qué momento histórico se extiende la Edad Contemporánea?",
            "opciones": [
              "Hasta la actualidad (nuestros días)",
              "Terminó en el año 1900",
              "Terminó con la llegada del año 2000",
              "Duró solamente 50 años"
            ],
            "correcta": 0,
            "explicacion": "¡Eso es! La Edad Contemporánea llega hasta hoy; ¡nosotros vivimos actualmente en ella!"
          },
          {
            "enunciado": "¿Cuál es el orden cronológico correcto de las cuatro Edades de la Historia?",
            "opciones": [
              "Edad Antigua ➡️ Edad Media ➡️ Edad Moderna ➡️ Edad Contemporánea",
              "Edad Contemporánea ➡️ Edad Moderna ➡️ Edad Media ➡️ Edad Antigua",
              "Edad Media ➡️ Edad Antigua ➡️ Edad Contemporánea ➡️ Edad Moderna",
              "Edad Antigua ➡️ Edad Moderna ➡️ Edad Media ➡️ Edad Contemporánea"
            ],
            "correcta": 0,
            "explicacion": "¡Magistral! El orden es: Antigua (3500 a.C.), Media (476), Moderna (1492) y Contemporánea (desde 1789)."
          }
        ]
      }
    ]
  };

  /* ==========================================================================
     4. VISTA DE MENÚ JERÁRQUICO (Cursos -> Asignaturas -> Temas -> Capítulos)
     ========================================================================== */
  class MenuView {
    constructor(catalogo, onSelectCapitulo) {
      this.catalogo = catalogo;
      this.onSelectCapitulo = onSelectCapitulo;
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
              <div class="menu-breadcrumbs" id="menu-breadcrumbs"></div>
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

            <div class="menu-grid-container" id="menu-grid"></div>
          </main>
        </div>
      `;

      this.bindEvents();
      this.renderCurrentLevel();
    }

    bindEvents() {
      this.container.querySelector('#btn-menu-sound').addEventListener('click', () => {
        const isEnabled = audio.toggleSound();
        this.container.querySelector('#menu-sound-icon').textContent = isEnabled ? '🔊' : '🔇';
      });

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
      const starsEl = this.container.querySelector('#menu-stars-display');
      if (starsEl) starsEl.textContent = gameState.getEstrellasTotales();

      const backBtn = this.container.querySelector('#btn-menu-back');
      if (this.currentLevel === 'cursos') {
        backBtn.classList.add('hidden');
      } else {
        backBtn.classList.remove('hidden');
      }

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

  /* ==========================================================================
     5. MINIJUEGO DE PAREJAS (14 CARTAS)
     ========================================================================== */
  class MemoryGame {
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
            <div class="memory-grid" id="memory-grid"></div>
          </div>

          <div class="modal-overlay hidden" id="memory-victory-modal">
            <div class="modal-card victory-card">
              <div class="victory-icon">🎉</div>
              <h2 class="victory-title">¡Misión Cumplida!</h2>
              <p class="victory-subtitle">Has descubierto todas las etapas de la Historia</p>
              
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
                  <span>Continuar a la Ficha: Prehistoria 🦴 ➡️</span>
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

      this.cards = this.generateCards();
      this.renderCards();
      this.startTimer();
    }

    generateCards() {
      const parejas = this.casillaData.parejas || [];
      const deck = [];

      parejas.forEach(item => {
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
      if (card.isFlipped || card.isMatched) return;

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

      let stars = 3;
      if (this.moves > 16) {
        stars = 1;
      } else if (this.moves > 11) {
        stars = 2;
      }
      this.calculatedStars = stars;

      gameState.completarCasilla(this.tema.id, this.casillaData.id, stars);

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

  /* ==========================================================================
     6. MINIJUEGO DE PUZZLE CON IMAGEN Y REVELACIÓN DE 2.5s
     ========================================================================== */
  class PuzzleGame {
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

      this.imageSrc = casillaData.imagen || 'data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_01_edades/assets/puzzle.jpg';
      this.useCustomImage = false;

      this.svgIllustration = `
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

      this.preloadCustomImage();
    }

    preloadCustomImage() {
      const img = new Image();
      img.onload = () => {
        this.useCustomImage = true;
        if (this.container) {
          this.renderBoard();
          this.updatePeekModalContent();
        }
      };
      img.onerror = () => {
        this.useCustomImage = false;
      };
      img.src = this.imageSrc;
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
            <div class="puzzle-board" id="puzzle-board"></div>
          </div>

          <div class="puzzle-tip-bar">
            <span>💡 <strong>Cómo jugar:</strong> Toca una pieza y luego otra para intercambiarlas de sitio.</span>
          </div>

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

      const boardEl = this.container.querySelector('#puzzle-board');
      if (boardEl) {
        boardEl.classList.add('puzzle-completed-reveal');
        
        const banner = document.createElement('div');
        banner.className = 'puzzle-solved-banner';
        banner.innerHTML = '<span>✨ ¡PUZZLE RESUELTO! ✨</span>';
        boardEl.appendChild(banner);
      }

      this.renderBoard();

      audio.playBoing();
      setTimeout(() => audio.playGiggle(), 350);
      setTimeout(() => audio.playVictory(), 900);

      let stars = 3;
      if (this.moves > 14) {
        stars = 1;
      } else if (this.moves > 8) {
        stars = 2;
      }
      this.calculatedStars = stars;
      gameState.completarCasilla(this.tema.id, this.casillaData.id, stars);

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

  /* ==========================================================================
     7. VISTA DE MICRO-FICHAS DE TEORÍA (TARJETAS VISUALES)
     ========================================================================== */
  class TheoryView {
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
            <div class="theory-card" id="theory-current-card"></div>
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
      }

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

  /* ==========================================================================
     8. MOTOR DE QUIZ / PREGUNTAS
     ========================================================================== */
  class QuizView {
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
            <div class="quiz-question-card" id="quiz-card"></div>
          </div>

          <div class="modal-overlay hidden" id="quiz-results-modal">
            <div class="modal-card victory-card">
              <div class="victory-icon">🏆</div>
              <h2 class="victory-title">¡Desafío Superado!</h2>
              <p class="victory-subtitle" id="quiz-final-score-text">Has respondido correctamente</p>
              
              <div class="stars-awarded" id="quiz-stars"></div>

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

      const buttons = cardEl.querySelectorAll('.btn-option');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const selectedIdx = parseInt(btn.dataset.optionIndex, 10);
          this.handleSelectOption(selectedIdx, buttons);
        });
      });

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

      buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === q.correcta) {
          btn.classList.add('correct');
        } else if (idx === selectedIdx && !isCorrect) {
          btn.classList.add('wrong');
        }
      });

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

  /* ==========================================================================
     9. VISTA DEL CIRCUITO CIRCULAR (TABLERO CONTINUO)
     ========================================================================== */
  class MapView {
    constructor(tema, onSelectCasilla, onResetProgress, onReturnMenu) {
      this.tema = tema;
      this.onSelectCasilla = onSelectCasilla;
      this.onResetProgress = onResetProgress;
      this.onReturnMenu = onReturnMenu;
    }

    render(container) {
      this.container = container;
      const progreso = gameState.getTemaProgreso(this.tema.id);
      const totalEstrellas = Object.values(progreso.estrellas).reduce((a, b) => a + b, 0);
      const totalPosibleEstrellas = this.tema.casillas.length * 3;
      const isPerfect = totalEstrellas >= totalPosibleEstrellas;

      this.container.innerHTML = `
        <div class="map-screen">
          <header class="app-header">
            <div class="header-left">
              <button class="btn-hud btn-back" id="btn-return-menu" title="Volver al menú de temas">
                <span>⬅️ Menú</span>
              </button>
              <span class="theme-badge-icon">${this.tema.icono}</span>
              <div class="theme-info">
                <h1 class="header-title">${this.tema.titulo}</h1>
                <span class="header-subtitle">${this.tema.subtitulo}</span>
              </div>
            </div>

            <div class="header-right">
              <div class="star-counter-pill" title="Estrellas en el circuito">
                <span>${isPerfect ? '👑' : '⭐'}</span>
                <strong id="header-stars-count">${totalEstrellas} / ${totalPosibleEstrellas}</strong>
              </div>

              <button class="btn-icon" id="btn-sound-toggle" title="Activar/Silenciar sonido">
                <span id="sound-icon">${audio.isEnabled() ? '🔊' : '🔇'}</span>
              </button>

              <button class="btn-icon btn-secondary-icon" id="btn-reset-topic" title="Reiniciar circuito">
                <span>🔄</span>
              </button>
            </div>
          </header>

          <main class="map-viewport">
            <div class="map-scenery">
              <div class="cloud cloud-1">☁️</div>
              <div class="cloud cloud-2">☁️</div>
              <div class="mountain-decor">⛰️</div>
              <div class="castle-decor">🏰</div>
            </div>

            <div class="circuit-stage">
              <svg class="circuit-svg" preserveAspectRatio="none" viewBox="0 0 1000 460">
                <path class="circuit-track-base" 
                      d="M 220,100 C 400,20 650,20 830,100 C 960,160 960,320 830,380 C 650,460 400,460 220,380 C 90,320 90,160 220,100 Z" />
                <path class="circuit-track-active" id="circuit-active-path"
                      d="M 220,100 C 400,20 650,20 830,100 C 960,160 960,320 830,380 C 650,460 400,460 220,380 C 90,320 90,160 220,100 Z" />
              </svg>

              <div class="circuit-center-hub ${isPerfect ? 'all-stars-perfect' : ''}">
                <div class="hub-trophy">${isPerfect ? '👑' : '🏆'}</div>
                <h3 class="hub-title">${isPerfect ? '¡CORONA DE ORO!' : 'Circuito del Tiempo'}</h3>
                <div class="hub-stars-badge">${totalEstrellas} de ${totalPosibleEstrellas} ⭐</div>
                <p class="hub-hint">
                  ${isPerfect 
                    ? '¡Enhorabuena! Tienes 3 estrellas en todas las paradas.' 
                    : 'Recorre el circuito una y otra vez para conseguir 3⭐ en cada casilla.'}
                </p>
              </div>

              ${this.renderCircuitNodes()}
            </div>
          </main>

          <footer class="map-footer-tip">
            <span class="tip-icon">🔄</span>
            <span class="tip-text">¡Camino circular infinito! Puedes repetir cualquier casilla superada para mejorar tu récord de estrellas.</span>
          </footer>
        </div>
      `;

      this.bindEvents();
      this.updateCircuitPath();
    }

    renderCircuitNodes() {
      return this.tema.casillas.map((casilla) => {
        const isUnlocked = gameState.isCasillaDesbloqueada(this.tema.id, casilla.id);
        const stars = gameState.getEstrellasCasilla(this.tema.id, casilla.id);

        let statusClass = 'locked';
        if (isUnlocked) {
          if (stars === 3) {
            statusClass = 'three-stars';
          } else if (stars > 0) {
            statusClass = 'completed';
          } else {
            statusClass = 'current';
          }
        }

        return `
          <div class="circuit-node pos-${casilla.id} ${statusClass}" data-casilla-id="${casilla.id}">
            <button class="circuit-btn" ${!isUnlocked ? 'disabled' : ''}>
              <div class="circuit-btn-icon">
                ${isUnlocked ? casilla.icono : '🔒'}
              </div>
              ${stars > 0 ? `<div class="circuit-stars-tag">${'⭐'.repeat(stars)}</div>` : ''}
            </button>

            <div class="circuit-node-label">
              <span class="circuit-node-title">${casilla.titulo}</span>
            </div>
          </div>
        `;
      }).join('');
    }

    bindEvents() {
      const returnBtn = this.container.querySelector('#btn-return-menu');
      if (returnBtn && this.onReturnMenu) {
        returnBtn.addEventListener('click', () => {
          audio.playClick();
          this.onReturnMenu();
        });
      }

      this.container.querySelector('#btn-sound-toggle').addEventListener('click', () => {
        const isEnabled = audio.toggleSound();
        this.container.querySelector('#sound-icon').textContent = isEnabled ? '🔊' : '🔇';
      });

      this.container.querySelector('#btn-reset-topic').addEventListener('click', () => {
        if (confirm('¿Quieres reiniciar las estrellas del circuito para empezar de nuevo?')) {
          audio.playClick();
          gameState.reiniciarProgresoTema(this.tema.id);
          this.render(this.container);
        }
      });

      const nodeEls = this.container.querySelectorAll('.circuit-node');
      nodeEls.forEach(node => {
        node.addEventListener('click', () => {
          const casillaId = parseInt(node.dataset.casillaId, 10);
          const isUnlocked = gameState.isCasillaDesbloqueada(this.tema.id, casillaId);

          if (isUnlocked) {
            audio.playClick();
            const casillaData = this.tema.casillas.find(c => c.id === casillaId);
            this.onSelectCasilla(casillaData);
          } else {
            audio.playWrong();
            node.classList.add('shake');
            setTimeout(() => node.classList.remove('shake'), 400);
          }
        });
      });
    }

    updateCircuitPath() {
      const progreso = gameState.getTemaProgreso(this.tema.id);
      const pathActive = this.container.querySelector('#circuit-active-path');
      if (!pathActive) return;

      const totalLength = 2500;
      const totalCasillas = this.tema.casillas.length;
      let ratio = progreso.casillaDesbloqueada / (totalCasillas + 1);
      if (progreso.casillaDesbloqueada > totalCasillas) {
        ratio = 1.0;
      }

      pathActive.style.strokeDasharray = `${totalLength}`;
      pathActive.style.strokeDashoffset = `${totalLength * (1 - ratio)}`;
    }
  }

  /* ==========================================================================
     10. ORQUESTADOR DE LA APLICACIÓN
     ========================================================================== */
  class App {
    constructor() {
      this.root = document.getElementById('app-root');
      this.catalogo = defaultCatalogo;
      this.currentCapitulo = defaultCapituloData;
      this.currentViewInstance = null;
    }

    init() {
      const unlockAudio = () => {
        audio.init();
        window.removeEventListener('pointerdown', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
      };
      window.addEventListener('pointerdown', unlockAudio);
      window.addEventListener('keydown', unlockAudio);

      this.showMenu();
    }

    showMenu() {
      this.cleanupCurrentView();
      const menuView = new MenuView(
        this.catalogo,
        (capituloObj) => {
          this.currentCapitulo = defaultCapituloData;
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
        () => this.showMenu()
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

})();
