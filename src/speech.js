import { CLAVES, leerJSON, guardarJSON } from './storage.js';

const DEFAULT_RATE = 0.94;
const DEFAULT_PREFERENCE = { version: 1, mode: 'auto', voice: null, rate: DEFAULT_RATE };

function normalizeRate(value) {
  const rate = typeof value === 'number' ? value :
    (typeof value === 'string' && value.trim() ? Number(value) : NaN);
  return Number.isFinite(rate) ? Math.min(1.3, Math.max(0.7, rate)) : DEFAULT_RATE;
}

function descriptorMatches(voice, descriptor) {
  if (!voice || !descriptor) return false;
  if (descriptor.voiceURI && voice.voiceURI === descriptor.voiceURI &&
      (!descriptor.lang || voice.lang === descriptor.lang)) return true;
  return Boolean(descriptor.name && voice.name === descriptor.name &&
    (!descriptor.lang || voice.lang === descriptor.lang));
}

class SpeechManager {
  constructor() {
    this.preference = this.loadPreference();
    this.voices = [];
    this.listeners = new Set();
    this.initialized = false;
    this.speech = null;
    this.voicesChangedHandler = null;
  }

  loadPreference() {
    const value = leerJSON(CLAVES.preferenciasVoz, null);
    if (value?.version === 1 && value.mode === 'auto') {
      return { ...DEFAULT_PREFERENCE, rate: normalizeRate(value.rate) };
    }
    if (value?.version === 1 && value.mode === 'selected' && value.voice &&
        typeof value.voice.name === 'string' && typeof value.voice.lang === 'string') {
      return {
        version: 1,
        mode: 'selected',
        rate: normalizeRate(value.rate),
        voice: {
          voiceURI: typeof value.voice.voiceURI === 'string' ? value.voice.voiceURI : '',
          name: value.voice.name,
          lang: value.voice.lang
        }
      };
    }
    return { ...DEFAULT_PREFERENCE };
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
    try {
      this.voices = this.speech ? this.speech.getVoices() : [];
    } catch (error) {
      this.voices = [];
    }
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
      const onChange = nextVoices => {
        if (nextVoices.length) finish();
      };
      const timeout = setTimeout(finish, timeoutMs);
      this.listeners.add(onChange);
    });
  }

  getPreference() {
    return this.preference.mode === 'selected'
      ? { version: 1, mode: 'selected', rate: this.preference.rate, voice: { ...this.preference.voice } }
      : { ...DEFAULT_PREFERENCE, rate: this.preference.rate };
  }

  savePreference(preference) {
    const next = preference?.mode === 'selected' && preference.voice
      ? {
          version: 1,
          mode: 'selected',
          rate: normalizeRate(preference.rate),
          voice: {
            voiceURI: String(preference.voice.voiceURI || ''),
            name: String(preference.voice.name || ''),
            lang: String(preference.voice.lang || '')
          }
        }
      : { ...DEFAULT_PREFERENCE, rate: normalizeRate(preference?.rate) };

    if (next.mode === 'selected' && (!next.voice.name || !next.voice.lang)) return false;
    this.preference = next;
    return guardarJSON(CLAVES.preferenciasVoz, next);
  }

  findPreferredVoice(voices, descriptor) {
    if (!descriptor) return null;
    return voices.find(voice => descriptor.voiceURI && voice.voiceURI === descriptor.voiceURI &&
      (!descriptor.lang || voice.lang === descriptor.lang)) ||
      voices.find(voice => descriptorMatches(voice, descriptor)) || null;
  }

  chooseAutomaticVoice(voices = this.getVoices()) {
    const spanish = voices.filter(voice => /^es(?:-|$)/i.test(voice.lang || ''));
    const naturalTerms = /natural|neural|online|premium/i;
    const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
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

    const preferred = this.findPreferredVoice(voices, preference.voice);
    const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
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
    utterance.rate = normalizeRate(preference?.rate ?? this.preference.rate);
    utterance.pitch = 1.03;
    if (voice) utterance.voice = voice;
    return { utterance, voice };
  }
}

export const speechManager = new SpeechManager();
