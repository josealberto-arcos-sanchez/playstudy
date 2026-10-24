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

  /* ========================================================================
     Preferencia de voz y configuración de narración
     ======================================================================== */
  class SpeechManager {
    constructor() {
      this.storageKey = 'playstudy_voice_settings_v1';
      this.preference = this.loadPreference();
      this.voices = [];
      this.listeners = new Set();
      this.initialized = false;
      this.speech = null;
    }

    loadPreference() {
      try {
        const saved = JSON.parse(localStorage.getItem(this.storageKey) || 'null');
        const savedRate = typeof saved?.rate === 'number' ? saved.rate :
          (typeof saved?.rate === 'string' && saved.rate.trim() ? Number(saved.rate) : NaN);
        const rate = Number.isFinite(savedRate) ? Math.min(1.3, Math.max(0.7, savedRate)) : 0.94;
        if (saved?.version === 1 && saved.mode === 'selected' && saved.voice?.name && saved.voice?.lang) {
          return { version: 1, mode: 'selected', rate, voice: {
            voiceURI: String(saved.voice.voiceURI || ''), name: String(saved.voice.name), lang: String(saved.voice.lang)
          } };
        }
        if (saved?.version === 1 && saved.mode === 'auto') return { version: 1, mode: 'auto', voice: null, rate };
      } catch (error) {
        console.warn('No se pudo cargar la preferencia de voz:', error);
      }
      return { version: 1, mode: 'auto', voice: null, rate: 0.94 };
    }

    init() {
      if (this.initialized) return this.getVoices();
      this.initialized = true;
      if (!('speechSynthesis' in window)) return [];
      this.speech = window.speechSynthesis;
      this.voicesChangedHandler = () => this.refreshVoices();
      if (typeof this.speech.addEventListener === 'function') {
        this.speech.addEventListener('voiceschanged', this.voicesChangedHandler);
      } else {
        this.speech.onvoiceschanged = this.voicesChangedHandler;
      }
      return this.refreshVoices();
    }

    refreshVoices() {
      try { this.voices = this.speech ? this.speech.getVoices() : []; }
      catch (error) { this.voices = []; }
      this.listeners.forEach(listener => listener(this.voices.slice()));
      return this.voices.slice();
    }

    getVoices() {
      if (!this.initialized) this.init();
      if (this.speech) {
        try { this.voices = this.speech.getVoices(); }
        catch (error) { this.voices = []; }
      }
      return this.voices.slice();
    }

    subscribe(listener) {
      this.init();
      this.listeners.add(listener);
      listener(this.getVoices());
      return () => this.listeners.delete(listener);
    }

    waitForVoices(timeoutMs = 1000) {
      this.init();
      const voices = this.getVoices();
      if (voices.length || !this.speech) return Promise.resolve(voices);
      return new Promise(resolve => {
        let settled = false;
        const finish = () => {
          if (settled) return;
          settled = true;
          clearTimeout(timeout);
          this.listeners.delete(onChange);
          resolve(this.getVoices());
        };
        const onChange = next => { if (next.length) finish(); };
        const timeout = setTimeout(finish, timeoutMs);
        this.listeners.add(onChange);
      });
    }

    getPreference() {
      return this.preference.mode === 'selected'
        ? { version: 1, mode: 'selected', rate: this.preference.rate, voice: { ...this.preference.voice } }
        : { version: 1, mode: 'auto', voice: null, rate: this.preference.rate };
    }

    savePreference(preference) {
      const next = preference?.mode === 'selected' && preference.voice
        ? { version: 1, mode: 'selected', rate: this.normalizeRate(preference.rate), voice: {
            voiceURI: String(preference.voice.voiceURI || ''),
            name: String(preference.voice.name || ''),
            lang: String(preference.voice.lang || '')
          } }
        : { version: 1, mode: 'auto', voice: null, rate: this.normalizeRate(preference?.rate) };
      if (next.mode === 'selected' && (!next.voice.name || !next.voice.lang)) return false;
      this.preference = next;
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(next));
        return true;
      } catch (error) {
        console.warn('No se pudo guardar la preferencia de voz:', error);
        return false;
      }
    }

    normalizeRate(value) {
      const rate = typeof value === 'number' ? value :
        (typeof value === 'string' && value.trim() ? Number(value) : NaN);
      return Number.isFinite(rate) ? Math.min(1.3, Math.max(0.7, rate)) : 0.94;
    }

    chooseAutomaticVoice(voices = this.getVoices()) {
      const spanish = voices.filter(voice => /^es(?:-|$)/i.test(voice.lang || ''));
      const naturalTerms = /natural|neural|online|premium/i;
      const offline = navigator.onLine === false;
      return spanish.sort((a, b) => {
        const score = voice => (voice.lang?.toLowerCase() === 'es-es' ? 1000 : 700) +
          (naturalTerms.test(voice.name || '') ? 150 : /google|microsoft/i.test(voice.name || '') ? 60 : 0) +
          (offline && voice.localService ? 200 : 0);
        return score(b) - score(a) || (a.name || '').localeCompare(b.name || '');
      })[0] || null;
    }

    resolveVoice(preference = this.preference, voices = this.getVoices(), { fallback = true, preferLocal = false } = {}) {
      if (preferLocal) {
        const localSpanish = voices.filter(voice => /^es(?:-|$)/i.test(voice.lang || '') && voice.localService);
        return this.chooseAutomaticVoice(localSpanish);
      }
      if (preference?.mode !== 'selected') return this.chooseAutomaticVoice(voices);
      const descriptor = preference.voice || {};
      const preferred = voices.find(voice => descriptor.voiceURI && voice.voiceURI === descriptor.voiceURI &&
        (!descriptor.lang || voice.lang === descriptor.lang)) ||
        voices.find(voice => voice.name === descriptor.name && voice.lang === descriptor.lang);
      const offline = navigator.onLine === false;
      if (preferred && (!offline || preferred.localService !== false)) return preferred;
      if (!fallback) return null;
      if (offline) {
        const localSpanish = voices.filter(voice => /^es(?:-|$)/i.test(voice.lang || '') && voice.localService);
        return localSpanish.length ? this.chooseAutomaticVoice(localSpanish) : null;
      }
      return this.chooseAutomaticVoice(voices);
    }

    createUtterance(text, preference = this.preference, { fallback = true, preferLocal = false } = {}) {
      if (typeof SpeechSynthesisUtterance === 'undefined') return null;
      const voice = this.resolveVoice(preference, this.getVoices(), { fallback, preferLocal });
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = voice?.lang || preference?.voice?.lang || 'es-ES';
      utterance.rate = this.normalizeRate(preference?.rate ?? this.preference.rate);
      utterance.pitch = 1.03;
      if (voice) utterance.voice = voice;
      return { utterance, voice };
    }
  }

  const speechManager = new SpeechManager();

  /* ==========================================================================
     1.b TUTOR CON IA — CLAVE DE API PROPIA (localStorage)
     ========================================================================== */
  const AI_CONFIG_KEY = 'playstudy_ai_tutor_v1';
  const AI_MAX_QUESTION_LENGTH = 400;
  const AI_MAX_CONTEXT_LENGTH = 9000;
  const AI_TIMEOUT_MS = 120000;
  const AI_PROVIDERS = {
    gemini: { id: 'gemini', label: 'Google Gemini', defaultModel: 'gemini-3.8-flash', modelExample: 'gemini-3.8-flash', keyPlaceholder: 'AIza...', keysUrl: 'https://aistudio.google.com/app/apikey' },
    anthropic: { id: 'anthropic', label: 'Anthropic (Claude)', defaultModel: 'claude-haiku-4-5', modelExample: 'claude-haiku-4-5', keyPlaceholder: 'sk-ant-...', keysUrl: 'https://console.anthropic.com/settings/keys' },
    openrouter: { id: 'openrouter', label: 'OpenRouter (muchos modelos)', defaultModel: 'google/gemini-2.5-flash', modelExample: 'google/gemini-2.5-flash', keyPlaceholder: 'sk-or-...', keysUrl: 'https://openrouter.ai/keys' }
  };
  const AI_SYSTEM_PROMPT = [
    'Eres "Profe", un tutor amable que ayuda a un niño de 10 años a entender la teoría de un videojuego educativo y a satisfacer su curiosidad.',
    'Reglas:',
    '- La TEORÍA es tu punto de partida y la base de la respuesta.',
    '- Si la pregunta está relacionada con la teoría, respóndela aunque el dato no aparezca literalmente. Puedes ampliar con conocimientos generales adecuados para un niño de 10 años.',
    '- Si la pregunta no tiene relación con la teoría o con el tema del capítulo, redirige amablemente al contenido de la diapositiva.',
    '- No inventes fechas, nombres ni datos. Si no estás seguro, dilo con naturalidad.',
    '- Usa español de España, frases cortas y palabras sencillas.',
    '- Responde en 2 o 4 frases y como máximo 100 palabras.',
    '- No pidas datos personales, no te vayas a temas que no tengan relación con la teoría y no incluyas enlaces.',
    '- Fomenta la curiosidad: si viene al caso, puedes terminar con una pregunta breve que invite a seguir aprendiendo.'
  ].join('\n');

  function aiFriendlyHttpError(status) {
    if (status === 400) return 'El proveedor ha rechazado la solicitud. Revisa el modelo elegido en Configuración.';
    if (status === 401 || status === 403) return 'La clave de API no es válida o no tiene permiso. Revísala en Configuración.';
    if (status === 404) return 'El modelo elegido no existe o no está disponible. Cambia el modelo en Configuración.';
    if (status === 429) return 'Se ha alcanzado el límite de uso o no hay saldo en la cuenta del proveedor. Inténtalo más tarde.';
    if (status >= 500) return 'El servicio del proveedor no está disponible ahora mismo. Inténtalo dentro de un rato.';
    return 'No se ha podido obtener la respuesta del proveedor.';
  }

  async function aiHttpErrorFromResponse(response) {
    let detail = '';
    try { detail = (await response.text()).slice(0, 2000).toLowerCase(); }
    catch (error) { detail = ''; }
    console.warn('[Tutor IA] Error HTTP del proveedor:', response.status, detail.slice(0, 300));
    const keyProblem = /api[ _-]?key|api_key_invalid|invalid.*key|unauthorized|permission/.test(detail);
    if (keyProblem || response.status === 401 || response.status === 403) {
      return 'La clave de API no es válida o no tiene permiso. Revísala en Configuración.';
    }
    return aiFriendlyHttpError(response.status);
  }

  function aiNormalizeConfig(raw) {
    const config = raw && typeof raw === 'object' ? raw : {};
    return {
      version: 1,
      provider: AI_PROVIDERS[config.provider] ? config.provider : 'gemini',
      keys: config.keys && typeof config.keys === 'object' ? config.keys : {},
      models: config.models && typeof config.models === 'object' ? config.models : {}
    };
  }

  class AiTutor {
    load() {
      try { return aiNormalizeConfig(JSON.parse(localStorage.getItem(AI_CONFIG_KEY) || 'null')); }
      catch (error) { return aiNormalizeConfig(null); }
    }

    save(config) {
      try {
        localStorage.setItem(AI_CONFIG_KEY, JSON.stringify(aiNormalizeConfig(config)));
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
      const apiKey = String(config.keys[providerId] || '').trim();
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
      const nextProvider = AI_PROVIDERS[provider] ? provider : 'gemini';
      const config = this.load();
      config.provider = nextProvider;
      const cleanModel = this.normalizeModelId(nextProvider, model);
      if (cleanModel) config.models[nextProvider] = cleanModel;
      else delete config.models[nextProvider];
      const cleanKey = String(apiKey || '').trim();
      if (cleanKey) config.keys[nextProvider] = cleanKey;
      return this.save(config);
    }

    normalizeModelId(providerId, model) {
      let value = String(model || '').trim().toLowerCase().replace(/^models\//, '').replace(/\s+/g, '-');
      if (providerId === 'gemini' && value && !value.startsWith('gemini-') && !value.includes('/')) {
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
      if (!key) return '';
      return `••••••${key.slice(-4)}`;
    }

    hasKey() {
      return this.getSettings().hasKey;
    }

    async ask({ question, theoryContext, currentSlide, signal }) {
      const cleanQuestion = String(question || '').trim().slice(0, AI_MAX_QUESTION_LENGTH);
      if (!cleanQuestion) throw new Error('Escribe una pregunta.');
      const config = this.load();
      const providerId = config.provider;
      const apiKey = String(config.keys[providerId] || '').trim();
      if (!apiKey) throw new Error('No hay ninguna clave de API guardada. Pide a un adulto que la configure en ⚙️ Configuración.');
      const provider = this.getProvider(providerId);
      const model = this.normalizeModelId(providerId, config.models[providerId] || provider.defaultModel);
      const context = String(theoryContext || '').slice(0, AI_MAX_CONTEXT_LENGTH);
      const current = currentSlide ? `Diapositiva que está viendo ahora: ${currentSlide}.\n\n` : '';
      const user = `${current}TEORÍA DEL CAPÍTULO:\n${context}\n\nPREGUNTA DEL NIÑO:\n${cleanQuestion}`;

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);
      const onAbort = () => controller.abort();
      if (signal) signal.addEventListener('abort', onAbort);
      console.info('[Tutor IA] Petición a', providerId, model);
      try {
        const answer = await this.request(providerId, { apiKey, model, system: AI_SYSTEM_PROMPT, user, signal: controller.signal });
        if (!answer.trim()) throw new Error('El proveedor ha devuelto una respuesta vacía. Prueba a preguntar de otra forma.');
        return answer.trim();
      } catch (error) {
        if (error.name === 'AbortError') {
          if (signal?.aborted) throw new Error('Solicitud cancelada.');
          console.warn('[Tutor IA] Tiempo de espera agotado:', providerId, model, AI_TIMEOUT_MS);
          throw new Error(providerId === 'gemini'
            ? 'La respuesta ha tardado más de 2 minutos. Gemini 3.8 Flash está teniendo mucha latencia estos días: prueba el modelo gemini-3.6-flash o inténtalo más tarde.'
            : 'La respuesta ha tardado más de 2 minutos. Inténtalo de nuevo o cambia de modelo en Configuración.');
        }
        if (error instanceof TypeError) throw new Error('No se ha podido conectar con el proveedor. Comprueba tu conexión a Internet.');
        throw error;
      } finally {
        clearTimeout(timer);
        if (signal) signal.removeEventListener('abort', onAbort);
      }
    }

    request(providerId, options) {
      if (providerId === 'gemini') return this.requestGemini(options);
      if (providerId === 'anthropic') return this.requestAnthropic(options);
      return this.requestOpenRouter(options);
    }

    async requestOpenRouter({ apiKey, model, system, user, signal }) {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        signal,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': location.origin,
          'X-Title': 'PlayStudy'
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
          temperature: 0.4,
          max_tokens: 400
        })
      });
      if (!response.ok) throw new Error(await aiHttpErrorFromResponse(response));
      const data = await response.json();
      return data?.choices?.[0]?.message?.content || '';
    }

    async requestGemini({ apiKey, model, system, user, signal }) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
      const generationConfig = { temperature: 0.4, maxOutputTokens: 2048 };
      if (/^gemini-2\.5-.*flash/i.test(model)) {
        generationConfig.thinkingConfig = { thinkingBudget: 0 };
      } else if (/^gemini-3(?:\.\d+)?/i.test(model)) {
        generationConfig.thinkingConfig = { thinkingLevel: 'low' };
      }
      const response = await fetch(url, {
        method: 'POST',
        signal,
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [{ role: 'user', parts: [{ text: user }] }],
          generationConfig
        })
      });
      if (!response.ok) throw new Error(await aiHttpErrorFromResponse(response));
      const data = await response.json();
      if (data?.promptFeedback?.blockReason) throw new Error('El proveedor ha bloqueado la respuesta. Prueba a preguntar de otra forma.');
      const candidate = data?.candidates?.[0];
      const answer = (candidate?.content?.parts || []).map(part => part.thought ? '' : (part.text || '')).join('');
      if (!answer.trim() && candidate?.finishReason) {
        console.warn('[Tutor IA] Gemini no devolvió texto. finishReason:', candidate.finishReason, data);
      }
      return answer;
    }

    async requestAnthropic({ apiKey, model, system, user, signal }) {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        signal,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model,
          max_tokens: 400,
          temperature: 0.4,
          system,
          messages: [{ role: 'user', content: user }]
        })
      });
      if (!response.ok) throw new Error(await aiHttpErrorFromResponse(response));
      const data = await response.json();
      return (Array.isArray(data?.content) ? data.content : []).filter(block => block.type === 'text').map(block => block.text || '').join('');
    }
    async testConnection() {
      return this.ask({
        question: '¿Qué dice la teoría de prueba?',
        theoryContext: 'La teoría de prueba dice: OK.',
        currentSlide: 'Prueba de conexión'
      });
    }
  }

  const aiTutor = new AiTutor();

  class SettingsView {
    constructor() {
      this.preference = speechManager.getPreference();
      this.mode = this.preference.mode;
      this.selectedVoice = this.preference.voice;
      this.rate = this.preference.rate ?? 0.94;
      this.showAllVoices = false;
      this.visibleVoices = [];
      this.testUtterance = null;
      this.unsubscribeVoices = null;
      this.isOpen = false;
      this.aiSettings = aiTutor.getSettings();
      this.aiKeyVisible = false;
    }

    render(returnFocus) {
      if (this.isOpen) return;
      this.isOpen = true;
      this.returnFocus = returnFocus || document.activeElement;
      this.backdrop = document.createElement('div');
      this.backdrop.className = 'voice-settings-backdrop';
      this.backdrop.innerHTML = `
        <section class="voice-settings-dialog" role="dialog" aria-modal="true" aria-labelledby="voice-settings-title" tabindex="-1">
          <header class="voice-settings-header"><div><span class="voice-settings-icon" aria-hidden="true">⚙️</span><h2 id="voice-settings-title">Configuración</h2></div><button class="btn-icon voice-settings-close" type="button" aria-label="Cerrar configuración">✕</button></header>
          <p class="voice-settings-intro">Elige la voz de las explicaciones y, si quieres, activa el tutor con IA para preguntar dudas.</p>
          <h3 class="settings-section-title">🗣️ Voz de las explicaciones</h3>
          <label class="voice-settings-label" for="voice-settings-select">Voz</label>
          <select id="voice-settings-select" class="voice-settings-select"></select>
          <label class="voice-settings-show-all"><input id="voice-settings-all" type="checkbox"> Mostrar voces de otros idiomas</label>
          <p class="voice-settings-meta" id="voice-settings-meta"></p>
          <div class="voice-settings-rate-control"><label class="voice-settings-label" for="voice-settings-rate">Velocidad de la voz <output id="voice-settings-rate-value"></output></label><div class="voice-settings-rate-row"><span>Más despacio</span><input id="voice-settings-rate" type="range" min="0.7" max="1.3" step="0.01" value="${this.rate}"><span>Más rápido</span></div></div>
          <div class="voice-settings-preview"><button class="btn-primary" id="voice-settings-preview" type="button">▶ Escuchar prueba</button><button class="btn-secondary" id="voice-settings-stop" type="button" disabled>■ Detener</button></div>
          <p class="voice-settings-status" id="voice-settings-status" aria-live="polite"></p>
          <div class="settings-divider"></div>
          <section class="ai-settings" aria-labelledby="ai-settings-title">
            <div class="ai-settings-heading"><span class="ai-settings-icon" aria-hidden="true">🤖</span><div><h3 class="settings-section-title" id="ai-settings-title">Tutor con IA (opcional)</h3><p class="ai-settings-subtitle">Permite al niño preguntar dudas sobre la teoría. Necesita una clave de API de un adulto.</p></div></div>
            <label class="voice-settings-label" for="ai-settings-provider">Proveedor</label>
            <select class="voice-settings-select" id="ai-settings-provider"></select>
            <p class="ai-settings-hint">Gemini tiene plan gratuito según el modelo. OpenAI no permite llamadas directas desde el navegador: usa OpenRouter si quieres modelos de OpenAI.</p>
            <label class="voice-settings-label" for="ai-settings-key">Clave de API</label>
            <div class="ai-settings-key-row"><input class="ai-settings-input" id="ai-settings-key" type="password" autocomplete="off" spellcheck="false"><button class="btn-secondary ai-settings-toggle" id="ai-settings-key-toggle" type="button" aria-label="Mostrar clave">👁️</button></div>
            <p class="ai-settings-hint" id="ai-settings-key-help"></p>
            <label class="voice-settings-label" for="ai-settings-model">Modelo</label>
            <input class="ai-settings-input" id="ai-settings-model" type="text" autocomplete="off" spellcheck="false">
            <p class="ai-settings-hint" id="ai-settings-model-help"></p>
            <div class="ai-settings-actions"><button class="btn-primary ai-settings-save" id="ai-settings-save" type="button">Guardar clave</button><button class="btn-secondary ai-settings-clear" id="ai-settings-clear" type="button">Borrar clave</button><button class="btn-secondary ai-settings-test" id="ai-settings-test" type="button">Probar conexión</button></div>
            <p class="ai-settings-note">⚠️ La clave se guarda solo en este navegador y se envía únicamente al proveedor elegido. No la uses en un dispositivo compartido. El texto de la teoría y las preguntas salen de este equipo.</p>
            <p class="ai-settings-status" id="ai-settings-status" aria-live="polite"></p>
          </section>
          <footer class="voice-settings-footer"><span id="voice-settings-saved"></span><button class="btn-primary voice-settings-save" id="voice-settings-save" type="button">Usar esta voz</button></footer>
        </section>`;
      document.body.append(this.backdrop);
      this.dialog = this.backdrop.querySelector('.voice-settings-dialog');
      this.select = this.backdrop.querySelector('#voice-settings-select');
      this.meta = this.backdrop.querySelector('#voice-settings-meta');
      this.status = this.backdrop.querySelector('#voice-settings-status');
      this.previewButton = this.backdrop.querySelector('#voice-settings-preview');
      this.stopButton = this.backdrop.querySelector('#voice-settings-stop');
      this.rateSlider = this.backdrop.querySelector('#voice-settings-rate');
      this.rateValue = this.backdrop.querySelector('#voice-settings-rate-value');
      this.dialog.focus();
      this.backdrop.querySelector('.voice-settings-close').addEventListener('click', () => this.close());
      this.backdrop.addEventListener('click', event => { if (event.target === this.backdrop) this.close(); });
      this.select.addEventListener('change', () => this.changeSelection());
      this.rateSlider.addEventListener('input', () => {
        this.rate = Number(this.rateSlider.value);
        this.updateRateLabel();
      });
      this.backdrop.querySelector('#voice-settings-all').addEventListener('change', event => {
        this.showAllVoices = event.target.checked;
        this.refreshVoiceList(speechManager.getVoices());
      });
      this.previewButton.addEventListener('click', () => this.preview());
      this.stopButton.addEventListener('click', () => this.stopPreview());
      this.backdrop.querySelector('#voice-settings-save').addEventListener('click', () => this.saveSelection());
      this.bindAiEvents();
      this.keyHandler = event => {
        if (event.key === 'Escape') { event.preventDefault(); this.close(); }
        if (event.key === 'Tab') this.trapFocus(event);
      };
      document.addEventListener('keydown', this.keyHandler);
      this.showSavedPreference();
      this.initAiSection();
      this.refreshVoiceList(speechManager.getVoices());
      this.unsubscribeVoices = speechManager.subscribe(voices => this.refreshVoiceList(voices));
      this.updateRateLabel();
    }

    bindAiEvents() {
      this.providerSelect = this.backdrop.querySelector('#ai-settings-provider');
      this.keyInput = this.backdrop.querySelector('#ai-settings-key');
      this.keyToggle = this.backdrop.querySelector('#ai-settings-key-toggle');
      this.keyHelp = this.backdrop.querySelector('#ai-settings-key-help');
      this.modelInput = this.backdrop.querySelector('#ai-settings-model');
      this.modelHelp = this.backdrop.querySelector('#ai-settings-model-help');
      this.aiStatus = this.backdrop.querySelector('#ai-settings-status');
      this.aiSave = this.backdrop.querySelector('#ai-settings-save');
      this.aiClear = this.backdrop.querySelector('#ai-settings-clear');
      this.aiTest = this.backdrop.querySelector('#ai-settings-test');

      this.providerSelect.addEventListener('change', () => {
        const provider = AI_PROVIDERS[this.providerSelect.value] || AI_PROVIDERS.gemini;
        const settings = aiTutor.getSettings(provider.id);
        this.modelInput.value = settings.model;
        this.keyInput.value = '';
        this.keyInput.type = 'password';
        this.aiKeyVisible = false;
        this.keyToggle.textContent = '👁️';
        this.keyToggle.setAttribute('aria-label', 'Mostrar clave');
        this.refreshAiStatus();
      });
      this.keyToggle.addEventListener('click', () => {
        this.aiKeyVisible = !this.aiKeyVisible;
        this.keyInput.type = this.aiKeyVisible ? 'text' : 'password';
        this.keyToggle.textContent = this.aiKeyVisible ? '🙈' : '👁️';
        this.keyToggle.setAttribute('aria-label', this.aiKeyVisible ? 'Ocultar clave' : 'Mostrar clave');
      });
      this.aiSave.addEventListener('click', () => this.saveAiSettings());
      this.aiClear.addEventListener('click', () => this.clearAiSettings());
      this.aiTest.addEventListener('click', () => this.testAiSettings());
    }

    initAiSection() {
      if (!this.providerSelect) return;
      this.providerSelect.innerHTML = Object.values(AI_PROVIDERS)
        .map(provider => `<option value="${provider.id}">${provider.label}</option>`)
        .join('');
      this.providerSelect.value = this.aiSettings.provider;
      this.modelInput.value = this.aiSettings.model;
      this.refreshAiStatus();
    }

    refreshAiStatus() {
      const providerId = this.providerSelect.value;
      const provider = AI_PROVIDERS[providerId] || AI_PROVIDERS.gemini;
      const settings = aiTutor.getSettings(providerId);
      this.aiSettings = settings;
      this.keyInput.placeholder = settings.hasKey
        ? `Guardada: ${settings.maskedKey} (escribe para cambiarla)`
        : provider.keyPlaceholder;
      this.keyHelp.innerHTML = `Consigue tu clave en <a href="${provider.keysUrl}" target="_blank" rel="noopener noreferrer">${provider.label}</a>.`;
      this.modelHelp.textContent = `ID exacto del modelo, sin espacios. Ejemplo: ${provider.modelExample}.${provider.id === 'gemini' ? ' Si 3.8 Flash tarda demasiado, prueba gemini-3.6-flash.' : ''}`;
      this.aiClear.disabled = !settings.hasKey;
      this.aiStatus.textContent = settings.hasKey
        ? `Clave guardada para ${provider.label} en este navegador.`
        : `Sin clave para ${provider.label}. El tutor permanecerá desactivado.`;
    }

    saveAiSettings() {
      const providerId = this.providerSelect.value;
      const current = aiTutor.getSettings(providerId);
      const typedKey = this.keyInput.value.trim();
      if (!typedKey && !current.hasKey) {
        this.aiStatus.textContent = 'Escribe una clave de API antes de guardar.';
        return;
      }
      const model = aiTutor.normalizeModelId(providerId, this.modelInput.value);
      this.modelInput.value = model;
      const saved = aiTutor.saveSettings({ provider: providerId, model: model, apiKey: typedKey });
      this.keyInput.value = '';
      if (!saved) {
        this.aiStatus.textContent = 'El navegador no ha permitido guardar la clave. Revisa la configuración de privacidad.';
        return;
      }
      this.refreshAiStatus();
      this.aiStatus.textContent = typedKey
        ? 'Clave guardada en este navegador. Ya puedes preguntar desde la teoría.'
        : 'Proveedor y modelo guardados. Se usará esta configuración en el tutor.';
    }

    async testAiSettings() {
      const providerId = this.providerSelect.value;
      const current = aiTutor.getSettings(providerId);
      const typedKey = this.keyInput.value.trim();
      if (!typedKey && !current.hasKey) {
        this.aiStatus.textContent = 'Escribe una clave de API antes de probar.';
        return;
      }
      const model = aiTutor.normalizeModelId(providerId, this.modelInput.value);
      this.modelInput.value = model;
      const saved = aiTutor.saveSettings({ provider: providerId, model: model, apiKey: typedKey });
      if (!saved) {
        this.aiStatus.textContent = 'El navegador no ha permitido guardar la clave. Revisa la configuración de privacidad.';
        return;
      }
      this.keyInput.value = '';
      this.refreshAiStatus();
      this.aiTest.disabled = true;
      this.aiStatus.textContent = 'Probando la conexión con el proveedor…';
      const slowTimer = setTimeout(() => {
        this.aiStatus.textContent = 'Sigue esperando… El proveedor está tardando; puede llegar a 1-2 minutos.';
      }, 8000);
      try {
        const answer = await aiTutor.testConnection();
        this.aiStatus.textContent = `Conexión correcta ✅ El proveedor responde: «${answer.slice(0, 80)}»`;
      } catch (error) {
        this.aiStatus.textContent = `No se pudo conectar: ${error?.message || 'error desconocido'}`;
      } finally {
        clearTimeout(slowTimer);
        if (this.aiTest?.isConnected) this.aiTest.disabled = false;
      }
    }

    clearAiSettings() {
      const providerId = this.providerSelect.value;
      if (!window.confirm('¿Borrar la clave de API guardada en este dispositivo?')) return;
      aiTutor.clearKey(providerId);
      this.keyInput.value = '';
      this.refreshAiStatus();
      this.aiStatus.textContent = 'Clave borrada de este navegador.';
    }

    refreshVoiceList(voices) {
      if (!this.isOpen || !this.select) return;
      this.visibleVoices = voices.filter(voice => this.showAllVoices || /^es(?:-|$)/i.test(voice.lang || '') ||
        (this.mode === 'selected' && this.matches(voice, this.selectedVoice)));
      this.select.innerHTML = '<option value="auto">Automática — español</option>';
      this.visibleVoices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.value = `voice:${index}`;
        option.textContent = `${voice.name || 'Voz sin nombre'} — ${voice.lang || 'idioma desconocido'}`;
        this.select.append(option);
      });
      let selected = this.mode === 'auto' ? 'auto' : '';
      if (this.mode === 'selected') {
        const index = this.visibleVoices.findIndex(voice => this.matches(voice, this.selectedVoice));
        if (index >= 0) selected = `voice:${index}`;
        else {
          const option = document.createElement('option');
          option.value = 'unavailable';
          option.textContent = `${this.selectedVoice?.name || 'Voz guardada'} — no disponible ahora`;
          this.select.append(option);
          selected = 'unavailable';
        }
      }
      this.select.value = selected;
      const supported = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
      this.select.disabled = this.previewButton.disabled = this.backdrop.querySelector('#voice-settings-save').disabled = !supported;
      if (!supported) this.status.textContent = 'Este navegador no admite lectura por voz.';
      else if (!voices.length) this.status.textContent = 'Cargando voces… Si no aparecen, se intentará la voz predeterminada del navegador.';
      else if (!voices.some(voice => /^es(?:-|$)/i.test(voice.lang || ''))) this.status.textContent = 'No hay voces disponibles en español. Puedes mostrar voces de otros idiomas.';
      else if (this.status.textContent.startsWith('Cargando voces') || this.status.textContent.startsWith('No hay voces disponibles en español')) this.status.textContent = '';
      this.updateMeta();
    }

    matches(voice, descriptor) {
      if (!voice || !descriptor) return false;
      if (descriptor.voiceURI && voice.voiceURI === descriptor.voiceURI && voice.lang === descriptor.lang) return true;
      return voice.name === descriptor.name && voice.lang === descriptor.lang;
    }

    changeSelection() {
      this.stopPreview();
      if (this.select.value === 'auto') { this.mode = 'auto'; this.selectedVoice = null; }
      else if (this.select.value.startsWith('voice:')) {
        const voice = this.visibleVoices[Number(this.select.value.slice(6))];
        if (voice) {
          this.mode = 'selected';
          this.selectedVoice = { voiceURI: voice.voiceURI || '', name: voice.name || '', lang: voice.lang || '' };
        }
      }
      this.status.textContent = '';
      this.updateMeta();
    }

    currentPreference() {
      return this.mode === 'selected'
        ? { version: 1, mode: 'selected', voice: this.selectedVoice, rate: this.rate }
        : { version: 1, mode: 'auto', voice: null, rate: this.rate };
    }

    updateRateLabel() {
      if (this.rateValue) this.rateValue.textContent = `${this.rate.toFixed(2).replace('.', ',')}×`;
    }

    formatRate(rate) {
      return Number(rate ?? 0.94).toFixed(2).replace('.', ',');
    }

    showSavedPreference() {
      const savedLabel = this.backdrop.querySelector('#voice-settings-saved');
      savedLabel.textContent = this.preference.mode === 'selected'
        ? `Voz guardada: ${this.preference.voice.name} · ${this.formatRate(this.preference.rate)}×`
        : `Voz guardada: Automática · ${this.formatRate(this.preference.rate)}×`;
    }

    updateMeta() {
      const preference = this.currentPreference();
      const voice = speechManager.resolveVoice(preference, speechManager.getVoices(), { fallback: false });
      if (this.mode === 'selected' && !voice) {
        this.meta.textContent = 'La voz guardada no está disponible en este momento; no se cambiará si no guardas otra.';
        return;
      }
      const selected = voice || speechManager.resolveVoice({ mode: 'auto' });
      this.meta.textContent = selected
        ? `${this.mode === 'auto' ? 'Selección automática · ' : ''}${selected.lang || 'Idioma desconocido'} · ${selected.localService === false ? 'Voz en línea (puede necesitar conexión)' : 'Voz local'}`
        : 'El navegador utilizará su voz predeterminada.';
    }

    preview() {
      this.stopPreview();
      const pref = this.currentPreference();
      const result = speechManager.createUtterance('¡Hola! Soy la voz que te acompañará en PlayStudy. ¿Preparado para aprender? Vamos a descubrir cosas nuevas, paso a paso.', pref, { fallback: false });
      if (!result || (pref.mode === 'selected' && !result.voice)) {
        this.status.textContent = 'Esa voz no está disponible. Elige otra o usa la selección automática.';
        return;
      }
      const utterance = this.testUtterance = result.utterance;
      this.previewButton.disabled = true;
      this.stopButton.disabled = false;
      this.status.textContent = `Reproduciendo${result.voice ? `: ${result.voice.name}` : ' con la voz predeterminada'}…`;
      utterance.onend = () => this.finishPreview(utterance, 'Prueba finalizada.');
      utterance.onerror = () => this.finishPreview(utterance, 'No se pudo reproducir esta voz en el navegador.');
      try { window.speechSynthesis.cancel(); window.speechSynthesis.speak(utterance); }
      catch (error) { this.finishPreview(utterance, 'No se pudo iniciar la prueba de voz.'); }
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
      if (utterance && 'speechSynthesis' in window) window.speechSynthesis.cancel();
      if (this.previewButton) this.previewButton.disabled = !('speechSynthesis' in window);
      if (this.stopButton) this.stopButton.disabled = true;
    }

    saveSelection() {
      if (this.select.value === 'unavailable') {
        this.status.textContent = 'La voz guardada no está disponible; elige otra voz antes de guardar.';
        return;
      }
      this.stopPreview();
      const saved = speechManager.savePreference(this.currentPreference());
      this.status.textContent = saved
        ? 'Preferencia guardada. Se aplicará a las explicaciones.'
        : 'Se aplicará durante esta sesión, pero no se pudo guardar para la próxima.';
      this.backdrop.querySelector('#voice-settings-saved').textContent = this.mode === 'auto'
        ? `Voz guardada: Automática · ${this.formatRate(this.rate)}×`
        : `Voz guardada: ${this.selectedVoice.name} · ${this.formatRate(this.rate)}×`;
    }

    trapFocus(event) {
      const focusable = Array.from(this.dialog.querySelectorAll('button:not(:disabled), select:not(:disabled), input:not(:disabled)'));
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === this.dialog)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
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
      if (this.keyHandler) document.removeEventListener('keydown', this.keyHandler);
      this.backdrop?.remove();
      this.backdrop = null;
    }
  }

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
                "juegos": ["parejas", "linea_tiempo"],
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
                  },
                  {
                    "id": "cap_02_visigodos",
                    "numero": 2,
                    "titulo": "Capítulo 2: El Reino Visigodo",
                    "subtitulo": "El inicio de la Edad Media española",
                    "icono": "👑",
                    "archivo": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_02_visigodos/contenido.json",
                    "assets_dir": "data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_02_visigodos/assets/",
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
      this.settingsView = null;
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
              <button class="btn-icon" id="btn-menu-settings" title="Configuración" aria-label="Configuración">⚙️</button>
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

      this.container.querySelector('#btn-menu-settings').addEventListener('click', event => {
        audio.playClick();
        if (!this.settingsView?.isOpen) this.settingsView = new SettingsView();
        this.settingsView.render(event.currentTarget);
      });

      this.container.querySelector('#btn-menu-back').addEventListener('click', () => {
        audio.playClick();
        this.goBack();
      });
    }

    cleanup() {
      this.settingsView?.cleanup();
      this.settingsView = null;
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
          this.onSelectCapitulo(capituloObj, this.selectedTema);
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
              <p class="victory-subtitle">¡Has encontrado todas las parejas!</p>
              
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
                  <span>Continuar al siguiente reto 🗺️ ➡️</span>
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

      this.imageSrc = casillaData.imagen || (tema.assets_dir ? `${tema.assets_dir}puzzle.jpg` : 'data/cursos/5_primaria/ciencias_sociales/tema_06_castillos/cap_01_edades/assets/puzzle.jpg');
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
                  <span>Continuar al siguiente reto 🗺️ ➡️</span>
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
/**
 * Minijuego de la Línea del Tiempo
 * - Ordena acontecimientos históricos del más antiguo al más reciente.
 * - El orden del array "eventos" del contenido.json es el orden correcto.
 * - Interacción táctil: toca una tarjeta y luego otra para intercambiarlas.
 * - Las fechas se pueden ocultar para convertir el juego en un reto de memoria.
 */

class TimelineGame {
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
            <button class="btn-hud btn-back" id="btn-timeline-exit"><span>⬅️ Circuito</span></button>
            <div class="hud-center"><h2 class="game-title">${this.casillaData.titulo}</h2></div>
            <span></span>
          </header>
          <div class="timeline-empty">
            <p>🕰️ Este juego necesita al menos dos acontecimientos en <code>eventos</code>.</p>
          </div>
        </div>
      `;
      container.querySelector('#btn-timeline-exit').addEventListener('click', () => {
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
            <span>⬅️ Circuito</span>
          </button>

          <div class="hud-center">
            <h2 class="game-title">${this.casillaData.titulo}</h2>
            <div class="hud-stats">
              <span class="stat-pill">⏳ <strong id="tl-timer">00:00</strong></span>
              <span class="stat-pill">🔄 Cambios: <strong id="tl-moves">0</strong></span>
              <span class="stat-pill" title="Comprobaciones realizadas">✅ Comprob.: <strong id="tl-checks">0</strong></span>
            </div>
          </div>

          <div class="hud-actions">
            <button class="btn-hud btn-dates" id="btn-timeline-dates" title="Mostrar u ocultar las fechas">
              <span id="tl-dates-label">🙈 Ocultar fechas</span>
            </button>
            <button class="btn-hud btn-restart" id="btn-timeline-restart" title="Volver a mezclar">
              <span>🔄 Reiniciar</span>
            </button>
          </div>
        </header>

        <div class="timeline-stage">
          <p class="timeline-instructions">
            🧭 Ordena los acontecimientos del <strong>más antiguo</strong> al <strong>más reciente</strong>.
            Toca dos tarjetas para cambiarlas de sitio. Si no caben todas, desliza la línea.
          </p>

          <div class="timeline-track" id="timeline-track" role="list" aria-label="Línea del tiempo desordenada">
            <!-- Tarjetas generadas dinámicamente -->
          </div>

          <div class="timeline-actions">
            <span class="timeline-status" id="timeline-status" aria-live="polite">
              ${this.total} acontecimientos por ordenar.
            </span>
            <button class="btn-primary btn-large" id="btn-timeline-check">
              <span>Comprobar orden ✅</span>
            </button>
          </div>
        </div>

        <div class="modal-overlay hidden" id="timeline-victory-modal">
          <div class="modal-card victory-card">
            <div class="victory-icon">🎉🕰️</div>
            <h2 class="victory-title">¡LÍNEA DEL TIEMPO COMPLETADA!</h2>
            <p class="victory-subtitle">Has ordenado los acontecimientos como un verdadero historiador.</p>

            <div class="stars-awarded" id="timeline-stars">
              <span class="star">⭐</span>
              <span class="star">⭐</span>
              <span class="star">⭐</span>
            </div>

            <div class="victory-details">
              <p>⏱️ Tiempo: <strong id="tl-final-time">00:00</strong></p>
              <p>🔄 Cambios: <strong id="tl-final-moves">0</strong></p>
              <p>✅ Comprobaciones: <strong id="tl-final-checks">0</strong></p>
            </div>

            <div class="modal-actions">
              <button class="btn-primary btn-large" id="btn-timeline-next">
                <span>Continuar ➡️</span>
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
    this.container.querySelector('#btn-timeline-exit').addEventListener('click', () => {
      audio.playClick();
      this.stopTimer();
      this.onExit();
    });

    this.container.querySelector('#btn-timeline-restart').addEventListener('click', () => {
      audio.playClick();
      this.startNewGame();
    });

    this.container.querySelector('#btn-timeline-dates').addEventListener('click', () => {
      audio.playClick();
      this.showDates = !this.showDates;
      this.updateDatesButton();
      this.renderBoard();
    });

    this.container.querySelector('#btn-timeline-check').addEventListener('click', () => {
      audio.playClick();
      this.checkOrder();
    });

    this.container.querySelector('#btn-timeline-next').addEventListener('click', () => {
      audio.playClick();
      this.onComplete(this.calculatedStars);
    });
  }

  updateDatesButton() {
    const label = this.container.querySelector('#tl-dates-label');
    if (label) {
      label.textContent = this.showDates ? '🙈 Ocultar fechas' : '👁️ Mostrar fechas';
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
    const track = this.container.querySelector('#timeline-track');
    if (!track) return;

    track.innerHTML = this.board.map((eventoIndex, position) => {
      const evento = this.eventos[eventoIndex] || {};
      const isSelected = this.selected === position;
      const dateContent = this.showDates
        ? `<span class="timeline-card-date">${evento.fecha || ''}</span>`
        : `<span class="timeline-card-date timeline-date-hidden">¿Cuándo fue?</span>`;

      return `
        <div class="timeline-slot" role="listitem">
          <button type="button"
                  class="timeline-card ${isSelected ? 'selected' : ''}"
                  data-position="${position}"
                  style="--event-color: ${evento.color || '#3b82f6'};"
                  aria-pressed="${isSelected}"
                  aria-label="${evento.etiqueta || 'Acontecimiento'}${this.showDates && evento.fecha ? `, ${evento.fecha}` : ''}">
            <span class="timeline-card-position">${position + 1}</span>
            <span class="timeline-card-icon">${evento.icono || '📌'}</span>
            <span class="timeline-card-label">${evento.etiqueta || ''}</span>
            ${dateContent}
          </button>
          ${position < this.total - 1 ? '<span class="timeline-arrow" aria-hidden="true">➜</span>' : ''}
        </div>
      `;
    }).join('');

    track.querySelectorAll('.timeline-card').forEach(card => {
      card.addEventListener('click', () => {
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
    this.setStatus('Pulsa "Comprobar orden" cuando creas que ya están colocados.');
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
    this.setStatus(`✅ ${correct} en su sitio · ❌ ${incorrectPositions.length} fuera de lugar. ¡Sigue así!`);

    const cards = this.container.querySelectorAll('.timeline-card');
    incorrectPositions.forEach(position => {
      const card = cards[position];
      if (!card) return;
      card.classList.add('timeline-wrong');
      setTimeout(() => card.classList.remove('timeline-wrong'), 900);
    });
  }

  setStatus(text) {
    const status = this.container.querySelector('#timeline-status');
    if (!status) return;
    status.textContent = text;

    if (this.messageTimeout) clearTimeout(this.messageTimeout);
    this.messageTimeout = setTimeout(() => {
      if (!this.isVictory) {
        status.textContent = `${this.total} acontecimientos · ${this.moves} cambios realizados.`;
      }
    }, 4000);
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

    const modal = this.container.querySelector('#timeline-victory-modal');
    const starsContainer = this.container.querySelector('#timeline-stars');
    starsContainer.innerHTML = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

    this.container.querySelector('#tl-final-time').textContent = this.formatTime(this.timerSeconds);
    this.container.querySelector('#tl-final-moves').textContent = this.moves;
    this.container.querySelector('#tl-final-checks').textContent = this.checks;

    modal.classList.remove('hidden');
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timerSeconds++;
      const timerEl = this.container.querySelector('#tl-timer');
      if (timerEl) timerEl.textContent = this.formatTime(this.timerSeconds);
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
    const movesEl = this.container.querySelector('#tl-moves');
    const checksEl = this.container.querySelector('#tl-checks');
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
}


  class TheoryView {
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
      this.aiPanel = null;
      this.aiRequest = null;
      this.aiRecognition = null;
      this.settingsView = null;
    }

    /**
     * Transforma las fichas y tarjetas en una secuencia de diapositivas individuales
     */
    buildSlides(casillaData) {
      const rawFichas = casillaData.fichas || [];
      const slides = [];

      rawFichas.forEach((ficha) => {
        if (ficha.tarjetas && ficha.tarjetas.length > 0) {
          ficha.tarjetas.forEach((t) => {
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
              ajusteImagen: t.ajuste_imagen || 'recorte',
              texto: t.texto || ''
            });
          });

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
            <div class="theory-card is-presentation" id="theory-current-card"></div>
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

      indicator.textContent = `Diapositiva ${this.currentIndex + 1} de ${totalSlides}`;
      prevBtn.disabled = this.currentIndex === 0;

      const isLast = this.currentIndex === totalSlides - 1;
      if (isLast) {
        nextBtn.innerHTML = `<span>¡Entendido! Ir al Quiz ❓ ➡️</span>`;
      } else {
        nextBtn.innerHTML = `<span>Siguiente ➡️</span>`;
      }

      const dots = this.container.querySelectorAll('.slide-dot-pill');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === this.currentIndex);
      });

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

          <div class="presentation-body ${slide.imagen ? 'has-image' : ''} ${slide.imagen && slide.ajusteImagen === 'completo' ? 'is-full-image' : ''}">
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

    speakSlide(slide, force = false) {
      if (!('speechSynthesis' in window)) return;
      this.stopSpeaking();

      if (this.isVoiceMuted && !force) {
        this.updateNarratorUi();
        return;
      }

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
  /* Geometría del camino (viewBox 1000 x 560) */
  const TRACK_PATH = 'M 330 120 H 750 A 110 110 0 0 1 860 230 V 330 A 110 110 0 0 1 750 440 H 250 A 110 110 0 0 1 140 330 V 230 A 110 110 0 0 1 250 120 H 330 Z';

  /* Centros de las 6 paradas, en el mismo sistema de coordenadas */
  const NODE_POINTS = [
    { x: 330, y: 120 },
    { x: 670, y: 120 },
    { x: 860, y: 280 },
    { x: 670, y: 440 },
    { x: 330, y: 440 },
    { x: 140, y: 280 }
  ];

  const VIEW_W = 1000;
  const VIEW_H = 560;

  class MapView {
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
      const progresoPct = totalPosibleEstrellas > 0
        ? Math.round((totalEstrellas / totalPosibleEstrellas) * 100)
        : 0;

      this.container.innerHTML = `
        <div class="map-screen ${isPerfect ? 'all-stars' : ''}">
          <header class="app-header map-header">
            <div class="header-left">
              <button class="btn-hud btn-back" id="btn-return-menu" title="Volver al menú de temas">
                <span>⬅️ Menú</span>
              </button>
              <span class="theme-badge-icon">${this.tema.icono}</span>
              <div class="theme-info">
                <h1 class="header-title" title="${this.tema.titulo}">${this.tema.titulo}</h1>
                <span class="header-subtitle" title="${this.tema.subtitulo}">${this.tema.subtitulo}</span>
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

              <button class="btn-icon" id="btn-map-settings" title="Configuración" aria-label="Configuración">⚙️</button>

              <button class="btn-icon btn-secondary-icon" id="btn-reset-topic" title="Reiniciar circuito">
                <span>🔄</span>
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

              <div class="circuit-center-hub ${isPerfect ? 'all-stars-perfect' : ''}">
                <div class="hub-emblem">${isPerfect ? '👑' : '🏆'}</div>
                <h3 class="hub-title">${isPerfect ? '¡Corona de Oro!' : 'Circuito del Tiempo'}</h3>
                <div class="hub-progress">
                  <div class="hub-progress-track">
                    <span class="hub-progress-fill" style="width: ${progresoPct}%"></span>
                  </div>
                  <span class="hub-stars-badge">${totalEstrellas} / ${totalPosibleEstrellas} ⭐</span>
                </div>
                <p class="hub-hint">
                  ${isPerfect
                    ? '¡Enhorabuena! Tienes 3 estrellas en todas las paradas.'
                    : 'Recorre el circuito una y otra vez para conseguir 3⭐ en cada parada.'}
                </p>
              </div>

              ${this.renderCircuitNodes()}
            </div>
          </main>

          <footer class="map-footer-tip">
            <span class="tip-icon">🧭</span>
            <span class="tip-text">Camino circular infinito: puedes repetir cualquier parada superada para mejorar tu récord de estrellas.</span>
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

        const labelPosition = point.y < VIEW_H / 2 ? '' : 'label-below';
        const cleanTitle = String(casilla.titulo || '').replace(/^\s*\d+[.)]\s*/, '');

        return `
          <div class="circuit-node ${statusClass} ${labelPosition}"
               data-casilla-id="${casilla.id}"
               style="--nx: ${((point.x / VIEW_W) * 100).toFixed(2)}%; --ny: ${((point.y / VIEW_H) * 100).toFixed(2)}%;">
            <div class="circuit-node-label">
              <span class="circuit-node-step">Parada ${casilla.id}</span>
              <span class="circuit-node-title">${cleanTitle}</span>
            </div>

            <button class="circuit-btn" ${!isUnlocked ? 'disabled' : ''} aria-label="${cleanTitle}">
              <span class="circuit-btn-number">${casilla.id}</span>
              <span class="circuit-btn-icon">${isUnlocked ? casilla.icono : '🔒'}</span>
              ${stars > 0 ? `<span class="circuit-stars-tag">${'⭐'.repeat(stars)}</span>` : ''}
            </button>
          </div>
        `;
      }).join('');
    }

    bindEvents() {
      // Volver al menú de capítulos
      const returnBtn = this.container.querySelector('#btn-return-menu');
      if (returnBtn && this.onReturnMenu) {
        returnBtn.addEventListener('click', () => {
          audio.playClick();
          this.onReturnMenu();
        });
      }

      // Sonido toggle
      this.container.querySelector('#btn-sound-toggle').addEventListener('click', () => {
        const isEnabled = audio.toggleSound();
        this.container.querySelector('#sound-icon').textContent = isEnabled ? '🔊' : '🔇';
      });

      this.container.querySelector('#btn-map-settings').addEventListener('click', event => {
        audio.playClick();
        if (!this.settingsView?.isOpen) this.settingsView = new SettingsView();
        this.settingsView.render(event.currentTarget);
      });

      // Reiniciar circuito
      this.container.querySelector('#btn-reset-topic').addEventListener('click', () => {
        if (confirm('¿Quieres reiniciar las estrellas del circuito para empezar de nuevo?')) {
          audio.playClick();
          gameState.reiniciarProgresoTema(this.tema.id);
          this.render(this.container);
        }
      });

      // Clics en los nodos del circuito
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

    cleanup() {
      this.settingsView?.cleanup();
      this.settingsView = null;
    }

    /** Calcula en qué punto del camino está cada parada (0..1) */
    computeNodeFractions(pathEl) {
      const totalLength = pathEl.getTotalLength();
      if (!totalLength) return NODE_POINTS.map((_, i) => i / NODE_POINTS.length);

      const steps = 240;
      return NODE_POINTS.map(point => {
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
      const pathActive = this.container.querySelector('#circuit-active-path');
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
        ratio = totalCasillas === this.nodeFractions.length
          ? this.nodeFractions[index]
          : index / totalCasillas;
      }

      pathActive.style.strokeDasharray = `${totalLength * ratio} ${totalLength}`;
      pathActive.style.strokeDashoffset = '0';
    }
  }
  /* ==========================================================================
     10. ORDEN ALEATORIO DE LOS JUEGOS DEL CIRCUITO
     El tema elige sus dos juegos en `juegos` y el capítulo guarda el material
     de cada minijuego en su catálogo `juegos`. El montaje y el barajado son
     genéricos: añadir un juego nuevo no requiere tocar este bloque.
     ========================================================================== */
  const TIPOS_JUEGO = ['minijuego'];

  function esCasillaDeJuego(casilla) {
    return Boolean(casilla) && TIPOS_JUEGO.includes(casilla.tipo);
  }

  function mezclarJuegos(array, random) {
    const resultado = array.slice();
    for (let i = resultado.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [resultado[i], resultado[j]] = [resultado[j], resultado[i]];
    }
    return resultado;
  }

  function renumerarTituloJuego(titulo, numeroParada) {
    if (typeof titulo !== 'string') return titulo;

    const prefijo = /^\s*\d+\s*[.)-]\s*/;
    if (prefijo.test(titulo)) {
      return titulo.replace(prefijo, `${numeroParada}. `);
    }

    return titulo;
  }

  function obtenerJuegosDelTema(tema) {
    if (!tema || !Array.isArray(tema.juegos)) return null;

    const juegos = tema.juegos
      .filter(subtipo => typeof subtipo === 'string' && subtipo.trim())
      .map(subtipo => subtipo.trim());

    return juegos.length ? Array.from(new Set(juegos)) : null;
  }

  function numerarTituloJuego(titulo, numeroParada) {
    const limpio = String(titulo || 'Juego').replace(/^\s*\d+\s*[.)-]\s*/, '');
    return `${numeroParada}. ${limpio}`;
  }

  function montarJuegosDelTema(capitulo, tema = null) {
    if (!capitulo || !Array.isArray(capitulo.casillas)) return capitulo;

    const pool = capitulo.juegos;
    if (!pool || typeof pool !== 'object' || Array.isArray(pool)) return capitulo;

    const slots = capitulo.casillas.filter(esCasillaDeJuego);
    if (slots.length === 0) return capitulo;

    const disponibles = Object.keys(pool).filter(subtipo => {
      const juego = pool[subtipo];
      return juego && typeof juego === 'object' && !Array.isArray(juego);
    });
    if (disponibles.length === 0) return capitulo;

    const configurados = obtenerJuegosDelTema(tema);
    let seleccion = configurados
      ? configurados.filter(subtipo => disponibles.includes(subtipo))
      : disponibles.slice();

    if (configurados) {
      const ausentes = configurados.filter(subtipo => !disponibles.includes(subtipo));
      if (ausentes.length) {
        console.warn(`[Juegos] El tema pide juegos que el capítulo "${capitulo.id}" no define:`, ausentes.join(', '));
      }
    }

    if (seleccion.length < slots.length) {
      console.warn(`[Juegos] Faltan juegos configurados en "${capitulo.id}"; se completan con los disponibles.`);
      const resto = disponibles.filter(subtipo => !seleccion.includes(subtipo));
      seleccion = seleccion.concat(resto).slice(0, slots.length);
    }

    if (seleccion.length > slots.length) {
      console.warn(`[Juegos] El circuito solo tiene ${slots.length} paradas de juego; se usarán las primeras.`);
      seleccion = seleccion.slice(0, slots.length);
    }

    let indiceJuego = 0;
    const casillas = capitulo.casillas.map(casilla => {
      if (!esCasillaDeJuego(casilla)) return casilla;

      const subtipo = seleccion[indiceJuego];
      indiceJuego++;

      if (!subtipo) return casilla;
      const juego = pool[subtipo];

      return {
        ...casilla,
        ...juego,
        id: casilla.id,
        tipo: 'minijuego',
        subtipo,
        titulo: numerarTituloJuego(juego.titulo, casilla.id)
      };
    });

    return { ...capitulo, casillas };
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

    const juegosMezclados = mezclarJuegos(juegos, random);
    const resultado = casillas.slice();

    indicesDeJuego.forEach((slotIndex, i) => {
      const parada = casillas[slotIndex];
      const juego = juegosMezclados[i];

      resultado[slotIndex] = {
        ...juego,
        id: parada.id,
        titulo: renumerarTituloJuego(juego.titulo, parada.id)
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

  /* ==========================================================================
     11. ORQUESTADOR DE LA APLICACIÓN
     ========================================================================== */
  class App {
    constructor() {
      this.root = document.getElementById('app-root');
      this.catalogo = (typeof window !== 'undefined' && window.CATALOGO_DATA) ? window.CATALOGO_DATA : defaultCatalogo;
      this.currentCapitulo = defaultCapituloData;
      this.currentViewInstance = null;
    }

    async init() {
      speechManager.init();
      const unlockAudio = () => {
        audio.init();
        window.removeEventListener('pointerdown', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
      };
      window.addEventListener('pointerdown', unlockAudio);
      window.addEventListener('keydown', unlockAudio);

      // Intentar cargar catalogo vía fetch si estamos en servidor HTTP
      try {
        const res = await fetch('data/catalogo.json');
        if (res.ok) {
          this.catalogo = await res.json();
        }
      } catch (e) {
        // En file:// usamos window.CATALOGO_DATA o defaultCatalogo
      }

      this.showMenu();
    }

    async loadCapituloData(capituloObj, temaObj = null) {
      const capitulo = await this.cargarCapituloSinBarajar(capituloObj);
      // El tema decide qué dos juegos se muestran; después se barajan las paradas.
      const conJuegos = montarJuegosDelTema(capitulo, temaObj);
      return prepararCapituloParaCircuito(conJuegos);
    }

    async cargarCapituloSinBarajar(capituloObj) {
      if (!capituloObj) return defaultCapituloData;

      // 1. Intentar cargar vía fetch (HTTP)
      if (capituloObj.archivo) {
        try {
          const res = await fetch(capituloObj.archivo);
          if (res.ok) {
            return await res.json();
          }
        } catch (e) {}
      }

      // 2. Intentar buscar en window.CAPITULOS_DATA (file://)
      if (typeof window !== 'undefined' && window.CAPITULOS_DATA) {
        if (capituloObj.id && window.CAPITULOS_DATA[capituloObj.id]) {
          return window.CAPITULOS_DATA[capituloObj.id];
        }
        if (capituloObj.archivo && window.CAPITULOS_DATA[capituloObj.archivo]) {
          return window.CAPITULOS_DATA[capituloObj.archivo];
        }
      }

      return defaultCapituloData;
    }

    showMenu() {
      this.cleanupCurrentView();
      const menuView = new MenuView(
        this.catalogo,
        async (capituloObj, temaObj) => {
          this.currentCapitulo = await this.loadCapituloData(capituloObj, temaObj);
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
          } else if (casillaData.subtipo === 'linea_tiempo') {
            this.currentViewInstance = new TimelineGame(this.currentCapitulo, casillaData, onStepComplete, onExit);
            this.currentViewInstance.render(this.root);
          } else {
            console.warn('Subtipo de minijuego desconocido:', casillaData.subtipo);
            this.showMap();
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
