/* GENERADO AUTOMATICAMENTE por scripts/empaquetar.ps1 con esbuild 0.28.2. NO EDITAR A MANO: edita los modulos de src y regenera con: powershell -ExecutionPolicy Bypass -File scripts/empaquetar.ps1 */
(() => {
  // src/gameOrder.js
  var TIPOS_JUEGO = Object.freeze(["minijuego"]);
  function esCasillaDeJuego(casilla) {
    return Boolean(casilla) && TIPOS_JUEGO.includes(casilla.tipo);
  }
  function obtenerJuegosDelTema(tema) {
    if (!tema || !Array.isArray(tema.juegos)) return null;
    const juegos = tema.juegos.filter((subtipo) => typeof subtipo === "string" && subtipo.trim()).map((subtipo) => subtipo.trim());
    return juegos.length ? Array.from(new Set(juegos)) : null;
  }
  function numerarTitulo(titulo, numeroParada) {
    const limpio = String(titulo || "Juego").replace(/^\s*\d+\s*[.)-]\s*/, "");
    return `${numeroParada}. ${limpio}`;
  }
  function montarJuegosDelTema(capitulo, tema = null) {
    if (!capitulo || !Array.isArray(capitulo.casillas)) return capitulo;
    const pool = capitulo.juegos;
    if (!pool || typeof pool !== "object" || Array.isArray(pool)) return capitulo;
    const slots = capitulo.casillas.filter(esCasillaDeJuego);
    if (slots.length === 0) return capitulo;
    const disponibles = Object.keys(pool).filter((subtipo) => {
      const juego = pool[subtipo];
      return juego && typeof juego === "object" && !Array.isArray(juego);
    });
    if (disponibles.length === 0) return capitulo;
    const configurados = obtenerJuegosDelTema(tema);
    let seleccion = configurados ? configurados.filter((subtipo) => disponibles.includes(subtipo)) : disponibles.slice();
    if (configurados) {
      const ausentes = configurados.filter((subtipo) => !disponibles.includes(subtipo));
      if (ausentes.length) {
        console.warn(`[Juegos] El tema pide juegos que el cap\xEDtulo "${capitulo.id}" no define:`, ausentes.join(", "));
      }
    }
    if (seleccion.length < slots.length) {
      console.warn(`[Juegos] Faltan juegos configurados en "${capitulo.id}"; se completan con los disponibles.`);
      const resto = disponibles.filter((subtipo) => !seleccion.includes(subtipo));
      seleccion = seleccion.concat(resto).slice(0, slots.length);
    }
    if (seleccion.length > slots.length) {
      console.warn(`[Juegos] El circuito solo tiene ${slots.length} paradas de juego; se usar\xE1n las primeras.`);
      seleccion = seleccion.slice(0, slots.length);
    }
    let indiceJuego = 0;
    const casillas = capitulo.casillas.map((casilla) => {
      if (!esCasillaDeJuego(casilla)) return casilla;
      const subtipo = seleccion[indiceJuego];
      indiceJuego++;
      if (!subtipo) return casilla;
      const juego = pool[subtipo];
      return {
        ...casilla,
        ...juego,
        id: casilla.id,
        tipo: "minijuego",
        subtipo,
        titulo: numerarTitulo(juego.titulo, casilla.id)
      };
    });
    return { ...capitulo, casillas };
  }
  function mezclar(array, random) {
    const resultado = array.slice();
    for (let i = resultado.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [resultado[i], resultado[j]] = [resultado[j], resultado[i]];
    }
    return resultado;
  }
  function renumerarTitulo(titulo, numeroParada) {
    if (typeof titulo !== "string") return titulo;
    const prefijo = /^\s*\d+\s*[.)-]\s*/;
    if (prefijo.test(titulo)) {
      return titulo.replace(prefijo, `${numeroParada}. `);
    }
    return titulo;
  }
  function barajarJuegosCircuito(casillas, random = Math.random) {
    if (!Array.isArray(casillas)) return casillas;
    const indicesDeJuego = [];
    const juegos = [];
    casillas.forEach((casilla, index) => {
      if (esCasillaDeJuego(casilla)) {
        indicesDeJuego.push(index);
        juegos.push(casilla);
      }
    });
    if (juegos.length < 2) return casillas;
    const juegosMezclados = mezclar(juegos, random);
    const resultado = casillas.slice();
    indicesDeJuego.forEach((slotIndex, i) => {
      const parada = casillas[slotIndex];
      const juego = juegosMezclados[i];
      resultado[slotIndex] = {
        ...juego,
        id: parada.id,
        titulo: renumerarTitulo(juego.titulo, parada.id)
      };
    });
    return resultado;
  }
  function prepararCapituloParaCircuito(capitulo, random = Math.random) {
    if (!capitulo || !Array.isArray(capitulo.casillas)) return capitulo;
    const casillas = barajarJuegosCircuito(capitulo.casillas, random);
    if (casillas === capitulo.casillas) return capitulo;
    return { ...capitulo, casillas };
  }

  // src/dataLoader.js
  var DataLoader = class _DataLoader {
    static async loadCatalogo() {
      try {
        const res = await fetch("data/catalogo.json");
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
      }
      if (typeof window !== "undefined" && window.CATALOGO_DATA) {
        return window.CATALOGO_DATA;
      }
      console.error(
        "[Datos] No se ha encontrado el cat\xE1logo. Ejecuta scripts/actualizar_datos.ps1 o abre el juego desde un servidor web."
      );
      return null;
    }
    static async loadCapitulo(capituloObj, temaObj = null) {
      const capitulo = await _DataLoader.cargarCapituloSinBarajar(capituloObj);
      if (!capitulo) return null;
      const conJuegos = montarJuegosDelTema(capitulo, temaObj);
      return prepararCapituloParaCircuito(conJuegos);
    }
    static async cargarCapituloSinBarajar(capituloObj) {
      if (!capituloObj) return null;
      if (capituloObj.archivo) {
        try {
          const res = await fetch(capituloObj.archivo);
          if (res.ok) {
            return await res.json();
          }
        } catch (e) {
        }
      }
      if (typeof window !== "undefined" && window.CAPITULOS_DATA) {
        if (capituloObj.id && window.CAPITULOS_DATA[capituloObj.id]) {
          return window.CAPITULOS_DATA[capituloObj.id];
        }
        if (capituloObj.archivo && window.CAPITULOS_DATA[capituloObj.archivo]) {
          return window.CAPITULOS_DATA[capituloObj.archivo];
        }
      }
      console.error(
        `[Datos] No se ha encontrado el contenido de \xAB${capituloObj.id || capituloObj.archivo}\xBB. Sincroniza los datos con scripts/actualizar_datos.ps1.`
      );
      return null;
    }
  };

  // src/state.js
  var StateManager = class {
    constructor() {
      this.storageKey = "aventura_educativa_state_v3";
      this.state = this.loadState();
    }
    loadState() {
      try {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (e) {
        console.warn("No se pudo cargar el progreso, iniciando nuevo:", e);
      }
      return {
        temas: {},
        // { [temaId]: { casillaDesbloqueada: 1, estrellas: { 1: 3, 2: 3 } } }
        temaActualId: "cap_01_edades",
        estrellasTotales: 0
      };
    }
    saveState() {
      try {
        this.recalcularEstrellasTotales();
        localStorage.setItem(this.storageKey, JSON.stringify(this.state));
      } catch (e) {
        console.warn("No se pudo guardar el progreso:", e);
      }
    }
    recalcularEstrellasTotales() {
      let total = 0;
      Object.values(this.state.temas).forEach((t) => {
        if (t.estrellas) {
          Object.values(t.estrellas).forEach((cant) => {
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
          // Casilla 1 empieza desbloqueada
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
      return this.state.estrellasTotales || 0;
    }
  };
  var gameState = new StateManager();

  // src/audio.js
  var AudioManager = class {
    constructor() {
      this.ctx = null;
      this.enabled = localStorage.getItem("sound_enabled") !== "false";
    }
    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    }
    toggleSound() {
      this.enabled = !this.enabled;
      localStorage.setItem("sound_enabled", this.enabled);
      if (this.enabled) {
        this.init();
        this.playClick();
      }
      return this.enabled;
    }
    isEnabled() {
      return this.enabled;
    }
    // Sonido de clic sutil
    playClick() {
      if (!this.enabled) return;
      this.init();
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
      } catch (e) {
        console.warn("Audio error", e);
      }
    }
    // Voltear carta (chasquido / aire)
    playFlip() {
      if (!this.enabled) return;
      this.init();
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(320, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
      } catch (e) {
        console.warn("Audio error", e);
      }
    }
    // Pareja encontrada (campanitas alegres)
    playMatch() {
      if (!this.enabled) return;
      this.init();
      try {
        const now = this.ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + i * 0.08);
          gain.gain.setValueAtTime(0.2, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(1e-3, now + i * 0.08 + 0.25);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.25);
        });
      } catch (e) {
        console.warn("Audio error", e);
      }
    }
    // Pareja incorrecta (sonido suave)
    playMismatch() {
      if (!this.enabled) return;
      this.init();
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(190, now + 0.18);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.18);
      } catch (e) {
        console.warn("Audio error", e);
      }
    }
    // Respuesta correcta en Quiz (acorde brillante)
    playCorrect() {
      if (!this.enabled) return;
      this.init();
      try {
        const now = this.ctx.currentTime;
        const notes = [587.33, 739.99, 880, 1174.66];
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          gain.gain.setValueAtTime(0.25, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(1e-3, now + idx * 0.05 + 0.35);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.35);
        });
      } catch (e) {
        console.warn("Audio error", e);
      }
    }
    // Respuesta incorrecta en Quiz
    playWrong() {
      if (!this.enabled) return;
      this.init();
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.linearRampToValueAtTime(120, now + 0.25);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(1e-3, now + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } catch (e) {
        console.warn("Audio error", e);
      }
    }
    // Fanfarria de victoria (nivel completado)
    playVictory() {
      if (!this.enabled) return;
      this.init();
      try {
        const now = this.ctx.currentTime;
        const notes = [
          { f: 523.25, t: 0, d: 0.15 },
          { f: 659.25, t: 0.15, d: 0.15 },
          { f: 783.99, t: 0.3, d: 0.15 },
          { f: 1046.5, t: 0.45, d: 0.5 }
        ];
        notes.forEach(({ f, t, d }) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(f, now + t);
          gain.gain.setValueAtTime(0.3, now + t);
          gain.gain.exponentialRampToValueAtTime(1e-3, now + t + d);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + t);
          osc.stop(now + t + d);
        });
      } catch (e) {
        console.warn("Audio error", e);
      }
    }
    // Chasquido de pieza de puzzle encajada
    playSnap() {
      if (!this.enabled) return;
      this.init();
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } catch (e) {
      }
    }
    // Sonido cómico "Boing"
    playBoing() {
      if (!this.enabled) return;
      this.init();
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(550, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.3);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } catch (e) {
      }
    }
    // Risita infantil sintetizada
    playGiggle() {
      if (!this.enabled) return;
      this.init();
      try {
        const now = this.ctx.currentTime;
        [600, 750, 600, 800, 650].forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);
          gain.gain.setValueAtTime(0.18, now + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(1e-3, now + idx * 0.07 + 0.06);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.07);
          osc.stop(now + idx * 0.07 + 0.06);
        });
      } catch (e) {
      }
    }
  };
  var audio = new AudioManager();

  // src/speech.js
  var SETTINGS_KEY = "playstudy_voice_settings_v1";
  var DEFAULT_RATE = 0.94;
  var DEFAULT_PREFERENCE = { version: 1, mode: "auto", voice: null, rate: DEFAULT_RATE };
  function normalizeRate(value) {
    const rate = typeof value === "number" ? value : typeof value === "string" && value.trim() ? Number(value) : NaN;
    return Number.isFinite(rate) ? Math.min(1.3, Math.max(0.7, rate)) : DEFAULT_RATE;
  }
  function descriptorMatches(voice, descriptor) {
    if (!voice || !descriptor) return false;
    if (descriptor.voiceURI && voice.voiceURI === descriptor.voiceURI && (!descriptor.lang || voice.lang === descriptor.lang)) return true;
    return Boolean(descriptor.name && voice.name === descriptor.name && (!descriptor.lang || voice.lang === descriptor.lang));
  }
  var SpeechManager = class {
    constructor() {
      this.preference = this.loadPreference();
      this.voices = [];
      this.listeners = /* @__PURE__ */ new Set();
      this.initialized = false;
      this.speech = null;
      this.voicesChangedHandler = null;
    }
    loadPreference() {
      try {
        const value = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "null");
        if (value?.version === 1 && value.mode === "auto") {
          return { ...DEFAULT_PREFERENCE, rate: normalizeRate(value.rate) };
        }
        if (value?.version === 1 && value.mode === "selected" && value.voice && typeof value.voice.name === "string" && typeof value.voice.lang === "string") {
          return {
            version: 1,
            mode: "selected",
            rate: normalizeRate(value.rate),
            voice: {
              voiceURI: typeof value.voice.voiceURI === "string" ? value.voice.voiceURI : "",
              name: value.voice.name,
              lang: value.voice.lang
            }
          };
        }
      } catch (error) {
        console.warn("No se pudo cargar la preferencia de voz:", error);
      }
      return { ...DEFAULT_PREFERENCE };
    }
    init() {
      if (this.initialized) return this.getVoices();
      this.initialized = true;
      if (!("speechSynthesis" in window)) return [];
      this.speech = window.speechSynthesis;
      this.voicesChangedHandler = () => this.refreshVoices();
      if (typeof this.speech.addEventListener === "function") {
        this.speech.addEventListener("voiceschanged", this.voicesChangedHandler);
      } else {
        this.speech.onvoiceschanged = this.voicesChangedHandler;
      }
      return this.refreshVoices();
    }
    refreshVoices() {
      try {
        this.voices = this.speech ? this.speech.getVoices() : [];
      } catch (error) {
        this.voices = [];
      }
      this.listeners.forEach((listener) => listener(this.voices.slice()));
      return this.voices.slice();
    }
    getVoices() {
      if (!this.initialized) this.init();
      if (this.speech) {
        try {
          this.voices = this.speech.getVoices();
        } catch (error) {
          this.voices = [];
        }
      }
      return this.voices.slice();
    }
    subscribe(listener) {
      this.init();
      this.listeners.add(listener);
      listener(this.getVoices());
      return () => this.listeners.delete(listener);
    }
    waitForVoices(timeoutMs = 1e3) {
      this.init();
      const voices = this.getVoices();
      if (voices.length || !this.speech) return Promise.resolve(voices);
      return new Promise((resolve) => {
        let settled = false;
        const finish = () => {
          if (settled) return;
          settled = true;
          clearTimeout(timeout);
          this.listeners.delete(onChange);
          resolve(this.getVoices());
        };
        const onChange = (nextVoices) => {
          if (nextVoices.length) finish();
        };
        const timeout = setTimeout(finish, timeoutMs);
        this.listeners.add(onChange);
      });
    }
    getPreference() {
      return this.preference.mode === "selected" ? { version: 1, mode: "selected", rate: this.preference.rate, voice: { ...this.preference.voice } } : { ...DEFAULT_PREFERENCE, rate: this.preference.rate };
    }
    savePreference(preference) {
      const next = preference?.mode === "selected" && preference.voice ? {
        version: 1,
        mode: "selected",
        rate: normalizeRate(preference.rate),
        voice: {
          voiceURI: String(preference.voice.voiceURI || ""),
          name: String(preference.voice.name || ""),
          lang: String(preference.voice.lang || "")
        }
      } : { ...DEFAULT_PREFERENCE, rate: normalizeRate(preference?.rate) };
      if (next.mode === "selected" && (!next.voice.name || !next.voice.lang)) return false;
      this.preference = next;
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
        return true;
      } catch (error) {
        console.warn("No se pudo guardar la preferencia de voz:", error);
        return false;
      }
    }
    findPreferredVoice(voices, descriptor) {
      if (!descriptor) return null;
      return voices.find((voice) => descriptor.voiceURI && voice.voiceURI === descriptor.voiceURI && (!descriptor.lang || voice.lang === descriptor.lang)) || voices.find((voice) => descriptorMatches(voice, descriptor)) || null;
    }
    chooseAutomaticVoice(voices = this.getVoices()) {
      const spanish = voices.filter((voice) => /^es(?:-|$)/i.test(voice.lang || ""));
      const naturalTerms = /natural|neural|online|premium/i;
      const offline = typeof navigator !== "undefined" && navigator.onLine === false;
      return spanish.sort((a, b) => {
        const score = (voice) => (voice.lang?.toLowerCase() === "es-es" ? 1e3 : 700) + (naturalTerms.test(voice.name || "") ? 150 : /google|microsoft/i.test(voice.name || "") ? 60 : 0) + (offline && voice.localService ? 200 : 0);
        return score(b) - score(a) || (a.name || "").localeCompare(b.name || "");
      })[0] || null;
    }
    resolveVoice(preference = this.preference, voices = this.getVoices(), { fallback = true, preferLocal = false } = {}) {
      if (preferLocal) {
        const localSpanish = voices.filter((voice) => /^es(?:-|$)/i.test(voice.lang || "") && voice.localService);
        return this.chooseAutomaticVoice(localSpanish);
      }
      if (preference?.mode !== "selected") return this.chooseAutomaticVoice(voices);
      const preferred = this.findPreferredVoice(voices, preference.voice);
      const offline = typeof navigator !== "undefined" && navigator.onLine === false;
      if (preferred && (!offline || preferred.localService !== false)) return preferred;
      if (!fallback) return null;
      if (offline) {
        const localSpanish = voices.filter((voice) => /^es(?:-|$)/i.test(voice.lang || "") && voice.localService);
        return localSpanish.length ? this.chooseAutomaticVoice(localSpanish) : null;
      }
      return this.chooseAutomaticVoice(voices);
    }
    createUtterance(text, preference = this.preference, { fallback = true, preferLocal = false } = {}) {
      if (typeof SpeechSynthesisUtterance === "undefined") return null;
      const voice = this.resolveVoice(preference, this.getVoices(), { fallback, preferLocal });
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = voice?.lang || preference?.voice?.lang || "es-ES";
      utterance.rate = normalizeRate(preference?.rate ?? this.preference.rate);
      utterance.pitch = 1.03;
      if (voice) utterance.voice = voice;
      return { utterance, voice };
    }
  };
  var speechManager = new SpeechManager();

  // src/aiTutor.js
  var CONFIG_KEY = "playstudy_ai_tutor_v1";
  var AI_PROVIDERS = {
    gemini: {
      id: "gemini",
      label: "Google Gemini",
      defaultModel: "gemini-3.8-flash",
      modelExample: "gemini-3.8-flash",
      keyPlaceholder: "AIza...",
      keysUrl: "https://aistudio.google.com/app/apikey"
    },
    anthropic: {
      id: "anthropic",
      label: "Anthropic (Claude)",
      defaultModel: "claude-haiku-4-5",
      modelExample: "claude-haiku-4-5",
      keyPlaceholder: "sk-ant-...",
      keysUrl: "https://console.anthropic.com/settings/keys"
    },
    openrouter: {
      id: "openrouter",
      label: "OpenRouter (muchos modelos)",
      defaultModel: "google/gemini-2.5-flash",
      modelExample: "google/gemini-2.5-flash",
      keyPlaceholder: "sk-or-...",
      keysUrl: "https://openrouter.ai/keys"
    }
  };
  var AI_MAX_QUESTION_LENGTH = 400;
  var AI_MAX_CONTEXT_LENGTH = 9e3;
  var AI_TIMEOUT_MS = 12e4;
  var SYSTEM_PROMPT = [
    'Eres "Profe", un tutor amable que ayuda a un ni\xF1o de 10 a\xF1os a entender la teor\xEDa de un videojuego educativo y a satisfacer su curiosidad.',
    "Reglas:",
    "- La TEOR\xCDA es tu punto de partida y la base de la respuesta.",
    "- Si la pregunta est\xE1 relacionada con la teor\xEDa, resp\xF3ndela aunque el dato no aparezca literalmente. Puedes ampliar con conocimientos generales adecuados para un ni\xF1o de 10 a\xF1os.",
    "- Si la pregunta no tiene relaci\xF3n con la teor\xEDa o con el tema del cap\xEDtulo, redirige amablemente al contenido de la diapositiva.",
    "- No inventes fechas, nombres ni datos. Si no est\xE1s seguro, dilo con naturalidad.",
    "- Usa espa\xF1ol de Espa\xF1a, frases cortas y palabras sencillas.",
    "- Responde en 2 o 4 frases y como m\xE1ximo 100 palabras.",
    "- No pidas datos personales, no te vayas a temas que no tengan relaci\xF3n con la teor\xEDa y no incluyas enlaces.",
    "- Fomenta la curiosidad: si viene al caso, puedes terminar con una pregunta breve que invite a seguir aprendiendo."
  ].join("\n");
  function friendlyHttpError(status) {
    if (status === 400) return "El proveedor ha rechazado la solicitud. Revisa el modelo elegido en Configuraci\xF3n.";
    if (status === 401 || status === 403) return "La clave de API no es v\xE1lida o no tiene permiso. Rev\xEDsala en Configuraci\xF3n.";
    if (status === 404) return "El modelo elegido no existe o no est\xE1 disponible. Cambia el modelo en Configuraci\xF3n.";
    if (status === 429) return "Se ha alcanzado el l\xEDmite de uso o no hay saldo en la cuenta del proveedor. Int\xE9ntalo m\xE1s tarde.";
    if (status >= 500) return "El servicio del proveedor no est\xE1 disponible ahora mismo. Int\xE9ntalo dentro de un rato.";
    return "No se ha podido obtener la respuesta del proveedor.";
  }
  async function httpErrorFromResponse(response) {
    let detail = "";
    try {
      detail = (await response.text()).slice(0, 2e3).toLowerCase();
    } catch (error) {
      detail = "";
    }
    console.warn("[Tutor IA] Error HTTP del proveedor:", response.status, detail.slice(0, 300));
    const keyProblem = /api[ _-]?key|api_key_invalid|invalid.*key|unauthorized|permission/.test(detail);
    if (keyProblem || response.status === 401 || response.status === 403) {
      return "La clave de API no es v\xE1lida o no tiene permiso. Rev\xEDsala en Configuraci\xF3n.";
    }
    return friendlyHttpError(response.status);
  }
  function normalizeConfig(raw) {
    const config = raw && typeof raw === "object" ? raw : {};
    const provider = AI_PROVIDERS[config.provider] ? config.provider : "gemini";
    return {
      version: 1,
      provider,
      keys: config.keys && typeof config.keys === "object" ? config.keys : {},
      models: config.models && typeof config.models === "object" ? config.models : {}
    };
  }
  var AiTutor = class {
    load() {
      try {
        return normalizeConfig(JSON.parse(localStorage.getItem(CONFIG_KEY) || "null"));
      } catch (error) {
        return normalizeConfig(null);
      }
    }
    save(config) {
      try {
        localStorage.setItem(CONFIG_KEY, JSON.stringify(normalizeConfig(config)));
        return true;
      } catch (error) {
        return false;
      }
    }
    getProvider(providerId) {
      return AI_PROVIDERS[providerId] || AI_PROVIDERS.gemini;
    }
    getSettings(providerOverride) {
      const config = this.load();
      const providerId = AI_PROVIDERS[providerOverride] ? providerOverride : config.provider;
      const provider = this.getProvider(providerId);
      const apiKey = String(config.keys[providerId] || "").trim();
      return {
        provider: providerId,
        providerLabel: provider.label,
        model: this.normalizeModelId(providerId, config.models[providerId] || provider.defaultModel),
        hasKey: Boolean(apiKey),
        maskedKey: this.maskKey(apiKey),
        keysUrl: provider.keysUrl
      };
    }
    saveSettings({ provider, model, apiKey }) {
      const nextProvider = AI_PROVIDERS[provider] ? provider : "gemini";
      const config = this.load();
      config.provider = nextProvider;
      const cleanModel = this.normalizeModelId(nextProvider, model);
      if (cleanModel) config.models[nextProvider] = cleanModel;
      else delete config.models[nextProvider];
      const cleanKey = String(apiKey || "").trim();
      if (cleanKey) config.keys[nextProvider] = cleanKey;
      return this.save(config);
    }
    /**
     * Convierte lo que escribe el usuario ("3.8 Flash", "models/gemini-3.8-flash")
     * en el ID real de la API ("gemini-3.8-flash").
     */
    normalizeModelId(providerId, model) {
      let value = String(model || "").trim().toLowerCase().replace(/^models\//, "").replace(/\s+/g, "-");
      if (providerId === "gemini" && value && !value.startsWith("gemini-") && !value.includes("/")) {
        value = `gemini-${value}`;
      }
      return value;
    }
    clearKey(provider) {
      const config = this.load();
      const target = AI_PROVIDERS[provider] ? provider : config.provider;
      delete config.keys[target];
      return this.save(config);
    }
    maskKey(key) {
      if (!key) return "";
      const tail = key.slice(-4);
      return `\u2022\u2022\u2022\u2022\u2022\u2022${tail}`;
    }
    hasKey() {
      return this.getSettings().hasKey;
    }
    buildPrompt({ question, theoryContext, currentSlide }) {
      const context = String(theoryContext || "").slice(0, AI_MAX_CONTEXT_LENGTH);
      const current = currentSlide ? `Diapositiva que est\xE1 viendo ahora: ${currentSlide}.

` : "";
      return {
        system: SYSTEM_PROMPT,
        user: `${current}TEOR\xCDA DEL CAP\xCDTULO:
${context}

PREGUNTA DEL NI\xD1O:
${question}`
      };
    }
    async ask({ question, theoryContext, currentSlide, signal }) {
      const cleanQuestion = String(question || "").trim().slice(0, AI_MAX_QUESTION_LENGTH);
      if (!cleanQuestion) throw new Error("Escribe una pregunta.");
      const config = this.load();
      const providerId = config.provider;
      const apiKey = String(config.keys[providerId] || "").trim();
      if (!apiKey) throw new Error("No hay ninguna clave de API guardada. Pide a un adulto que la configure en \u2699\uFE0F Configuraci\xF3n.");
      const provider = this.getProvider(providerId);
      const model = this.normalizeModelId(providerId, config.models[providerId] || provider.defaultModel);
      const prompt = this.buildPrompt({ question: cleanQuestion, theoryContext, currentSlide });
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);
      const onAbort = () => controller.abort();
      if (signal) signal.addEventListener("abort", onAbort);
      console.info("[Tutor IA] Petici\xF3n a", providerId, model);
      try {
        const answer = await this.request(providerId, { apiKey, model, ...prompt, signal: controller.signal });
        if (!answer.trim()) throw new Error("El proveedor ha devuelto una respuesta vac\xEDa. Prueba a preguntar de otra forma.");
        return answer.trim();
      } catch (error) {
        if (error.name === "AbortError") {
          if (signal?.aborted) throw new Error("Solicitud cancelada.");
          console.warn("[Tutor IA] Tiempo de espera agotado:", providerId, model, AI_TIMEOUT_MS);
          throw new Error(providerId === "gemini" ? "La respuesta ha tardado m\xE1s de 2 minutos. Gemini 3.8 Flash est\xE1 teniendo mucha latencia estos d\xEDas: prueba el modelo gemini-3.6-flash o int\xE9ntalo m\xE1s tarde." : "La respuesta ha tardado m\xE1s de 2 minutos. Int\xE9ntalo de nuevo o cambia de modelo en Configuraci\xF3n.");
        }
        if (error instanceof TypeError) throw new Error("No se ha podido conectar con el proveedor. Comprueba tu conexi\xF3n a Internet.");
        throw error;
      } finally {
        clearTimeout(timer);
        if (signal) signal.removeEventListener("abort", onAbort);
      }
    }
    async request(providerId, { apiKey, model, system, user, signal }) {
      if (providerId === "gemini") return this.requestGemini({ apiKey, model, system, user, signal });
      if (providerId === "anthropic") return this.requestAnthropic({ apiKey, model, system, user, signal });
      return this.requestOpenRouter({ apiKey, model, system, user, signal });
    }
    async requestOpenRouter({ apiKey, model, system, user, signal }) {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        signal,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": location.origin,
          "X-Title": "PlayStudy"
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user }
          ],
          temperature: 0.4,
          max_tokens: 400
        })
      });
      if (!response.ok) throw new Error(await httpErrorFromResponse(response));
      const data = await response.json();
      return data?.choices?.[0]?.message?.content || "";
    }
    async requestGemini({ apiKey, model, system, user, signal }) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
      const generationConfig = { temperature: 0.4, maxOutputTokens: 2048 };
      if (/^gemini-2\.5-.*flash/i.test(model)) {
        generationConfig.thinkingConfig = { thinkingBudget: 0 };
      } else if (/^gemini-3(?:\.\d+)?/i.test(model)) {
        generationConfig.thinkingConfig = { thinkingLevel: "low" };
      }
      const response = await fetch(url, {
        method: "POST",
        signal,
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [{ role: "user", parts: [{ text: user }] }],
          generationConfig
        })
      });
      if (!response.ok) throw new Error(await httpErrorFromResponse(response));
      const data = await response.json();
      if (data?.promptFeedback?.blockReason) {
        throw new Error("El proveedor ha bloqueado la respuesta. Prueba a preguntar de otra forma.");
      }
      const candidate = data?.candidates?.[0];
      const parts = candidate?.content?.parts || [];
      const answer = parts.map((part) => part.thought ? "" : part.text || "").join("");
      if (!answer.trim() && candidate?.finishReason) {
        console.warn("[Tutor IA] Gemini no devolvi\xF3 texto. finishReason:", candidate.finishReason, data);
      }
      return answer;
    }
    async requestAnthropic({ apiKey, model, system, user, signal }) {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        signal,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model,
          max_tokens: 400,
          temperature: 0.4,
          system,
          messages: [{ role: "user", content: user }]
        })
      });
      if (!response.ok) throw new Error(await httpErrorFromResponse(response));
      const data = await response.json();
      const blocks = Array.isArray(data?.content) ? data.content : [];
      return blocks.filter((block) => block.type === "text").map((block) => block.text || "").join("");
    }
    async testConnection() {
      return this.ask({
        question: "\xBFQu\xE9 dice la teor\xEDa de prueba?",
        theoryContext: "La teor\xEDa de prueba dice: OK.",
        currentSlide: "Prueba de conexi\xF3n"
      });
    }
  };
  var aiTutor = new AiTutor();

  // src/views/settingsView.js
  var TEST_TEXT = "\xA1Hola! Soy la voz que te acompa\xF1ar\xE1 en PlayStudy. \xBFPreparado para aprender? Vamos a descubrir cosas nuevas, paso a paso.";
  function voiceKeyMatches(voice, descriptor) {
    if (!voice || !descriptor) return false;
    if (descriptor.voiceURI && voice.voiceURI === descriptor.voiceURI && voice.lang === descriptor.lang) return true;
    return voice.name === descriptor.name && voice.lang === descriptor.lang;
  }
  var SettingsView = class {
    constructor() {
      this.preference = speechManager.getPreference();
      this.mode = this.preference.mode;
      this.selectedVoice = this.preference.voice;
      this.rate = this.preference.rate ?? 0.94;
      this.showAllVoices = false;
      this.visibleVoices = [];
      this.testUtterance = null;
      this.unsubscribeVoices = null;
      this.returnFocus = null;
      this.isOpen = false;
      this.aiSettings = aiTutor.getSettings();
      this.aiKeyVisible = false;
    }
    render(returnFocus = null) {
      if (this.isOpen) return;
      this.isOpen = true;
      this.returnFocus = returnFocus || document.activeElement;
      const backdrop = document.createElement("div");
      backdrop.className = "voice-settings-backdrop";
      backdrop.innerHTML = `
      <section class="voice-settings-dialog" role="dialog" aria-modal="true" aria-labelledby="voice-settings-title" tabindex="-1">
        <header class="voice-settings-header">
          <div><span class="voice-settings-icon" aria-hidden="true">\u2699\uFE0F</span><h2 id="voice-settings-title">Configuraci\xF3n</h2></div>
          <button class="btn-icon voice-settings-close" type="button" aria-label="Cerrar configuraci\xF3n">\u2715</button>
        </header>
        <p class="voice-settings-intro">Elige la voz de las explicaciones y, si quieres, activa el tutor con IA para preguntar dudas.</p>
        <h3 class="settings-section-title">\u{1F5E3}\uFE0F Voz de las explicaciones</h3>
        <label class="voice-settings-label" for="voice-settings-select">Voz</label>
        <select id="voice-settings-select" class="voice-settings-select"></select>
        <label class="voice-settings-show-all"><input id="voice-settings-all" type="checkbox"> Mostrar voces de otros idiomas</label>
        <p class="voice-settings-meta" id="voice-settings-meta"></p>
        <div class="voice-settings-rate-control">
          <label class="voice-settings-label" for="voice-settings-rate">Velocidad de la voz <output id="voice-settings-rate-value"></output></label>
          <div class="voice-settings-rate-row"><span>M\xE1s despacio</span><input id="voice-settings-rate" type="range" min="0.7" max="1.3" step="0.01" value="${this.rate}"><span>M\xE1s r\xE1pido</span></div>
        </div>
        <div class="voice-settings-preview">
          <button class="btn-primary" id="voice-settings-preview" type="button">\u25B6 Escuchar prueba</button>
          <button class="btn-secondary" id="voice-settings-stop" type="button" disabled>\u25A0 Detener</button>
        </div>
        <p class="voice-settings-status" id="voice-settings-status" aria-live="polite"></p>

        <div class="settings-divider"></div>

        <section class="ai-settings" aria-labelledby="ai-settings-title">
          <div class="ai-settings-heading">
            <span class="ai-settings-icon" aria-hidden="true">\u{1F916}</span>
            <div>
              <h3 class="settings-section-title" id="ai-settings-title">Tutor con IA (opcional)</h3>
              <p class="ai-settings-subtitle">Permite al ni\xF1o preguntar dudas sobre la teor\xEDa. Necesita una clave de API de un adulto.</p>
            </div>
          </div>
          <label class="voice-settings-label" for="ai-settings-provider">Proveedor</label>
          <select class="voice-settings-select" id="ai-settings-provider"></select>
          <p class="ai-settings-hint">Gemini tiene plan gratuito seg\xFAn el modelo. OpenAI no permite llamadas directas desde el navegador: usa OpenRouter si quieres modelos de OpenAI.</p>
          <label class="voice-settings-label" for="ai-settings-key">Clave de API</label>
          <div class="ai-settings-key-row">
            <input class="ai-settings-input" id="ai-settings-key" type="password" autocomplete="off" spellcheck="false">
            <button class="btn-secondary ai-settings-toggle" id="ai-settings-key-toggle" type="button" aria-label="Mostrar clave">\u{1F441}\uFE0F</button>
          </div>
          <p class="ai-settings-hint" id="ai-settings-key-help"></p>
          <label class="voice-settings-label" for="ai-settings-model">Modelo</label>
          <input class="ai-settings-input" id="ai-settings-model" type="text" autocomplete="off" spellcheck="false">
          <p class="ai-settings-hint" id="ai-settings-model-help"></p>
          <div class="ai-settings-actions">
            <button class="btn-primary ai-settings-save" id="ai-settings-save" type="button">Guardar clave</button>
            <button class="btn-secondary ai-settings-clear" id="ai-settings-clear" type="button">Borrar clave</button>
            <button class="btn-secondary ai-settings-test" id="ai-settings-test" type="button">Probar conexi\xF3n</button>
          </div>
          <p class="ai-settings-note">\u26A0\uFE0F La clave se guarda solo en este navegador y se env\xEDa \xFAnicamente al proveedor elegido. No la uses en un dispositivo compartido. El texto de la teor\xEDa y las preguntas salen de este equipo.</p>
          <p class="ai-settings-status" id="ai-settings-status" aria-live="polite"></p>
        </section>

        <footer class="voice-settings-footer">
          <span id="voice-settings-saved"></span>
          <button class="btn-primary voice-settings-save" id="voice-settings-save" type="button">Usar esta voz</button>
        </footer>
      </section>
    `;
      this.backdrop = backdrop;
      document.body.append(backdrop);
      this.bindEvents();
      this.showSavedPreference();
      this.initAiSection();
      this.refreshVoiceList(speechManager.getVoices());
      this.unsubscribeVoices = speechManager.subscribe((voices) => this.refreshVoiceList(voices));
      backdrop.querySelector(".voice-settings-dialog").focus();
      this.updateRateLabel();
    }
    bindEvents() {
      this.dialog = this.backdrop.querySelector(".voice-settings-dialog");
      this.select = this.backdrop.querySelector("#voice-settings-select");
      this.meta = this.backdrop.querySelector("#voice-settings-meta");
      this.status = this.backdrop.querySelector("#voice-settings-status");
      this.previewButton = this.backdrop.querySelector("#voice-settings-preview");
      this.stopButton = this.backdrop.querySelector("#voice-settings-stop");
      this.saveButton = this.backdrop.querySelector("#voice-settings-save");
      this.rateSlider = this.backdrop.querySelector("#voice-settings-rate");
      this.rateValue = this.backdrop.querySelector("#voice-settings-rate-value");
      this.backdrop.querySelector(".voice-settings-close").addEventListener("click", () => this.close());
      this.backdrop.addEventListener("click", (event) => {
        if (event.target === this.backdrop) this.close();
      });
      this.select.addEventListener("change", () => this.handleSelectionChange());
      this.rateSlider.addEventListener("input", () => {
        this.rate = Number(this.rateSlider.value);
        this.updateRateLabel();
      });
      this.backdrop.querySelector("#voice-settings-all").addEventListener("change", (event) => {
        this.showAllVoices = event.target.checked;
        this.refreshVoiceList(speechManager.getVoices());
      });
      this.previewButton.addEventListener("click", () => this.previewVoice());
      this.stopButton.addEventListener("click", () => this.stopPreview());
      this.saveButton.addEventListener("click", () => this.saveSelection());
      this.bindAiEvents();
      this.keyHandler = (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          this.close();
        } else if (event.key === "Tab") {
          this.trapFocus(event);
        }
      };
      document.addEventListener("keydown", this.keyHandler);
    }
    bindAiEvents() {
      this.providerSelect = this.backdrop.querySelector("#ai-settings-provider");
      this.keyInput = this.backdrop.querySelector("#ai-settings-key");
      this.keyToggle = this.backdrop.querySelector("#ai-settings-key-toggle");
      this.keyHelp = this.backdrop.querySelector("#ai-settings-key-help");
      this.modelInput = this.backdrop.querySelector("#ai-settings-model");
      this.modelHelp = this.backdrop.querySelector("#ai-settings-model-help");
      this.aiStatus = this.backdrop.querySelector("#ai-settings-status");
      this.aiSave = this.backdrop.querySelector("#ai-settings-save");
      this.aiClear = this.backdrop.querySelector("#ai-settings-clear");
      this.aiTest = this.backdrop.querySelector("#ai-settings-test");
      this.providerSelect.addEventListener("change", () => {
        const provider = AI_PROVIDERS[this.providerSelect.value] || AI_PROVIDERS.gemini;
        const settings = aiTutor.getSettings(provider.id);
        this.modelInput.value = settings.model;
        this.keyInput.value = "";
        this.keyInput.type = "password";
        this.aiKeyVisible = false;
        this.keyToggle.textContent = "\u{1F441}\uFE0F";
        this.keyToggle.setAttribute("aria-label", "Mostrar clave");
        this.refreshAiStatus();
      });
      this.keyToggle.addEventListener("click", () => {
        this.aiKeyVisible = !this.aiKeyVisible;
        this.keyInput.type = this.aiKeyVisible ? "text" : "password";
        this.keyToggle.textContent = this.aiKeyVisible ? "\u{1F648}" : "\u{1F441}\uFE0F";
        this.keyToggle.setAttribute("aria-label", this.aiKeyVisible ? "Ocultar clave" : "Mostrar clave");
      });
      this.aiSave.addEventListener("click", () => this.saveAiSettings());
      this.aiClear.addEventListener("click", () => this.clearAiSettings());
      this.aiTest.addEventListener("click", () => this.testAiSettings());
    }
    initAiSection() {
      if (!this.providerSelect) return;
      this.providerSelect.innerHTML = Object.values(AI_PROVIDERS).map((provider) => `<option value="${provider.id}">${provider.label}</option>`).join("");
      this.providerSelect.value = this.aiSettings.provider;
      this.modelInput.value = this.aiSettings.model;
      this.refreshAiStatus();
    }
    refreshAiStatus() {
      const providerId = this.providerSelect.value;
      const provider = AI_PROVIDERS[providerId] || AI_PROVIDERS.gemini;
      const settings = aiTutor.getSettings(providerId);
      this.aiSettings = settings;
      this.keyInput.placeholder = settings.hasKey ? `Guardada: ${settings.maskedKey} (escribe para cambiarla)` : provider.keyPlaceholder;
      this.keyHelp.innerHTML = `Consigue tu clave en <a href="${provider.keysUrl}" target="_blank" rel="noopener noreferrer">${provider.label}</a>.`;
      this.modelHelp.textContent = `ID exacto del modelo, sin espacios. Ejemplo: ${provider.modelExample}.${provider.id === "gemini" ? " Si 3.8 Flash tarda demasiado, prueba gemini-3.6-flash." : ""}`;
      this.aiClear.disabled = !settings.hasKey;
      this.aiStatus.textContent = settings.hasKey ? `Clave guardada para ${provider.label} en este navegador.` : `Sin clave para ${provider.label}. El tutor permanecer\xE1 desactivado.`;
    }
    saveAiSettings() {
      const providerId = this.providerSelect.value;
      const current = aiTutor.getSettings(providerId);
      const typedKey = this.keyInput.value.trim();
      if (!typedKey && !current.hasKey) {
        this.aiStatus.textContent = "Escribe una clave de API antes de guardar.";
        return;
      }
      const model = aiTutor.normalizeModelId(providerId, this.modelInput.value);
      this.modelInput.value = model;
      const saved = aiTutor.saveSettings({
        provider: providerId,
        model,
        apiKey: typedKey
      });
      this.keyInput.value = "";
      if (!saved) {
        this.aiStatus.textContent = "El navegador no ha permitido guardar la clave. Revisa la configuraci\xF3n de privacidad.";
        return;
      }
      this.refreshAiStatus();
      this.aiStatus.textContent = typedKey ? "Clave guardada en este navegador. Ya puedes preguntar desde la teor\xEDa." : "Proveedor y modelo guardados. Se usar\xE1 esta configuraci\xF3n en el tutor.";
    }
    clearAiSettings() {
      const providerId = this.providerSelect.value;
      if (!window.confirm("\xBFBorrar la clave de API guardada en este dispositivo?")) return;
      aiTutor.clearKey(providerId);
      this.keyInput.value = "";
      this.refreshAiStatus();
      this.aiStatus.textContent = "Clave borrada de este navegador.";
    }
    async testAiSettings() {
      const providerId = this.providerSelect.value;
      const current = aiTutor.getSettings(providerId);
      const typedKey = this.keyInput.value.trim();
      if (!typedKey && !current.hasKey) {
        this.aiStatus.textContent = "Escribe una clave de API antes de probar.";
        return;
      }
      const model = aiTutor.normalizeModelId(providerId, this.modelInput.value);
      this.modelInput.value = model;
      const saved = aiTutor.saveSettings({ provider: providerId, model, apiKey: typedKey });
      if (!saved) {
        this.aiStatus.textContent = "El navegador no ha permitido guardar la clave. Revisa la configuraci\xF3n de privacidad.";
        return;
      }
      this.keyInput.value = "";
      this.refreshAiStatus();
      this.aiTest.disabled = true;
      this.aiStatus.textContent = "Probando la conexi\xF3n con el proveedor\u2026";
      const slowTimer = setTimeout(() => {
        this.aiStatus.textContent = "Sigue esperando\u2026 El proveedor est\xE1 tardando; puede llegar a 1-2 minutos.";
      }, 8e3);
      try {
        const answer = await aiTutor.testConnection();
        this.aiStatus.textContent = `Conexi\xF3n correcta \u2705 El proveedor responde: \xAB${answer.slice(0, 80)}\xBB`;
      } catch (error) {
        this.aiStatus.textContent = `No se pudo conectar: ${error?.message || "error desconocido"}`;
      } finally {
        clearTimeout(slowTimer);
        if (this.aiTest?.isConnected) this.aiTest.disabled = false;
      }
    }
    refreshVoiceList(voices) {
      if (!this.isOpen || !this.select) return;
      this.visibleVoices = voices.filter((voice) => this.showAllVoices || /^es(?:-|$)/i.test(voice.lang || "") || this.mode === "selected" && voiceKeyMatches(voice, this.selectedVoice));
      this.select.innerHTML = '<option value="auto">Autom\xE1tica \u2014 espa\xF1ol</option>';
      this.visibleVoices.forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = `voice:${index}`;
        option.textContent = `${voice.name || "Voz sin nombre"} \u2014 ${voice.lang || "idioma desconocido"}`;
        this.select.append(option);
      });
      let selectedValue = this.mode === "auto" ? "auto" : "";
      if (this.mode === "selected") {
        const index = this.visibleVoices.findIndex((voice) => voiceKeyMatches(voice, this.selectedVoice));
        if (index >= 0) {
          selectedValue = `voice:${index}`;
        } else {
          const option = document.createElement("option");
          option.value = "unavailable";
          option.textContent = `${this.selectedVoice?.name || "Voz guardada"} \u2014 no disponible ahora`;
          this.select.append(option);
          selectedValue = "unavailable";
        }
      }
      this.select.value = selectedValue;
      const supportsSpeech = "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
      this.select.disabled = !supportsSpeech;
      this.previewButton.disabled = !supportsSpeech;
      this.saveButton.disabled = !supportsSpeech;
      if (!supportsSpeech) {
        this.status.textContent = "Este navegador no admite lectura por voz.";
      } else if (!voices.length) {
        this.status.textContent = "Cargando voces\u2026 Si no aparecen, se intentar\xE1 usar la voz predeterminada del navegador.";
      } else if (!voices.some((voice) => /^es(?:-|$)/i.test(voice.lang || ""))) {
        this.status.textContent = "No hay voces disponibles en espa\xF1ol. Puedes mostrar las voces de otros idiomas.";
      } else if (this.status.textContent.startsWith("Cargando voces") || this.status.textContent.startsWith("No hay voces disponibles en espa\xF1ol")) {
        this.status.textContent = "";
      }
      this.updateVoiceMeta();
    }
    handleSelectionChange() {
      this.stopPreview();
      const value = this.select.value;
      if (value === "auto") {
        this.mode = "auto";
        this.selectedVoice = null;
      } else if (value.startsWith("voice:")) {
        const index = Number(value.slice(6));
        const voice = this.visibleVoices[index];
        if (voice) {
          this.mode = "selected";
          this.selectedVoice = {
            voiceURI: voice.voiceURI || "",
            name: voice.name || "",
            lang: voice.lang || ""
          };
        }
      }
      this.status.textContent = "";
      this.updateVoiceMeta();
    }
    currentPreference() {
      return this.mode === "selected" ? { version: 1, mode: "selected", voice: this.selectedVoice, rate: this.rate } : { version: 1, mode: "auto", voice: null, rate: this.rate };
    }
    updateRateLabel() {
      if (this.rateValue) this.rateValue.textContent = `${this.rate.toFixed(2).replace(".", ",")}\xD7`;
    }
    formatRate(rate) {
      return Number(rate ?? 0.94).toFixed(2).replace(".", ",");
    }
    showSavedPreference() {
      const savedLabel = this.backdrop.querySelector("#voice-settings-saved");
      savedLabel.textContent = this.preference.mode === "selected" ? `Voz guardada: ${this.preference.voice.name} \xB7 ${this.formatRate(this.preference.rate)}\xD7` : `Voz guardada: Autom\xE1tica \xB7 ${this.formatRate(this.preference.rate)}\xD7`;
    }
    updateVoiceMeta() {
      if (!this.meta) return;
      const pref = this.currentPreference();
      const voice = speechManager.resolveVoice(pref, speechManager.getVoices(), { fallback: false });
      if (this.mode === "selected" && !voice) {
        this.meta.textContent = "La voz guardada no est\xE1 disponible en este momento; tu elecci\xF3n anterior se conservar\xE1 si no guardas cambios.";
        return;
      }
      const actualVoice = voice || speechManager.resolveVoice({ mode: "auto" });
      if (actualVoice) {
        const service = actualVoice.localService === false ? "Voz en l\xEDnea (puede necesitar conexi\xF3n)" : "Voz local";
        this.meta.textContent = `${this.mode === "auto" ? "Selecci\xF3n autom\xE1tica \xB7 " : ""}${actualVoice.lang || "Idioma desconocido"} \xB7 ${service}`;
      } else {
        this.meta.textContent = "El navegador utilizar\xE1 su voz predeterminada.";
      }
    }
    previewVoice() {
      this.stopPreview();
      const preference = this.currentPreference();
      const result = speechManager.createUtterance(TEST_TEXT, preference, { fallback: false });
      if (!result) {
        this.status.textContent = "No se ha podido preparar la prueba de voz.";
        return;
      }
      if (preference.mode === "selected" && !result.voice) {
        this.status.textContent = "Esa voz no est\xE1 disponible ahora. Elige otra o usa la selecci\xF3n autom\xE1tica.";
        return;
      }
      const utterance = result.utterance;
      this.testUtterance = utterance;
      this.previewButton.disabled = true;
      this.stopButton.disabled = false;
      this.status.textContent = `Reproduciendo${result.voice ? `: ${result.voice.name}` : " con la voz predeterminada"}\u2026`;
      utterance.onend = () => this.finishPreview(utterance, "Prueba finalizada.");
      utterance.onerror = () => this.finishPreview(utterance, "No se pudo reproducir esta voz en el navegador.");
      try {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        this.finishPreview(utterance, "No se pudo iniciar la prueba de voz.");
      }
    }
    finishPreview(utterance, message) {
      if (this.testUtterance !== utterance) return;
      this.testUtterance = null;
      this.previewButton.disabled = false;
      this.stopButton.disabled = true;
      this.status.textContent = message;
    }
    stopPreview() {
      const utterance = this.testUtterance;
      this.testUtterance = null;
      if (utterance && "speechSynthesis" in window) window.speechSynthesis.cancel();
      if (this.previewButton) this.previewButton.disabled = !("speechSynthesis" in window);
      if (this.stopButton) this.stopButton.disabled = true;
    }
    saveSelection() {
      if (this.select.value === "unavailable") {
        this.status.textContent = "La voz guardada no est\xE1 disponible; elige otra voz antes de guardar.";
        return;
      }
      this.stopPreview();
      const stored = speechManager.savePreference(this.currentPreference());
      this.status.textContent = stored ? "Preferencia guardada. Se aplicar\xE1 a las explicaciones." : "Se aplicar\xE1 durante esta sesi\xF3n, pero el navegador no permiti\xF3 guardarla para la pr\xF3xima.";
      this.backdrop.querySelector("#voice-settings-saved").textContent = this.mode === "auto" ? `Voz guardada: Autom\xE1tica \xB7 ${this.formatRate(this.rate)}\xD7` : `Voz guardada: ${this.selectedVoice.name} \xB7 ${this.formatRate(this.rate)}\xD7`;
    }
    trapFocus(event) {
      const focusable = Array.from(this.dialog.querySelectorAll("button:not(:disabled), select:not(:disabled), input:not(:disabled)"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === this.dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    close() {
      if (!this.isOpen) return;
      this.cleanup();
      if (this.returnFocus?.isConnected) this.returnFocus.focus();
    }
    cleanup() {
      if (!this.isOpen) return;
      this.isOpen = false;
      this.stopPreview();
      if (this.unsubscribeVoices) this.unsubscribeVoices();
      this.unsubscribeVoices = null;
      if (this.keyHandler) document.removeEventListener("keydown", this.keyHandler);
      this.backdrop?.remove();
      this.backdrop = null;
    }
  };

  // src/views/menuView.js
  var MenuView = class {
    constructor(catalogo, onSelectCapitulo) {
      this.catalogo = catalogo;
      this.onSelectCapitulo = onSelectCapitulo;
      this.currentLevel = "cursos";
      this.selectedCurso = null;
      this.selectedAsignatura = null;
      this.selectedTema = null;
      this.settingsView = null;
    }
    render(container) {
      this.container = container;
      this.container.innerHTML = `
      <div class="menu-screen">
        <header class="menu-hud">
          <div class="menu-hud-left">
            <button class="btn-hud btn-menu-back hidden" id="btn-menu-back">
              <span>\u2B05\uFE0F Atr\xE1s</span>
            </button>
            <div class="menu-breadcrumbs" id="menu-breadcrumbs">
              <!-- Migas de pan din\xE1micas -->
            </div>
          </div>

          <div class="menu-hud-right">
            <div class="menu-total-stars">
              <span>\u2B50</span>
              <strong id="menu-stars-display">0</strong>
            </div>
            <button class="btn-icon" id="btn-menu-sound" title="Sonido">
              <span id="menu-sound-icon">${audio.isEnabled() ? "\u{1F50A}" : "\u{1F507}"}</span>
            </button>
            <button class="btn-icon" id="btn-menu-settings" title="Configuraci\xF3n" aria-label="Configuraci\xF3n">\u2699\uFE0F</button>
          </div>
        </header>

        <main class="menu-main-stage">
          <div class="menu-section-header">
            <h2 class="menu-section-title" id="menu-section-title">Elige tu Curso</h2>
            <p class="menu-section-sub" id="menu-section-sub">Selecciona para empezar a estudiar jugando</p>
          </div>

          <div class="menu-grid-container" id="menu-grid">
            <!-- Tarjetas interactivas seg\xFAn el nivel actual -->
          </div>
        </main>
      </div>
    `;
      this.bindEvents();
      this.renderCurrentLevel();
    }
    bindEvents() {
      this.container.querySelector("#btn-menu-sound").addEventListener("click", () => {
        const isEnabled = audio.toggleSound();
        this.container.querySelector("#menu-sound-icon").textContent = isEnabled ? "\u{1F50A}" : "\u{1F507}";
      });
      this.container.querySelector("#btn-menu-settings").addEventListener("click", (event) => {
        audio.playClick();
        if (!this.settingsView?.isOpen) this.settingsView = new SettingsView();
        this.settingsView.render(event.currentTarget);
      });
      this.container.querySelector("#btn-menu-back").addEventListener("click", () => {
        audio.playClick();
        this.goBack();
      });
    }
    cleanup() {
      this.settingsView?.cleanup();
      this.settingsView = null;
    }
    goBack() {
      if (this.currentLevel === "capitulos") {
        this.currentLevel = "temas";
      } else if (this.currentLevel === "temas") {
        this.currentLevel = "asignaturas";
      } else if (this.currentLevel === "asignaturas") {
        this.currentLevel = "cursos";
      }
      this.renderCurrentLevel();
    }
    renderCurrentLevel() {
      this.updateHUD();
      const grid = this.container.querySelector("#menu-grid");
      const titleEl = this.container.querySelector("#menu-section-title");
      const subEl = this.container.querySelector("#menu-section-sub");
      switch (this.currentLevel) {
        case "cursos":
          titleEl.textContent = "Elige tu Curso escolar";
          subEl.textContent = "Selecciona tu curso para ver los contenidos disponibles";
          this.renderCursos(grid);
          break;
        case "asignaturas":
          titleEl.textContent = `Asignaturas de ${this.selectedCurso.titulo}`;
          subEl.textContent = "\xBFQu\xE9 materia quieres repasar hoy?";
          this.renderAsignaturas(grid);
          break;
        case "temas":
          titleEl.textContent = `Temas de ${this.selectedAsignatura.titulo}`;
          subEl.textContent = "Selecciona el tema que est\xE1s estudiando en clase";
          this.renderTemas(grid);
          break;
        case "capitulos":
          titleEl.textContent = `${this.selectedTema.titulo}`;
          subEl.textContent = "Elige un cap\xEDtulo para entrar a jugar en el circuito";
          this.renderCapitulos(grid);
          break;
      }
    }
    updateHUD() {
      const starsEl = this.container.querySelector("#menu-stars-display");
      if (starsEl) starsEl.textContent = gameState.getEstrellasTotales();
      const backBtn = this.container.querySelector("#btn-menu-back");
      if (this.currentLevel === "cursos") {
        backBtn.classList.add("hidden");
      } else {
        backBtn.classList.remove("hidden");
      }
      const breadcrumbs = this.container.querySelector("#menu-breadcrumbs");
      let crumbsHtml = `<span class="crumb-link" data-level="cursos">\u{1F392} Cursos</span>`;
      if (this.selectedCurso && this.currentLevel !== "cursos") {
        crumbsHtml += ` <span class="crumb-sep">\u203A</span> <span class="crumb-link" data-level="asignaturas">${this.selectedCurso.titulo}</span>`;
      }
      if (this.selectedAsignatura && (this.currentLevel === "temas" || this.currentLevel === "capitulos")) {
        crumbsHtml += ` <span class="crumb-sep">\u203A</span> <span class="crumb-link" data-level="temas">${this.selectedAsignatura.titulo}</span>`;
      }
      if (this.selectedTema && this.currentLevel === "capitulos") {
        crumbsHtml += ` <span class="crumb-sep">\u203A</span> <span class="crumb-current">${this.selectedTema.titulo}</span>`;
      }
      breadcrumbs.innerHTML = crumbsHtml;
      breadcrumbs.querySelectorAll(".crumb-link").forEach((link) => {
        link.addEventListener("click", () => {
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
      grid.innerHTML = (this.catalogo.cursos || []).map((curso) => `
      <div class="menu-card menu-card-course" data-id="${curso.id}" style="--accent: ${curso.color || "#3b82f6"};">
        <div class="card-hero-icon">${curso.icono}</div>
        <div class="card-info">
          <h3 class="card-main-title">${curso.titulo}</h3>
          <p class="card-sub-title">${curso.subtitulo}</p>
          <div class="card-meta-pill">
            <span>\u{1F4DA} ${(curso.asignaturas || []).length} Asignatura disponible</span>
          </div>
        </div>
        <div class="card-action-arrow">\u27A1\uFE0F</div>
      </div>
    `).join("");
      grid.querySelectorAll(".menu-card").forEach((card) => {
        card.addEventListener("click", () => {
          audio.playClick();
          const cursoId = card.dataset.id;
          this.selectedCurso = this.catalogo.cursos.find((c) => c.id === cursoId);
          this.currentLevel = "asignaturas";
          this.renderCurrentLevel();
        });
      });
    }
    renderAsignaturas(grid) {
      const asignaturas = this.selectedCurso.asignaturas || [];
      grid.innerHTML = asignaturas.map((asig) => `
      <div class="menu-card menu-card-subject" data-id="${asig.id}" style="--accent: ${asig.color || "#f59e0b"};">
        <div class="card-hero-icon">${asig.icono}</div>
        <div class="card-info">
          <h3 class="card-main-title">${asig.titulo}</h3>
          <p class="card-sub-title">${asig.subtitulo}</p>
          <div class="card-meta-pill">
            <span>\u{1F4D6} ${(asig.temas || []).length} Tema preparado</span>
          </div>
        </div>
        <div class="card-action-arrow">\u27A1\uFE0F</div>
      </div>
    `).join("");
      grid.querySelectorAll(".menu-card").forEach((card) => {
        card.addEventListener("click", () => {
          audio.playClick();
          const asigId = card.dataset.id;
          this.selectedAsignatura = asignaturas.find((a) => a.id === asigId);
          this.currentLevel = "temas";
          this.renderCurrentLevel();
        });
      });
    }
    renderTemas(grid) {
      const temas = this.selectedAsignatura.temas || [];
      grid.innerHTML = temas.map((tema) => `
      <div class="menu-card menu-card-topic" data-id="${tema.id}" style="--accent: ${tema.color || "#8b5cf6"};">
        <div class="card-hero-icon">${tema.icono}</div>
        <div class="card-info">
          <span class="card-badge-num">Unidad ${tema.numero}</span>
          <h3 class="card-main-title">${tema.titulo}</h3>
          <p class="card-sub-title">${tema.subtitulo}</p>
          <div class="card-meta-pill">
            <span>\u{1F3AE} ${(tema.capitulos || []).length} Juego / Cap\xEDtulo</span>
          </div>
        </div>
        <div class="card-action-arrow">\u27A1\uFE0F</div>
      </div>
    `).join("");
      grid.querySelectorAll(".menu-card").forEach((card) => {
        card.addEventListener("click", () => {
          audio.playClick();
          const temaId = card.dataset.id;
          this.selectedTema = temas.find((t) => t.id === temaId);
          this.currentLevel = "capitulos";
          this.renderCurrentLevel();
        });
      });
    }
    renderCapitulos(grid) {
      const capitulos = this.selectedTema.capitulos || [];
      grid.innerHTML = capitulos.map((cap) => {
        const progreso = gameState.getTemaProgreso(cap.id);
        const estrellas = Object.values(progreso.estrellas || {}).reduce((a, b) => a + b, 0);
        const isPerfect = estrellas >= (cap.total_estrellas_posibles || 18);
        return `
        <div class="menu-card menu-card-chapter ${isPerfect ? "chapter-perfect" : ""}" data-id="${cap.id}">
          <div class="card-hero-icon">${cap.icono}</div>
          <div class="card-info">
            <span class="card-badge-num">Cap\xEDtulo ${cap.numero}</span>
            <h3 class="card-main-title">${cap.titulo}</h3>
            <p class="card-sub-title">${cap.subtitulo}</p>
            
            <div class="chapter-stars-row">
              <span class="chapter-stars-icon">${isPerfect ? "\u{1F451}" : "\u2B50"}</span>
              <span class="chapter-stars-text">${estrellas} / ${cap.total_estrellas_posibles || 18} estrellas</span>
            </div>
          </div>
          
          <button class="btn-primary btn-play-chapter">
            <span>\xA1Jugar! \u{1F3AE}</span>
          </button>
        </div>
      `;
      }).join("");
      grid.querySelectorAll(".menu-card").forEach((card) => {
        card.addEventListener("click", () => {
          audio.playClick();
          const capId = card.dataset.id;
          const capituloObj = capitulos.find((c) => c.id === capId);
          this.onSelectCapitulo(capituloObj, this.selectedTema);
        });
      });
    }
  };

  // src/views/mapView.js
  var TRACK_PATH = "M 330 120 H 750 A 110 110 0 0 1 860 230 V 330 A 110 110 0 0 1 750 440 H 250 A 110 110 0 0 1 140 330 V 230 A 110 110 0 0 1 250 120 H 330 Z";
  var NODE_POINTS = [
    { x: 330, y: 120 },
    { x: 670, y: 120 },
    { x: 860, y: 280 },
    { x: 670, y: 440 },
    { x: 330, y: 440 },
    { x: 140, y: 280 }
  ];
  var VIEW_W = 1e3;
  var VIEW_H = 560;
  var MapView = class {
    constructor(tema, onSelectCasilla, onResetProgress, onReturnMenu) {
      this.tema = tema;
      this.onSelectCasilla = onSelectCasilla;
      this.onResetProgress = onResetProgress;
      this.onReturnMenu = onReturnMenu;
      this.settingsView = null;
      this.nodeFractions = null;
    }
    render(container) {
      this.container = container;
      const progreso = gameState.getTemaProgreso(this.tema.id);
      const totalEstrellas = Object.values(progreso.estrellas).reduce((a, b) => a + b, 0);
      const totalPosibleEstrellas = this.tema.casillas.length * 3;
      const isPerfect = totalEstrellas >= totalPosibleEstrellas;
      const progresoPct = totalPosibleEstrellas > 0 ? Math.round(totalEstrellas / totalPosibleEstrellas * 100) : 0;
      this.container.innerHTML = `
      <div class="map-screen ${isPerfect ? "all-stars" : ""}">
        <header class="app-header map-header">
          <div class="header-left">
            <button class="btn-hud btn-back" id="btn-return-menu" title="Volver al men\xFA de temas">
              <span>\u2B05\uFE0F Men\xFA</span>
            </button>
            <span class="theme-badge-icon">${this.tema.icono}</span>
            <div class="theme-info">
              <h1 class="header-title" title="${this.tema.titulo}">${this.tema.titulo}</h1>
              <span class="header-subtitle" title="${this.tema.subtitulo}">${this.tema.subtitulo}</span>
            </div>
          </div>

          <div class="header-right">
            <div class="star-counter-pill" title="Estrellas en el circuito">
              <span>${isPerfect ? "\u{1F451}" : "\u2B50"}</span>
              <strong id="header-stars-count">${totalEstrellas} / ${totalPosibleEstrellas}</strong>
            </div>

            <button class="btn-icon" id="btn-sound-toggle" title="Activar/Silenciar sonido">
              <span id="sound-icon">${audio.isEnabled() ? "\u{1F50A}" : "\u{1F507}"}</span>
            </button>

            <button class="btn-icon" id="btn-map-settings" title="Configuraci\xF3n" aria-label="Configuraci\xF3n">\u2699\uFE0F</button>

            <button class="btn-icon btn-secondary-icon" id="btn-reset-topic" title="Reiniciar circuito">
              <span>\u{1F504}</span>
            </button>
          </div>
        </header>

        <main class="map-viewport">
          <div class="map-scenery" aria-hidden="true">
            <div class="map-sun"></div>
            <div class="map-cloud cloud-1"></div>
            <div class="map-cloud cloud-2"></div>
            <div class="map-cloud cloud-3"></div>
            <div class="map-hills">
              <div class="map-hill hill-back"></div>
              <div class="map-hill hill-mid"></div>
              <div class="map-hill hill-front"></div>
            </div>
            <div class="map-tree tree-1"></div>
            <div class="map-tree tree-2"></div>
            <div class="map-tree tree-3"></div>
            <div class="map-tree tree-4"></div>
          </div>

          <div class="circuit-stage">
            <svg class="circuit-svg" preserveAspectRatio="none" viewBox="0 0 ${VIEW_W} ${VIEW_H}" aria-hidden="true">
              <defs>
                <linearGradient id="mapTrackSand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#fffaf0" />
                  <stop offset="55%" stop-color="#f6e6c2" />
                  <stop offset="100%" stop-color="#eed9a9" />
                </linearGradient>
                <linearGradient id="mapTrackGold" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#fcd34d" />
                  <stop offset="45%" stop-color="#f59e0b" />
                  <stop offset="100%" stop-color="#ea8a0c" />
                </linearGradient>
              </defs>

              <path class="circuit-track circuit-track-shadow" d="${TRACK_PATH}" />
              <path class="circuit-track circuit-track-rim" d="${TRACK_PATH}" />
              <path class="circuit-track circuit-track-base" d="${TRACK_PATH}" />
              <path class="circuit-track circuit-track-dashes" d="${TRACK_PATH}" />
              <path class="circuit-track circuit-track-active" id="circuit-active-path" d="${TRACK_PATH}" />
            </svg>

            <div class="circuit-center-hub ${isPerfect ? "all-stars-perfect" : ""}">
              <div class="hub-emblem">${isPerfect ? "\u{1F451}" : "\u{1F3C6}"}</div>
              <h3 class="hub-title">${isPerfect ? "\xA1Corona de Oro!" : "Circuito del Tiempo"}</h3>
              <div class="hub-progress">
                <div class="hub-progress-track">
                  <span class="hub-progress-fill" style="width: ${progresoPct}%"></span>
                </div>
                <span class="hub-stars-badge">${totalEstrellas} / ${totalPosibleEstrellas} \u2B50</span>
              </div>
              <p class="hub-hint">
                ${isPerfect ? "\xA1Enhorabuena! Tienes 3 estrellas en todas las paradas." : "Recorre el circuito una y otra vez para conseguir 3\u2B50 en cada parada."}
              </p>
            </div>

            ${this.renderCircuitNodes()}
          </div>
        </main>

        <footer class="map-footer-tip">
          <span class="tip-icon">\u{1F9ED}</span>
          <span class="tip-text">Camino circular infinito: puedes repetir cualquier parada superada para mejorar tu r\xE9cord de estrellas.</span>
        </footer>
      </div>
    `;
      this.bindEvents();
      this.updateCircuitPath();
    }
    renderCircuitNodes() {
      return this.tema.casillas.map((casilla, index) => {
        const isUnlocked = gameState.isCasillaDesbloqueada(this.tema.id, casilla.id);
        const stars = gameState.getEstrellasCasilla(this.tema.id, casilla.id);
        const point = NODE_POINTS[index % NODE_POINTS.length];
        let statusClass = "locked";
        if (isUnlocked) {
          if (stars === 3) {
            statusClass = "three-stars";
          } else if (stars > 0) {
            statusClass = "completed";
          } else {
            statusClass = "current";
          }
        }
        const labelPosition = point.y < VIEW_H / 2 ? "" : "label-below";
        const cleanTitle = String(casilla.titulo || "").replace(/^\s*\d+[.)]\s*/, "");
        return `
        <div class="circuit-node ${statusClass} ${labelPosition}"
             data-casilla-id="${casilla.id}"
             style="--nx: ${(point.x / VIEW_W * 100).toFixed(2)}%; --ny: ${(point.y / VIEW_H * 100).toFixed(2)}%;">
          <div class="circuit-node-label">
            <span class="circuit-node-step">Parada ${casilla.id}</span>
            <span class="circuit-node-title">${cleanTitle}</span>
          </div>

          <button class="circuit-btn" ${!isUnlocked ? "disabled" : ""} aria-label="${cleanTitle}">
            <span class="circuit-btn-number">${casilla.id}</span>
            <span class="circuit-btn-icon">${isUnlocked ? casilla.icono : "\u{1F512}"}</span>
            ${stars > 0 ? `<span class="circuit-stars-tag">${"\u2B50".repeat(stars)}</span>` : ""}
          </button>
        </div>
      `;
      }).join("");
    }
    bindEvents() {
      const returnBtn = this.container.querySelector("#btn-return-menu");
      if (returnBtn && this.onReturnMenu) {
        returnBtn.addEventListener("click", () => {
          audio.playClick();
          this.onReturnMenu();
        });
      }
      this.container.querySelector("#btn-sound-toggle").addEventListener("click", () => {
        const isEnabled = audio.toggleSound();
        this.container.querySelector("#sound-icon").textContent = isEnabled ? "\u{1F50A}" : "\u{1F507}";
      });
      this.container.querySelector("#btn-map-settings").addEventListener("click", (event) => {
        audio.playClick();
        if (!this.settingsView?.isOpen) this.settingsView = new SettingsView();
        this.settingsView.render(event.currentTarget);
      });
      this.container.querySelector("#btn-reset-topic").addEventListener("click", () => {
        if (confirm("\xBFQuieres reiniciar las estrellas del circuito para empezar de nuevo?")) {
          audio.playClick();
          gameState.reiniciarProgresoTema(this.tema.id);
          this.render(this.container);
        }
      });
      const nodeEls = this.container.querySelectorAll(".circuit-node");
      nodeEls.forEach((node) => {
        node.addEventListener("click", () => {
          const casillaId = parseInt(node.dataset.casillaId, 10);
          const isUnlocked = gameState.isCasillaDesbloqueada(this.tema.id, casillaId);
          if (isUnlocked) {
            audio.playClick();
            const casillaData = this.tema.casillas.find((c) => c.id === casillaId);
            this.onSelectCasilla(casillaData);
          } else {
            audio.playWrong();
            node.classList.add("shake");
            setTimeout(() => node.classList.remove("shake"), 400);
          }
        });
      });
    }
    cleanup() {
      this.settingsView?.cleanup();
      this.settingsView = null;
    }
    /** Calcula en qué punto del camino está cada parada (0..1) */
    computeNodeFractions(pathEl) {
      const totalLength = pathEl.getTotalLength();
      if (!totalLength) return NODE_POINTS.map((_, i) => i / NODE_POINTS.length);
      const steps = 240;
      return NODE_POINTS.map((point) => {
        let bestFraction = 0;
        let bestDistance = Infinity;
        for (let i = 0; i <= steps; i++) {
          const fraction = i / steps;
          const p = pathEl.getPointAtLength(totalLength * fraction);
          const dx = p.x - point.x;
          const dy = p.y - point.y;
          const distance = dx * dx + dy * dy;
          if (distance < bestDistance) {
            bestDistance = distance;
            bestFraction = fraction;
          }
        }
        return bestFraction;
      });
    }
    updateCircuitPath() {
      const pathActive = this.container.querySelector("#circuit-active-path");
      if (!pathActive) return;
      const totalLength = pathActive.getTotalLength();
      if (!totalLength) return;
      if (!this.nodeFractions) {
        this.nodeFractions = this.computeNodeFractions(pathActive);
      }
      const progreso = gameState.getTemaProgreso(this.tema.id);
      const totalCasillas = this.tema.casillas.length;
      let ratio;
      if (progreso.casillaDesbloqueada > totalCasillas) {
        ratio = 1;
      } else {
        const index = Math.max(0, Math.min(progreso.casillaDesbloqueada - 1, totalCasillas - 1));
        ratio = totalCasillas === this.nodeFractions.length ? this.nodeFractions[index] : index / totalCasillas;
      }
      pathActive.style.strokeDasharray = `${totalLength * ratio} ${totalLength}`;
      pathActive.style.strokeDashoffset = "0";
    }
  };

  // src/views/theoryView.js
  var TheoryView = class {
    constructor(tema, casillaData, onComplete, onExit) {
      this.tema = tema;
      this.casillaData = casillaData;
      this.onComplete = onComplete;
      this.onExit = onExit;
      this.slides = this.buildSlides(casillaData);
      this.currentIndex = 0;
      this.isSpeaking = false;
      this.isVoicePaused = false;
      this.isVoiceMuted = localStorage.getItem("playstudy_theory_mute") === "true";
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
              `[Teor\xEDa] La diapositiva \xAB${t.nombre}\xBB de \xAB${casillaData.titulo}\xBB debe tener "imagen" y "locucion".`
            );
          }
          slides.push({
            tipo: "diapositiva",
            fichaTitulo: ficha.titulo,
            fichaSubtitulo: ficha.subtitulo,
            fichaIcono: ficha.icono,
            nombre: t.nombre,
            fecha: t.fecha || "",
            icono: t.icono || "\u{1F4D6}",
            color: t.color || "#3b82f6",
            puntos: t.puntos || [],
            locucion: t.locucion || "",
            imagen: t.imagen || null,
            ajusteImagen: t.ajuste_imagen || "recorte",
            texto: t.texto || ""
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
            <p>Esta teor\xEDa no tiene diapositivas. A\xF1ade tarjetas con <code>imagen</code> y <code>locucion</code> en <code>contenido.json</code>.</p>
            <button class="btn-primary" id="btn-theory-exit-empty">\u2B05\uFE0F Volver al circuito</button>
          </div>
        </div>
      `;
        this.container.querySelector("#btn-theory-exit-empty").addEventListener("click", () => {
          audio.playClick();
          this.onExit();
        });
        return;
      }
      this.container.innerHTML = `
      <div class="theory-wrapper">
        <header class="theory-hud">
          <button class="btn-hud btn-back" id="btn-theory-exit" title="Volver al circuito">
            <span>\u2B05\uFE0F Circuito</span>
          </button>
          
          <div class="theory-title-area">
            <h2 class="theory-main-title">${this.casillaData.titulo}</h2>
          </div>

          <div class="theory-hud-actions">
            <button class="btn-hud btn-ask-ai" id="btn-ask-ai" type="button" title="Preguntar al tutor sobre esta teor\xEDa">
              <span>\u{1F64B} Preguntar</span>
            </button>
            <div class="theory-badge">
              <span id="slide-indicator">Diapositiva 1 de ${totalSlides}</span>
            </div>
          </div>
        </header>

        <div class="theory-content-viewport">
          <div class="theory-card is-presentation" id="theory-current-card">
            <!-- Contenido din\xE1mico de la diapositiva -->
          </div>
        </div>

        <footer class="theory-nav-footer">
          <div class="slide-dots-container" id="theory-dots-bar">
            ${this.slides.map((_, i) => `<span class="slide-dot-pill ${i === 0 ? "active" : ""}" data-index="${i}" title="Ir a diapositiva ${i + 1}"></span>`).join("")}
          </div>

          <button class="btn-secondary btn-nav" id="btn-prev-slide" disabled>
            <span>\u2B05\uFE0F Anterior</span>
          </button>

          <button class="btn-primary btn-nav pulse-glow" id="btn-next-slide">
            <span>${totalSlides === 1 ? "\xA1Entendido! Ir al Quiz \u2753 \u27A1\uFE0F" : "Siguiente \u27A1\uFE0F"}</span>
          </button>
        </footer>
      </div>
    `;
      this.bindEvents();
      this.renderCurrentSlide();
    }
    bindEvents() {
      this.container.querySelector("#btn-theory-exit").addEventListener("click", () => {
        audio.playClick();
        this.stopSpeaking();
        this.onExit();
      });
      this.container.querySelector("#btn-prev-slide").addEventListener("click", () => {
        if (this.currentIndex > 0) {
          audio.playClick();
          this.stopSpeaking();
          this.currentIndex--;
          this.renderCurrentSlide();
        }
      });
      this.container.querySelector("#btn-next-slide").addEventListener("click", () => {
        audio.playClick();
        this.stopSpeaking();
        if (this.currentIndex < this.slides.length - 1) {
          this.currentIndex++;
          this.renderCurrentSlide();
        } else {
          this.handleComplete();
        }
      });
      this.container.querySelector("#btn-ask-ai").addEventListener("click", () => {
        audio.playClick();
        this.openAiPanel();
      });
      const dots = this.container.querySelectorAll(".slide-dot-pill");
      dots.forEach((dot) => {
        dot.addEventListener("click", (e) => {
          const targetIdx = parseInt(e.currentTarget.getAttribute("data-index"), 10);
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
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
        if (this.aiPanel) return;
        if (e.key === "ArrowRight" || e.key === "Enter") {
          const nextBtn = this.container.querySelector("#btn-next-slide");
          if (nextBtn) nextBtn.click();
        } else if (e.key === "ArrowLeft") {
          const prevBtn = this.container.querySelector("#btn-prev-slide");
          if (prevBtn && !prevBtn.disabled) prevBtn.click();
        }
      };
      window.addEventListener("keydown", this.keyHandler);
    }
    cleanup() {
      this.stopSpeaking();
      this.closeAiPanel();
      if (this.settingsView) {
        this.settingsView.cleanup();
        this.settingsView = null;
      }
      if (this.keyHandler) {
        window.removeEventListener("keydown", this.keyHandler);
      }
    }
    renderCurrentSlide() {
      const slide = this.slides[this.currentIndex];
      const totalSlides = this.slides.length;
      const cardEl = this.container.querySelector("#theory-current-card");
      const prevBtn = this.container.querySelector("#btn-prev-slide");
      const nextBtn = this.container.querySelector("#btn-next-slide");
      const indicator = this.container.querySelector("#slide-indicator");
      indicator.textContent = `Diapositiva ${this.currentIndex + 1} de ${totalSlides}`;
      prevBtn.disabled = this.currentIndex === 0;
      const isLast = this.currentIndex === totalSlides - 1;
      if (isLast) {
        nextBtn.innerHTML = `<span>\xA1Entendido! Ir al Quiz \u2753 \u27A1\uFE0F</span>`;
      } else {
        nextBtn.innerHTML = `<span>Siguiente \u27A1\uFE0F</span>`;
      }
      const dots = this.container.querySelectorAll(".slide-dot-pill");
      dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === this.currentIndex);
      });
      cardEl.style.setProperty("--slide-accent", slide.color || "#3b82f6");
      cardEl.innerHTML = `
      <header class="presentation-header">
        <div class="presentation-title-group">
          <span class="presentation-stage-icon">${slide.icono}</span>
          <div class="presentation-stage-titles">
            <h3 class="presentation-stage-name">${slide.nombre}</h3>
            ${slide.fecha ? `<span class="presentation-stage-date">${slide.fecha}</span>` : ""}
          </div>
        </div>
        ${this.getNarratorBarHtml()}
      </header>

      <div class="presentation-body has-image ${slide.ajusteImagen === "completo" ? "is-full-image" : ""}">
        <div class="presentation-visual-frame">
          <img class="presentation-main-image" src="${slide.imagen}" alt="${slide.nombre}" />
        </div>
        <div class="presentation-content-side">
          ${slide.texto ? `<p class="presentation-image-caption">${this.formatMarkdown(slide.texto)}</p>` : ""}
          ${(slide.puntos || []).map((p) => `
            <div class="presentation-bullet-card">
              <span class="presentation-bullet-icon">\u2728</span>
              <div class="presentation-bullet-text">${this.formatMarkdown(p)}</div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
      this.bindVoiceControls(slide);
      this.speakSlide(slide);
    }
    getNarratorBarHtml() {
      return `
      <div class="theory-narrator-bar ${this.isSpeaking ? "speaking" : ""} ${this.isVoicePaused ? "paused" : ""}" id="narrator-bar">
        <div class="voice-wave-anim">
          <span></span><span></span><span></span>
        </div>
        <span class="narrator-label" id="narrator-status-text">
          ${this.isVoiceMuted ? "Voz silenciada" : this.isSpeaking ? "Explicando..." : this.isVoicePaused ? "Pausado" : "Lectura por voz"}
        </span>
        <button class="btn-voice-ctrl" id="btn-voice-toggle" title="Pausar o reanudar explicaci\xF3n">
          ${this.isSpeaking ? "\u23F8\uFE0F Pausar" : "\u25B6\uFE0F Escuchar"}
        </button>
        <button class="btn-voice-ctrl" id="btn-voice-replay" title="Volver a escuchar esta diapositiva">
          \u{1F501} Repetir
        </button>
        <button class="btn-voice-ctrl" id="btn-voice-mute" title="Activar o silenciar voz">
          ${this.isVoiceMuted ? "\u{1F507}" : "\u{1F50A}"}
        </button>
      </div>
    `;
    }
    bindVoiceControls(slide) {
      const bar = this.container.querySelector("#narrator-bar");
      if (!bar) return;
      const toggleBtn = bar.querySelector("#btn-voice-toggle");
      const replayBtn = bar.querySelector("#btn-voice-replay");
      const muteBtn = bar.querySelector("#btn-voice-mute");
      if (toggleBtn) {
        toggleBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.toggleSpeech(slide);
        });
      }
      if (replayBtn) {
        replayBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.speakSlide(slide, true);
        });
      }
      if (muteBtn) {
        muteBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.isVoiceMuted = !this.isVoiceMuted;
          localStorage.setItem("playstudy_theory_mute", this.isVoiceMuted);
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
      if (!("speechSynthesis" in window)) return;
      this.stopSpeaking();
      if (this.isVoiceMuted && !force) {
        this.updateNarratorUi();
        return;
      }
      let textToSpeak = "";
      if (slide.locucion) {
        textToSpeak = slide.locucion;
      } else {
        const puntosText = (slide.puntos || []).map((p) => p.replace(/\*\*/g, "")).join(". ");
        textToSpeak = `${slide.nombre}. ${slide.fecha ? slide.fecha + ". " : ""}${puntosText}`;
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
          const nextBtn = this.container?.querySelector("#btn-next-slide");
          if (nextBtn) nextBtn.classList.add("pulse-glow");
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
      if (preference.mode === "selected" && !speechManager.getVoices().length) {
        speechManager.waitForVoices().then(() => startSpeech());
      } else {
        startSpeech();
      }
    }
    toggleSpeech(slide) {
      if (!("speechSynthesis" in window)) return;
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
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      this.isSpeaking = false;
      this.isVoicePaused = false;
      this.currentUtterance = null;
    }
    updateNarratorUi() {
      const bar = this.container?.querySelector("#narrator-bar");
      if (!bar) return;
      bar.classList.toggle("speaking", this.isSpeaking);
      bar.classList.toggle("paused", this.isVoicePaused);
      const label = bar.querySelector("#narrator-status-text");
      if (label) {
        if (this.isVoiceMuted) {
          label.textContent = "Voz silenciada";
        } else if (this.isSpeaking) {
          label.textContent = "Explicando...";
        } else if (this.isVoicePaused) {
          label.textContent = "Pausado";
        } else {
          label.textContent = "Lectura por voz";
        }
      }
      const toggleBtn = bar.querySelector("#btn-voice-toggle");
      if (toggleBtn) {
        toggleBtn.innerHTML = this.isSpeaking ? "\u23F8\uFE0F Pausar" : "\u25B6\uFE0F Escuchar";
      }
      const muteBtn = bar.querySelector("#btn-voice-mute");
      if (muteBtn) {
        muteBtn.innerHTML = this.isVoiceMuted ? "\u{1F507}" : "\u{1F50A}";
      }
    }
    /* ==========================================================================
       TUTOR CON IA (clave de API propia)
       ========================================================================== */
    openAiPanel() {
      if (this.aiPanel) return;
      this.stopSpeaking();
      const hasKey = aiTutor.hasKey();
      const panel = document.createElement("div");
      panel.className = "ai-tutor-backdrop";
      panel.id = "ai-tutor-backdrop";
      panel.innerHTML = `
      <section class="ai-tutor-panel" role="dialog" aria-modal="true" aria-labelledby="ai-tutor-title" tabindex="-1">
        <header class="ai-tutor-header">
          <div class="ai-tutor-heading">
            <span class="ai-tutor-emoji" aria-hidden="true">\u{1F916}</span>
            <div>
              <h2 id="ai-tutor-title">Pregunta sobre la teor\xEDa</h2>
              <p class="ai-tutor-context" id="ai-tutor-context"></p>
            </div>
          </div>
          <button class="btn-icon ai-tutor-close" type="button" aria-label="Cerrar el tutor">\u2715</button>
        </header>
        <div class="ai-tutor-body">
          <div class="ai-tutor-setup" id="ai-tutor-setup" hidden>
            <p>El tutor con IA todav\xEDa no est\xE1 activado. Un adulto puede activarlo con una clave de API desde \u2699\uFE0F Configuraci\xF3n.</p>
            <button class="btn-primary" id="ai-tutor-open-settings" type="button">Abrir configuraci\xF3n</button>
          </div>
          <form class="ai-tutor-form" id="ai-tutor-form">
            <div class="ai-tutor-question-head">
              <label class="ai-tutor-label" for="ai-tutor-question">Escribe o dicta tu pregunta</label>
              <button class="ai-tutor-mic" id="ai-tutor-mic" type="button" aria-label="Dictar la pregunta por voz" title="Hablar en vez de escribir" aria-pressed="false" hidden>
                <span aria-hidden="true">\u{1F3A4}</span> Hablar
              </button>
            </div>
            <p class="ai-tutor-dictation-status" id="ai-tutor-dictation-status" role="status" aria-live="polite" hidden></p>
            <textarea class="ai-tutor-question" id="ai-tutor-question" maxlength="${AI_MAX_QUESTION_LENGTH}" rows="3" placeholder="\xBFPor qu\xE9...? \xBFQu\xE9 significa...?"></textarea>
            <div class="ai-tutor-suggestions" id="ai-tutor-suggestions">
              <button type="button" data-question="Expl\xEDcamelo con palabras m\xE1s f\xE1ciles.">Expl\xEDcamelo f\xE1cil</button>
              <button type="button" data-question="\xBFQu\xE9 es lo m\xE1s importante de esta diapositiva?">Lo m\xE1s importante</button>
              <button type="button" data-question="Ponme un ejemplo para entenderlo mejor.">Ponme un ejemplo</button>
            </div>
            <div class="ai-tutor-form-actions">
              <span class="ai-tutor-count" id="ai-tutor-count">0/${AI_MAX_QUESTION_LENGTH}</span>
              <button class="btn-primary ai-tutor-submit" id="ai-tutor-submit" type="submit">Preguntar \u{1F916}</button>
            </div>
          </form>
          <div class="ai-tutor-answer" id="ai-tutor-answer" aria-live="polite"></div>
        </div>
      </section>
    `;
      document.body.append(panel);
      this.aiPanel = panel;
      const form = panel.querySelector("#ai-tutor-form");
      const setup = panel.querySelector("#ai-tutor-setup");
      const questionInput = panel.querySelector("#ai-tutor-question");
      const submit = panel.querySelector("#ai-tutor-submit");
      const answerEl = panel.querySelector("#ai-tutor-answer");
      const counter = panel.querySelector("#ai-tutor-count");
      const contextEl = panel.querySelector("#ai-tutor-context");
      const micButton = panel.querySelector("#ai-tutor-mic");
      const dictationStatus = panel.querySelector("#ai-tutor-dictation-status");
      contextEl.textContent = this.currentSlideLabel() ? `Sobre: ${this.currentSlideLabel()}` : "";
      if (this.supportsAiDictation()) micButton.hidden = false;
      if (!hasKey) {
        setup.hidden = false;
        form.hidden = true;
      }
      panel.querySelector(".ai-tutor-close").addEventListener("click", () => this.closeAiPanel());
      panel.addEventListener("click", (event) => {
        if (event.target === panel) this.closeAiPanel();
      });
      panel.querySelector("#ai-tutor-open-settings").addEventListener("click", (event) => {
        this.closeAiPanel();
        if (!this.settingsView) this.settingsView = new SettingsView();
        this.settingsView.render(event.currentTarget);
      });
      questionInput.addEventListener("input", () => {
        counter.textContent = `${questionInput.value.length}/${AI_MAX_QUESTION_LENGTH}`;
      });
      micButton.addEventListener("click", () => {
        if (this.aiRecognition) this.stopAiDictation();
        else this.startAiDictation({ questionInput, counter, micButton, statusEl: dictationStatus });
      });
      panel.querySelectorAll("#ai-tutor-suggestions button").forEach((button) => {
        button.addEventListener("click", () => {
          questionInput.value = button.dataset.question || "";
          counter.textContent = `${questionInput.value.length}/${AI_MAX_QUESTION_LENGTH}`;
          questionInput.focus();
        });
      });
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (this.aiRecognition) this.stopAiDictation();
        this.askAiQuestion(questionInput.value, submit, answerEl);
      });
      this.aiKeyHandler = (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          this.closeAiPanel();
        }
      };
      document.addEventListener("keydown", this.aiKeyHandler);
      if (hasKey) questionInput.focus();
      else panel.querySelector("#ai-tutor-open-settings").focus();
    }
    closeAiPanel() {
      this.stopAiDictation();
      if (this.aiRequest) {
        this.aiRequest.abort();
        this.aiRequest = null;
      }
      if (this.aiKeyHandler) {
        document.removeEventListener("keydown", this.aiKeyHandler);
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
      micButton.classList.toggle("is-listening", listening);
      micButton.setAttribute("aria-pressed", listening ? "true" : "false");
      micButton.innerHTML = listening ? '<span aria-hidden="true">\u23F9\uFE0F</span> Detener' : '<span aria-hidden="true">\u{1F3A4}</span> Hablar';
    }
    showAiDictationStatus(statusEl, message, isError = false) {
      statusEl.hidden = !message;
      statusEl.textContent = message;
      statusEl.classList.toggle("is-error", Boolean(message) && isError);
    }
    startAiDictation({ questionInput, counter, micButton, statusEl }) {
      const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognitionCtor || this.aiRecognition) return;
      let recognition;
      try {
        recognition = new SpeechRecognitionCtor();
      } catch (error) {
        this.showAiDictationStatus(statusEl, "Este navegador no puede usar el micr\xF3fono.", true);
        return;
      }
      const baseText = questionInput.value.trim();
      let finalText = "";
      let hadError = false;
      recognition.lang = "es-ES";
      recognition.interimResults = true;
      recognition.continuous = false;
      recognition.maxAlternatives = 1;
      this.aiRecognition = recognition;
      this.setAiDictationUi(micButton, true);
      this.showAiDictationStatus(statusEl, "Escuchando\u2026 habla ahora.");
      recognition.onresult = (event) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i += 1) {
          const result = event.results[i];
          transcript += (result[0]?.transcript || "") + (result.isFinal ? " " : "");
        }
        finalText = transcript.trim();
        const question = [baseText, finalText].filter(Boolean).join(" ");
        questionInput.value = question.slice(0, AI_MAX_QUESTION_LENGTH);
        counter.textContent = `${questionInput.value.length}/${AI_MAX_QUESTION_LENGTH}`;
      };
      recognition.onerror = (event) => {
        if (event.error === "aborted") return;
        hadError = true;
        const messages = {
          "not-allowed": "No se ha dado permiso al micr\xF3fono. Act\xEDvalo en los ajustes del navegador.",
          "service-not-allowed": "El dictado no est\xE1 permitido aqu\xED. Prueba desde HTTPS o localhost.",
          "audio-capture": "No se encuentra un micr\xF3fono disponible.",
          network: "El dictado necesita conexi\xF3n a Internet y no ha podido conectar.",
          "no-speech": "No se ha o\xEDdo ninguna pregunta. Int\xE9ntalo de nuevo hablando m\xE1s cerca del micr\xF3fono."
        };
        this.showAiDictationStatus(statusEl, messages[event.error] || "No se ha podido dictar la pregunta.", true);
      };
      recognition.onend = () => {
        if (this.aiRecognition === recognition) this.aiRecognition = null;
        this.setAiDictationUi(micButton, false);
        if (hadError) return;
        if (finalText) {
          this.showAiDictationStatus(statusEl, "Pregunta dictada. Rev\xEDsala y pulsa Preguntar.");
          questionInput.focus();
        } else {
          this.showAiDictationStatus(statusEl, "No se ha o\xEDdo nada. Int\xE9ntalo de nuevo.", true);
        }
      };
      try {
        recognition.start();
      } catch (error) {
        this.aiRecognition = null;
        this.setAiDictationUi(micButton, false);
        this.showAiDictationStatus(statusEl, "No se ha podido activar el micr\xF3fono.", true);
      }
    }
    async askAiQuestion(question, submit, answerEl) {
      const clean = String(question || "").trim();
      if (!clean) {
        answerEl.innerHTML = '<p class="ai-tutor-error">Escribe una pregunta para el tutor.</p>';
        return;
      }
      const controller = new AbortController();
      this.aiRequest = controller;
      submit.disabled = true;
      answerEl.innerHTML = '<p class="ai-tutor-thinking">Pensando\u2026 \u{1F914}</p>';
      const slowTimer = setTimeout(() => {
        if (this.aiPanel) {
          answerEl.innerHTML = '<p class="ai-tutor-thinking">Sigue pensando\u2026 Gemini est\xE1 tardando \xFAltimamente. Puede llegar a un minuto; no cierres esta ventana.</p>';
        }
      }, 8e3);
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
        const message = error?.message || "No se ha podido obtener una respuesta.";
        answerEl.innerHTML = "";
        const paragraph = document.createElement("p");
        paragraph.className = "ai-tutor-error";
        paragraph.textContent = message;
        answerEl.append(paragraph);
      } finally {
        clearTimeout(slowTimer);
        if (this.aiRequest === controller) this.aiRequest = null;
        if (submit.isConnected) submit.disabled = false;
      }
    }
    renderAiAnswer(answer, answerEl) {
      answerEl.innerHTML = "";
      const paragraph = document.createElement("p");
      paragraph.className = "ai-tutor-answer-text";
      paragraph.textContent = answer;
      const actions = document.createElement("div");
      actions.className = "ai-tutor-answer-actions";
      if ("speechSynthesis" in window) {
        const listen = document.createElement("button");
        listen.type = "button";
        listen.className = "btn-secondary";
        listen.textContent = "\u{1F50A} Escuchar";
        listen.addEventListener("click", () => this.speakAiAnswer(answer));
        actions.append(listen);
      }
      answerEl.append(paragraph, actions);
    }
    speakAiAnswer(text) {
      if (!("speechSynthesis" in window)) return;
      const result = speechManager.createUtterance(text, speechManager.getPreference(), { preferLocal: false });
      if (!result) return;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(result.utterance);
    }
    buildAiContext() {
      const title = this.casillaData.titulo || "Cap\xEDtulo";
      const lines = this.slides.map((slide, index) => {
        const name = slide.nombre || slide.titulo || slide.fichaTitulo || `Diapositiva ${index + 1}`;
        const body = [slide.texto, ...slide.puntos || [], slide.locucion].filter(Boolean).join(" ");
        return `${index + 1}. ${name}: ${body}`;
      });
      let context = `${title}
${lines.join("\n")}`;
      if (context.length > AI_MAX_CONTEXT_LENGTH) context = context.slice(0, AI_MAX_CONTEXT_LENGTH) + "\u2026";
      return context;
    }
    currentSlideLabel() {
      const slide = this.slides[this.currentIndex];
      if (!slide) return "";
      return slide.nombre || slide.titulo || slide.fichaTitulo || `Diapositiva ${this.currentIndex + 1}`;
    }
    formatMarkdown(text) {
      if (!text) return "";
      return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    }
    handleComplete() {
      this.cleanup();
      audio.playVictory();
      gameState.completarCasilla(this.tema.id, this.casillaData.id, 3);
      this.onComplete(3);
    }
  };

  // src/views/quizView.js
  var QuizView = class {
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
      const preguntasPreparadas = preguntasOriginales.map((q) => {
        const opcionesConInfo = q.opciones.map((texto, idx) => ({
          texto,
          esCorrecta: idx === q.correcta
        }));
        for (let i = opcionesConInfo.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [opcionesConInfo[i], opcionesConInfo[j]] = [opcionesConInfo[j], opcionesConInfo[i]];
        }
        return {
          ...q,
          opciones: opcionesConInfo.map((o) => o.texto),
          correcta: opcionesConInfo.findIndex((o) => o.esCorrecta)
        };
      });
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
            <span>\u2B05\uFE0F Circuito</span>
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
            <div class="victory-icon">\u{1F3C6}</div>
            <h2 class="victory-title">\xA1Desaf\xEDo Superado!</h2>
            <p class="victory-subtitle" id="quiz-final-score-text">Has respondido correctamente</p>
            
            <div class="stars-awarded" id="quiz-stars">
              <!-- Estrellas generadas -->
            </div>

            <p class="quiz-congrats-message" id="quiz-congrats">
              \xA1Eres todo un experto en las Edades de la Historia!
            </p>

            <div class="modal-actions">
              <button class="btn-primary btn-large" id="btn-finish-quiz">
                <span>Volver al Circuito \u{1F5FA}\uFE0F</span>
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
      this.container.querySelector("#btn-quiz-exit").addEventListener("click", () => {
        audio.playClick();
        this.onExit();
      });
      this.container.querySelector("#btn-finish-quiz").addEventListener("click", () => {
        audio.playClick();
        this.onComplete(this.calculatedStars);
      });
    }
    renderCurrentQuestion() {
      this.hasAnsweredCurrent = false;
      const q = this.preguntas[this.currentIndex];
      const cardEl = this.container.querySelector("#quiz-card");
      const counterEl = this.container.querySelector("#quiz-question-counter");
      const progressFill = this.container.querySelector("#quiz-progress-fill");
      const total = this.preguntas.length;
      counterEl.textContent = `Pregunta ${this.currentIndex + 1} de ${total}`;
      progressFill.style.width = `${this.currentIndex / total * 100}%`;
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
        `).join("")}
      </div>

      <div class="quiz-feedback-box hidden" id="quiz-feedback">
        <div class="feedback-content">
          <span class="feedback-icon" id="feedback-icon"></span>
          <p class="feedback-text" id="feedback-text"></p>
        </div>
        <button class="btn-primary btn-next-question" id="btn-next-question">
          <span>${this.currentIndex === total - 1 ? "Ver Resultados \u{1F3C6}" : "Siguiente Pregunta \u27A1\uFE0F"}</span>
        </button>
      </div>
    `;
      const buttons = cardEl.querySelectorAll(".btn-option");
      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const selectedIdx = parseInt(btn.dataset.optionIndex, 10);
          this.handleSelectOption(selectedIdx, buttons);
        });
      });
      const nextBtn = cardEl.querySelector("#btn-next-question");
      nextBtn.addEventListener("click", () => {
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
          btn.classList.add("correct");
        } else if (idx === selectedIdx && !isCorrect) {
          btn.classList.add("wrong");
        }
      });
      const feedbackBox = this.container.querySelector("#quiz-feedback");
      const feedbackIcon = this.container.querySelector("#feedback-icon");
      const feedbackText = this.container.querySelector("#feedback-text");
      if (isCorrect) {
        this.correctAnswersCount++;
        audio.playCorrect();
        feedbackIcon.textContent = "\u{1F389}";
        feedbackText.innerHTML = `<strong>\xA1Correcto!</strong> ${q.explicacion || ""}`;
        feedbackBox.className = "quiz-feedback-box correct-box";
      } else {
        audio.playWrong();
        feedbackIcon.textContent = "\u{1F4A1}";
        feedbackText.innerHTML = `<strong>\xA1Casi!</strong> ${q.explicacion || "Revisa la ficha de teor\xEDa para recordarlo."}`;
        feedbackBox.className = "quiz-feedback-box wrong-box";
      }
      feedbackBox.classList.remove("hidden");
    }
    showFinalResults() {
      audio.playVictory();
      const total = this.preguntas.length;
      const ratio = this.correctAnswersCount / total;
      let stars = 3;
      let message = "\xA1Incre\xEDble! Dominas perfectamente este bloque hist\xF3rico.";
      if (ratio < 0.6) {
        stars = 1;
        message = "\xA1Buen intento! Puedes volver a leer la ficha para sacar 3 estrellas.";
      } else if (ratio < 0.85) {
        stars = 2;
        message = "\xA1Muy bien! Tienes los conceptos muy claros. \xA1Sigue as\xED para las 3 estrellas!";
      }
      this.calculatedStars = stars;
      gameState.completarCasilla(this.tema.id, this.casillaData.id, stars);
      const modal = this.container.querySelector("#quiz-results-modal");
      this.container.querySelector("#quiz-final-score-text").textContent = `Has acertado ${this.correctAnswersCount} de ${total} preguntas`;
      this.container.querySelector("#quiz-stars").innerHTML = "\u2B50".repeat(stars) + "\u2606".repeat(3 - stars);
      this.container.querySelector("#quiz-congrats").textContent = message;
      modal.classList.remove("hidden");
    }
  };

  // src/games/memoryGame.js
  var MemoryGame = class {
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
            <span>\u2B05\uFE0F Circuito</span>
          </button>
          
          <div class="hud-center">
            <h2 class="game-title">${this.casillaData.titulo}</h2>
            <div class="hud-stats">
              <span class="stat-pill">\u23F3 <strong id="mem-timer">00:00</strong></span>
              <span class="stat-pill">\u{1F504} Intentos: <strong id="mem-moves">0</strong></span>
              <span class="stat-pill">\u{1F3AF} Parejas: <strong id="mem-pairs">0 / 7</strong></span>
            </div>
          </div>

          <button class="btn-hud btn-restart" id="btn-restart-game" title="Reiniciar partida">
            <span>\u{1F504} Reiniciar</span>
          </button>
        </header>

        <div class="memory-board-container">
          <div class="memory-grid" id="memory-grid">
            <!-- 14 cartas generadas din\xE1micamente -->
          </div>
        </div>

        <div class="modal-overlay hidden" id="memory-victory-modal">
          <div class="modal-card victory-card">
            <div class="victory-icon">\u{1F389}</div>
            <h2 class="victory-title">\xA1Misi\xF3n Cumplida!</h2>
            <p class="victory-subtitle">\xA1Has encontrado todas las parejas!</p>
            
            <div class="stars-awarded" id="victory-stars">
              <span class="star">\u2B50</span>
              <span class="star">\u2B50</span>
              <span class="star">\u2B50</span>
            </div>

            <div class="victory-details">
              <p>\u23F1\uFE0F Tiempo: <strong id="final-time">00:00</strong></p>
              <p>\u{1F3AF} Intentos: <strong id="final-moves">0</strong></p>
            </div>

            <div class="modal-actions">
              <button class="btn-primary btn-large" id="btn-next-step">
                <span>Continuar al siguiente reto \u{1F5FA}\uFE0F \u27A1\uFE0F</span>
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
      this.container.querySelector("#btn-exit-game").addEventListener("click", () => {
        audio.playClick();
        this.stopTimer();
        this.onExit();
      });
      this.container.querySelector("#btn-restart-game").addEventListener("click", () => {
        audio.playClick();
        this.startNewGame();
      });
      this.container.querySelector("#btn-next-step").addEventListener("click", () => {
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
      parejas.forEach((item) => {
        deck.push({
          id: item.id,
          tipo: "periodo",
          titulo: item.etiqueta,
          icono: item.icono,
          subtexto: "Etapa hist\xF3rica",
          color: item.color,
          isFlipped: false,
          isMatched: false
        });
        deck.push({
          id: item.id,
          tipo: "detalle",
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
      const grid = this.container.querySelector("#memory-grid");
      grid.innerHTML = "";
      this.cards.forEach((card, index) => {
        const cardEl = document.createElement("div");
        cardEl.className = "memory-card";
        cardEl.dataset.index = index;
        cardEl.innerHTML = `
        <div class="card-inner">
          <div class="card-front">
            <span class="card-back-pattern">\u23F3</span>
            <span class="card-back-hint">Toca para descubrir</span>
          </div>
          <div class="card-back" style="--card-accent: ${card.color};">
            <div class="card-icon">${card.icono}</div>
            <div class="card-text-title">${card.titulo}</div>
            <div class="card-text-sub">${card.subtexto}</div>
          </div>
        </div>
      `;
        cardEl.addEventListener("click", () => this.handleCardClick(index, cardEl));
        grid.appendChild(cardEl);
      });
    }
    handleCardClick(index, cardEl) {
      if (this.isLocked) return;
      const card = this.cards[index];
      if (card.isFlipped || card.isMatched) return;
      card.isFlipped = true;
      cardEl.classList.add("flipped");
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
          first.el.classList.add("matched");
          second.el.classList.add("matched");
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
          first.el.classList.add("shake");
          second.el.classList.add("shake");
          setTimeout(() => {
            first.card.isFlipped = false;
            second.card.isFlipped = false;
            first.el.classList.remove("flipped", "shake");
            second.el.classList.remove("flipped", "shake");
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
      const modal = this.container.querySelector("#memory-victory-modal");
      const starsContainer = this.container.querySelector("#victory-stars");
      starsContainer.innerHTML = "\u2B50".repeat(stars) + "\u2606".repeat(3 - stars);
      this.container.querySelector("#final-time").textContent = this.formatTime(this.timerSeconds);
      this.container.querySelector("#final-moves").textContent = this.moves;
      modal.classList.remove("hidden");
    }
    startTimer() {
      this.timerInterval = setInterval(() => {
        this.timerSeconds++;
        const timerEl = this.container.querySelector("#mem-timer");
        if (timerEl) {
          timerEl.textContent = this.formatTime(this.timerSeconds);
        }
      }, 1e3);
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
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    updateHUD() {
      const movesEl = this.container.querySelector("#mem-moves");
      const pairsEl = this.container.querySelector("#mem-pairs");
      if (movesEl) movesEl.textContent = this.moves;
      if (pairsEl) pairsEl.textContent = `${this.matchedPairsCount} / ${this.totalPairs}`;
    }
  };

  // src/games/puzzleGame.js
  var PuzzleGame = class {
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
          <text x="50" y="25" fill="#fde68a" font-family="sans-serif" font-size="18" font-weight="bold">\u{1F6F9} \xA1Altamira Skate!</text>
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
          \u{1F4F8} \xA1Altamira: Mamut con zapatillas y selfie cavern\xEDcola!
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
            <span>\u2B05\uFE0F Circuito</span>
          </button>
          
          <div class="hud-center">
            <h2 class="game-title">${this.casillaData.titulo}</h2>
            <div class="hud-stats">
              <span class="stat-pill">\u23F3 <strong id="puz-timer">00:00</strong></span>
              <span class="stat-pill">\u{1F504} Movimientos: <strong id="puz-moves">0</strong></span>
              <span class="stat-pill">\u{1F9E9} Encajadas: <strong id="puz-correct">0 / 6</strong></span>
            </div>
          </div>

          <div class="hud-actions">
            <button class="btn-hud btn-preview" id="btn-peek-image" title="Ver imagen completa">
              <span>\u{1F441}\uFE0F Ver Original</span>
            </button>
            <button class="btn-hud btn-restart" id="btn-restart-puzzle" title="Volver a mezclar">
              <span>\u{1F504} Barajar</span>
            </button>
          </div>
        </header>

        <div class="puzzle-main-stage">
          <div class="puzzle-board" id="puzzle-board">
            <!-- 6 piezas del puzzle -->
          </div>
        </div>

        <div class="puzzle-tip-bar">
          <span>\u{1F4A1} <strong>C\xF3mo jugar:</strong> Toca una pieza y luego otra para intercambiarlas de sitio.</span>
        </div>

        <!-- Modal Vista Previa -->
        <div class="modal-overlay hidden" id="puzzle-peek-modal">
          <div class="modal-card peek-card">
            <h3 class="peek-title">\xA1As\xED debe quedar el dibujo!</h3>
            <div class="peek-image-container" id="peek-image-container">
              ${this.getOriginalImageHtml()}
            </div>
            <button class="btn-primary" id="btn-close-peek">
              <span>\xA1Entendido, a jugar! \u{1F3AE}</span>
            </button>
          </div>
        </div>

        <!-- Modal Victoria del Puzzle -->
        <div class="modal-overlay hidden" id="puzzle-victory-modal">
          <div class="modal-card victory-card">
            <div class="victory-icon">\u{1F389}\u{1F9E9}</div>
            <h2 class="victory-title">\xA1PUZZLE COMPLETADO!</h2>
            <p class="victory-subtitle">\xA1Lo has resuelto fenomenal!</p>
            
            <div class="stars-awarded" id="puzzle-stars">
              <span class="star">\u2B50</span>
              <span class="star">\u2B50</span>
              <span class="star">\u2B50</span>
            </div>

            <div class="victory-details">
              <p>\u23F1\uFE0F Tiempo: <strong id="puz-final-time">00:00</strong></p>
              <p>\u{1F3AF} Movimientos: <strong id="puz-final-moves">0</strong></p>
            </div>

            <div class="modal-actions">
              <button class="btn-primary btn-large" id="btn-puzzle-next">
                <span>Continuar al siguiente reto \u{1F5FA}\uFE0F \u27A1\uFE0F</span>
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
      const peekContainer = this.container.querySelector("#peek-image-container");
      if (peekContainer) {
        peekContainer.innerHTML = this.getOriginalImageHtml();
      }
    }
    bindEvents() {
      this.container.querySelector("#btn-puzzle-exit").addEventListener("click", () => {
        audio.playClick();
        this.stopTimer();
        this.onExit();
      });
      this.container.querySelector("#btn-restart-puzzle").addEventListener("click", () => {
        audio.playClick();
        this.startNewPuzzle();
      });
      const peekModal = this.container.querySelector("#puzzle-peek-modal");
      this.container.querySelector("#btn-peek-image").addEventListener("click", () => {
        audio.playClick();
        this.updatePeekModalContent();
        peekModal.classList.remove("hidden");
      });
      this.container.querySelector("#btn-close-peek").addEventListener("click", () => {
        audio.playClick();
        peekModal.classList.add("hidden");
      });
      this.container.querySelector("#btn-puzzle-next").addEventListener("click", () => {
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
      const boardEl = this.container.querySelector("#puzzle-board");
      if (boardEl) {
        boardEl.classList.remove("puzzle-completed-reveal");
        const oldBanner = boardEl.querySelector(".puzzle-solved-banner");
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
      const boardEl = this.container.querySelector("#puzzle-board");
      if (!boardEl) return;
      boardEl.innerHTML = "";
      for (let cellIndex = 0; cellIndex < this.totalPieces; cellIndex++) {
        const pieceId = this.board[cellIndex];
        const isCorrect = pieceId === cellIndex;
        const pieceEl = document.createElement("div");
        pieceEl.className = `puzzle-piece-cell ${isCorrect ? "is-correct" : ""}`;
        pieceEl.dataset.cellIndex = cellIndex;
        const origCol = pieceId % this.cols;
        const origRow = Math.floor(pieceId / this.cols);
        if (this.useCustomImage) {
          const bgX = origCol / (this.cols - 1) * 100;
          const bgY = origRow / (this.rows - 1) * 100;
          pieceEl.innerHTML = `
          <div class="piece-clipper custom-img-piece" style="
            background-image: url('${this.imageSrc}');
            background-size: 300% 200%;
            background-position: ${bgX}% ${bgY}%;
          ">
            ${isCorrect && !this.isVictory ? '<span class="piece-snap-check">\u2713</span>' : ""}
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
            ${isCorrect && !this.isVictory ? '<span class="piece-snap-check">\u2713</span>' : ""}
          </div>
        `;
        }
        pieceEl.addEventListener("click", () => this.handleCellClick(cellIndex));
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
      const cells = this.container.querySelectorAll(".puzzle-piece-cell");
      cells.forEach((el, idx) => {
        if (idx === cellIndex && isActive) {
          el.classList.add("selected-piece");
        } else {
          el.classList.remove("selected-piece");
        }
      });
    }
    handleVictory() {
      this.isVictory = true;
      this.stopTimer();
      const boardEl = this.container.querySelector("#puzzle-board");
      if (boardEl) {
        boardEl.classList.add("puzzle-completed-reveal");
        const banner = document.createElement("div");
        banner.className = "puzzle-solved-banner";
        banner.innerHTML = "<span>\u2728 \xA1PUZZLE RESUELTO! \u2728</span>";
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
      const modal = this.container.querySelector("#puzzle-victory-modal");
      if (!modal) return;
      this.container.querySelector("#puzzle-stars").innerHTML = "\u2B50".repeat(this.calculatedStars) + "\u2606".repeat(3 - this.calculatedStars);
      this.container.querySelector("#puz-final-time").textContent = this.formatTime(this.timerSeconds);
      this.container.querySelector("#puz-final-moves").textContent = this.moves;
      modal.classList.remove("hidden");
    }
    startTimer() {
      this.timerInterval = setInterval(() => {
        this.timerSeconds++;
        const timerEl = this.container.querySelector("#puz-timer");
        if (timerEl) {
          timerEl.textContent = this.formatTime(this.timerSeconds);
        }
      }, 1e3);
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
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    updateHUD() {
      const movesEl = this.container.querySelector("#puz-moves");
      const correctEl = this.container.querySelector("#puz-correct");
      if (movesEl) movesEl.textContent = this.moves;
      if (correctEl) correctEl.textContent = `${this.countCorrectPieces()} / ${this.totalPieces}`;
    }
  };

  // src/games/timelineGame.js
  var TimelineGame = class {
    constructor(tema, casillaData, onComplete, onExit) {
      this.tema = tema;
      this.casillaData = casillaData;
      this.onComplete = onComplete;
      this.onExit = onExit;
      this.eventos = Array.isArray(casillaData.eventos) ? casillaData.eventos : [];
      this.total = this.eventos.length;
      this.board = [];
      this.selected = null;
      this.moves = 0;
      this.checks = 0;
      this.timerSeconds = 0;
      this.timerInterval = null;
      this.messageTimeout = null;
      this.isVictory = false;
      this.showDates = casillaData.mostrar_fechas !== false;
    }
    render(container) {
      if (this.total < 2) {
        container.innerHTML = `
        <div class="game-wrapper timeline-wrapper">
          <header class="game-hud">
            <button class="btn-hud btn-back" id="btn-timeline-exit"><span>\u2B05\uFE0F Circuito</span></button>
            <div class="hud-center"><h2 class="game-title">${this.casillaData.titulo}</h2></div>
            <span></span>
          </header>
          <div class="timeline-empty">
            <p>\u{1F570}\uFE0F Este juego necesita al menos dos acontecimientos en <code>eventos</code>.</p>
          </div>
        </div>
      `;
        container.querySelector("#btn-timeline-exit").addEventListener("click", () => {
          audio.playClick();
          this.onExit();
        });
        return;
      }
      this.container = container;
      this.container.innerHTML = `
      <div class="game-wrapper timeline-wrapper">
        <header class="game-hud">
          <button class="btn-hud btn-back" id="btn-timeline-exit" title="Volver al circuito">
            <span>\u2B05\uFE0F Circuito</span>
          </button>

          <div class="hud-center">
            <h2 class="game-title">${this.casillaData.titulo}</h2>
            <div class="hud-stats">
              <span class="stat-pill">\u23F3 <strong id="tl-timer">00:00</strong></span>
              <span class="stat-pill">\u{1F504} Cambios: <strong id="tl-moves">0</strong></span>
              <span class="stat-pill" title="Comprobaciones realizadas">\u2705 Comprob.: <strong id="tl-checks">0</strong></span>
            </div>
          </div>

          <div class="hud-actions">
            <button class="btn-hud btn-dates" id="btn-timeline-dates" title="Mostrar u ocultar las fechas">
              <span id="tl-dates-label">\u{1F648} Ocultar fechas</span>
            </button>
            <button class="btn-hud btn-restart" id="btn-timeline-restart" title="Volver a mezclar">
              <span>\u{1F504} Reiniciar</span>
            </button>
          </div>
        </header>

        <div class="timeline-stage">
          <p class="timeline-instructions">
            \u{1F9ED} Ordena los acontecimientos del <strong>m\xE1s antiguo</strong> al <strong>m\xE1s reciente</strong>.
            Toca dos tarjetas para cambiarlas de sitio. Si no caben todas, desliza la l\xEDnea.
          </p>

          <div class="timeline-track" id="timeline-track" role="list" aria-label="L\xEDnea del tiempo desordenada">
            <!-- Tarjetas generadas din\xE1micamente -->
          </div>

          <div class="timeline-actions">
            <span class="timeline-status" id="timeline-status" aria-live="polite">
              ${this.total} acontecimientos por ordenar.
            </span>
            <button class="btn-primary btn-large" id="btn-timeline-check">
              <span>Comprobar orden \u2705</span>
            </button>
          </div>
        </div>

        <div class="modal-overlay hidden" id="timeline-victory-modal">
          <div class="modal-card victory-card">
            <div class="victory-icon">\u{1F389}\u{1F570}\uFE0F</div>
            <h2 class="victory-title">\xA1L\xCDNEA DEL TIEMPO COMPLETADA!</h2>
            <p class="victory-subtitle">Has ordenado los acontecimientos como un verdadero historiador.</p>

            <div class="stars-awarded" id="timeline-stars">
              <span class="star">\u2B50</span>
              <span class="star">\u2B50</span>
              <span class="star">\u2B50</span>
            </div>

            <div class="victory-details">
              <p>\u23F1\uFE0F Tiempo: <strong id="tl-final-time">00:00</strong></p>
              <p>\u{1F504} Cambios: <strong id="tl-final-moves">0</strong></p>
              <p>\u2705 Comprobaciones: <strong id="tl-final-checks">0</strong></p>
            </div>

            <div class="modal-actions">
              <button class="btn-primary btn-large" id="btn-timeline-next">
                <span>Continuar \u27A1\uFE0F</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
      this.bindEvents();
      this.updateDatesButton();
      this.startNewGame();
    }
    bindEvents() {
      this.container.querySelector("#btn-timeline-exit").addEventListener("click", () => {
        audio.playClick();
        this.stopTimer();
        this.onExit();
      });
      this.container.querySelector("#btn-timeline-restart").addEventListener("click", () => {
        audio.playClick();
        this.startNewGame();
      });
      this.container.querySelector("#btn-timeline-dates").addEventListener("click", () => {
        audio.playClick();
        this.showDates = !this.showDates;
        this.updateDatesButton();
        this.renderBoard();
      });
      this.container.querySelector("#btn-timeline-check").addEventListener("click", () => {
        audio.playClick();
        this.checkOrder();
      });
      this.container.querySelector("#btn-timeline-next").addEventListener("click", () => {
        audio.playClick();
        this.onComplete(this.calculatedStars);
      });
    }
    updateDatesButton() {
      const label = this.container.querySelector("#tl-dates-label");
      if (label) {
        label.textContent = this.showDates ? "\u{1F648} Ocultar fechas" : "\u{1F441}\uFE0F Mostrar fechas";
      }
    }
    startNewGame() {
      this.stopTimer();
      this.timerSeconds = 0;
      this.moves = 0;
      this.checks = 0;
      this.selected = null;
      this.isVictory = false;
      this.board = this.generateBoard();
      this.updateHUD();
      this.setStatus(`${this.total} acontecimientos por ordenar.`);
      this.renderBoard();
      this.startTimer();
    }
    generateBoard() {
      const indices = this.eventos.map((_, index) => index);
      if (indices.length < 2) return indices;
      let shuffled = indices;
      let intentos = 0;
      do {
        shuffled = indices.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        intentos++;
      } while (this.isInOrder(shuffled) && intentos < 20);
      return shuffled;
    }
    isInOrder(board) {
      return board.every((eventoIndex, position) => eventoIndex === position);
    }
    renderBoard() {
      const track = this.container.querySelector("#timeline-track");
      if (!track) return;
      track.innerHTML = this.board.map((eventoIndex, position) => {
        const evento = this.eventos[eventoIndex] || {};
        const isSelected = this.selected === position;
        const dateContent = this.showDates ? `<span class="timeline-card-date">${evento.fecha || ""}</span>` : `<span class="timeline-card-date timeline-date-hidden">\xBFCu\xE1ndo fue?</span>`;
        return `
        <div class="timeline-slot" role="listitem">
          <button type="button"
                  class="timeline-card ${isSelected ? "selected" : ""}"
                  data-position="${position}"
                  style="--event-color: ${evento.color || "#3b82f6"};"
                  aria-pressed="${isSelected}"
                  aria-label="${evento.etiqueta || "Acontecimiento"}${this.showDates && evento.fecha ? `, ${evento.fecha}` : ""}">
            <span class="timeline-card-position">${position + 1}</span>
            <span class="timeline-card-icon">${evento.icono || "\u{1F4CC}"}</span>
            <span class="timeline-card-label">${evento.etiqueta || ""}</span>
            ${dateContent}
          </button>
          ${position < this.total - 1 ? '<span class="timeline-arrow" aria-hidden="true">\u279C</span>' : ""}
        </div>
      `;
      }).join("");
      track.querySelectorAll(".timeline-card").forEach((card) => {
        card.addEventListener("click", () => {
          this.handleCardClick(Number(card.dataset.position));
        });
      });
    }
    handleCardClick(position) {
      if (this.isVictory) return;
      if (this.selected === null) {
        this.selected = position;
        audio.playClick();
        this.renderBoard();
        return;
      }
      if (this.selected === position) {
        this.selected = null;
        audio.playClick();
        this.renderBoard();
        return;
      }
      const first = this.selected;
      [this.board[first], this.board[position]] = [this.board[position], this.board[first]];
      this.moves++;
      this.selected = null;
      audio.playSnap();
      this.updateHUD();
      this.setStatus('Pulsa "Comprobar orden" cuando creas que ya est\xE1n colocados.');
      this.renderBoard();
    }
    checkOrder() {
      if (this.isVictory) return;
      this.checks++;
      this.updateHUD();
      this.selected = null;
      this.renderBoard();
      const incorrectPositions = [];
      this.board.forEach((eventoIndex, position) => {
        if (eventoIndex !== position) incorrectPositions.push(position);
      });
      if (incorrectPositions.length === 0) {
        this.handleVictory();
        return;
      }
      audio.playWrong();
      const correct = this.total - incorrectPositions.length;
      this.setStatus(`\u2705 ${correct} en su sitio \xB7 \u274C ${incorrectPositions.length} fuera de lugar. \xA1Sigue as\xED!`);
      const cards = this.container.querySelectorAll(".timeline-card");
      incorrectPositions.forEach((position) => {
        const card = cards[position];
        if (!card) return;
        card.classList.add("timeline-wrong");
        setTimeout(() => card.classList.remove("timeline-wrong"), 900);
      });
    }
    setStatus(text) {
      const status = this.container.querySelector("#timeline-status");
      if (!status) return;
      status.textContent = text;
      if (this.messageTimeout) clearTimeout(this.messageTimeout);
      this.messageTimeout = setTimeout(() => {
        if (!this.isVictory) {
          status.textContent = `${this.total} acontecimientos \xB7 ${this.moves} cambios realizados.`;
        }
      }, 4e3);
    }
    handleVictory() {
      this.isVictory = true;
      this.stopTimer();
      audio.playVictory();
      let stars = 3;
      const esfuerzo = this.moves + this.checks;
      if (esfuerzo > this.total + 4) {
        stars = 1;
      } else if (esfuerzo > this.total + 1) {
        stars = 2;
      }
      this.calculatedStars = stars;
      gameState.completarCasilla(this.tema.id, this.casillaData.id, stars);
      const modal = this.container.querySelector("#timeline-victory-modal");
      const starsContainer = this.container.querySelector("#timeline-stars");
      starsContainer.innerHTML = "\u2B50".repeat(stars) + "\u2606".repeat(3 - stars);
      this.container.querySelector("#tl-final-time").textContent = this.formatTime(this.timerSeconds);
      this.container.querySelector("#tl-final-moves").textContent = this.moves;
      this.container.querySelector("#tl-final-checks").textContent = this.checks;
      modal.classList.remove("hidden");
    }
    startTimer() {
      this.timerInterval = setInterval(() => {
        this.timerSeconds++;
        const timerEl = this.container.querySelector("#tl-timer");
        if (timerEl) timerEl.textContent = this.formatTime(this.timerSeconds);
      }, 1e3);
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
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    updateHUD() {
      const movesEl = this.container.querySelector("#tl-moves");
      const checksEl = this.container.querySelector("#tl-checks");
      if (movesEl) movesEl.textContent = this.moves;
      if (checksEl) checksEl.textContent = this.checks;
    }
    cleanup() {
      this.stopTimer();
      if (this.messageTimeout) {
        clearTimeout(this.messageTimeout);
        this.messageTimeout = null;
      }
    }
  };

  // src/app.js
  var GAME_REGISTRY = {
    parejas: MemoryGame,
    puzzle: PuzzleGame,
    linea_tiempo: TimelineGame
  };
  var TYPE_REGISTRY = {
    teoria: TheoryView,
    quiz: QuizView
  };
  var App = class {
    constructor() {
      this.root = document.getElementById("app-root");
      this.catalogo = null;
      this.currentCapitulo = null;
      this.currentViewInstance = null;
    }
    async init() {
      console.log("Iniciando Aventura Educativa...");
      speechManager.init();
      const unlockAudio = () => {
        audio.init();
        window.removeEventListener("pointerdown", unlockAudio);
        window.removeEventListener("keydown", unlockAudio);
      };
      window.addEventListener("pointerdown", unlockAudio);
      window.addEventListener("keydown", unlockAudio);
      this.catalogo = await DataLoader.loadCatalogo();
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
        () => this.showMenu()
        // Volver al menú de capítulos
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
      const ViewClass = casillaData.tipo === "minijuego" ? GAME_REGISTRY[casillaData.subtipo] : TYPE_REGISTRY[casillaData.tipo];
      if (!ViewClass) {
        console.warn("Tipo o subtipo de casilla no registrado:", casillaData.tipo, casillaData.subtipo);
        this.showMap();
        return;
      }
      this.currentViewInstance = new ViewClass(this.currentCapitulo, casillaData, onStepComplete, onExit);
      this.currentViewInstance.render(this.root);
    }
    cleanupCurrentView() {
      if (this.currentViewInstance && typeof this.currentViewInstance.cleanup === "function") {
        this.currentViewInstance.cleanup();
      }
      this.root.innerHTML = "";
    }
  };
  document.addEventListener("DOMContentLoaded", () => {
    const app = new App();
    app.init();
  });
})();
