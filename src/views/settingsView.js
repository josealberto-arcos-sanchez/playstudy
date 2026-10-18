import { speechManager } from '../speech.js';

const TEST_TEXT = '¡Hola! Soy la voz que te acompañará en PlayStudy. ¿Preparado para aprender? Vamos a descubrir cosas nuevas, paso a paso.';

function voiceKeyMatches(voice, descriptor) {
  if (!voice || !descriptor) return false;
  if (descriptor.voiceURI && voice.voiceURI === descriptor.voiceURI && voice.lang === descriptor.lang) return true;
  return voice.name === descriptor.name && voice.lang === descriptor.lang;
}

export class SettingsView {
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
  }

  render(returnFocus = null) {
    if (this.isOpen) return;
    this.isOpen = true;
    this.returnFocus = returnFocus || document.activeElement;
    const backdrop = document.createElement('div');
    backdrop.className = 'voice-settings-backdrop';
    backdrop.innerHTML = `
      <section class="voice-settings-dialog" role="dialog" aria-modal="true" aria-labelledby="voice-settings-title" tabindex="-1">
        <header class="voice-settings-header">
          <div><span class="voice-settings-icon" aria-hidden="true">🗣️</span><h2 id="voice-settings-title">Voz de las explicaciones</h2></div>
          <button class="btn-icon voice-settings-close" type="button" aria-label="Cerrar configuración">✕</button>
        </header>
        <p class="voice-settings-intro">Elige cómo quieres escuchar las explicaciones. Puedes probar las voces antes de guardar.</p>
        <label class="voice-settings-label" for="voice-settings-select">Voz</label>
        <select id="voice-settings-select" class="voice-settings-select"></select>
        <label class="voice-settings-show-all"><input id="voice-settings-all" type="checkbox"> Mostrar voces de otros idiomas</label>
        <p class="voice-settings-meta" id="voice-settings-meta"></p>
        <div class="voice-settings-rate-control">
          <label class="voice-settings-label" for="voice-settings-rate">Velocidad de la voz <output id="voice-settings-rate-value"></output></label>
          <div class="voice-settings-rate-row"><span>Más despacio</span><input id="voice-settings-rate" type="range" min="0.7" max="1.3" step="0.01" value="${this.rate}"><span>Más rápido</span></div>
        </div>
        <div class="voice-settings-preview">
          <button class="btn-primary" id="voice-settings-preview" type="button">▶ Escuchar prueba</button>
          <button class="btn-secondary" id="voice-settings-stop" type="button" disabled>■ Detener</button>
        </div>
        <p class="voice-settings-status" id="voice-settings-status" aria-live="polite"></p>
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
    this.refreshVoiceList(speechManager.getVoices());
    this.unsubscribeVoices = speechManager.subscribe(voices => this.refreshVoiceList(voices));
    backdrop.querySelector('.voice-settings-dialog').focus();
    this.updateRateLabel();
  }

  bindEvents() {
    this.dialog = this.backdrop.querySelector('.voice-settings-dialog');
    this.select = this.backdrop.querySelector('#voice-settings-select');
    this.meta = this.backdrop.querySelector('#voice-settings-meta');
    this.status = this.backdrop.querySelector('#voice-settings-status');
    this.previewButton = this.backdrop.querySelector('#voice-settings-preview');
    this.stopButton = this.backdrop.querySelector('#voice-settings-stop');
    this.saveButton = this.backdrop.querySelector('#voice-settings-save');
    this.rateSlider = this.backdrop.querySelector('#voice-settings-rate');
    this.rateValue = this.backdrop.querySelector('#voice-settings-rate-value');

    this.backdrop.querySelector('.voice-settings-close').addEventListener('click', () => this.close());
    this.backdrop.addEventListener('click', event => {
      if (event.target === this.backdrop) this.close();
    });
    this.select.addEventListener('change', () => this.handleSelectionChange());
    this.rateSlider.addEventListener('input', () => {
      this.rate = Number(this.rateSlider.value);
      this.updateRateLabel();
    });
    this.backdrop.querySelector('#voice-settings-all').addEventListener('change', event => {
      this.showAllVoices = event.target.checked;
      this.refreshVoiceList(speechManager.getVoices());
    });
    this.previewButton.addEventListener('click', () => this.previewVoice());
    this.stopButton.addEventListener('click', () => this.stopPreview());
    this.saveButton.addEventListener('click', () => this.saveSelection());
    this.keyHandler = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        this.close();
      } else if (event.key === 'Tab') {
        this.trapFocus(event);
      }
    };
    document.addEventListener('keydown', this.keyHandler);
  }

  refreshVoiceList(voices) {
    if (!this.isOpen || !this.select) return;
    this.visibleVoices = voices.filter(voice => this.showAllVoices || /^es(?:-|$)/i.test(voice.lang || '') ||
      (this.mode === 'selected' && voiceKeyMatches(voice, this.selectedVoice)));
    this.select.innerHTML = '<option value="auto">Automática — español</option>';
    this.visibleVoices.forEach((voice, index) => {
      const option = document.createElement('option');
      option.value = `voice:${index}`;
      option.textContent = `${voice.name || 'Voz sin nombre'} — ${voice.lang || 'idioma desconocido'}`;
      this.select.append(option);
    });

    let selectedValue = this.mode === 'auto' ? 'auto' : '';
    if (this.mode === 'selected') {
      const index = this.visibleVoices.findIndex(voice => voiceKeyMatches(voice, this.selectedVoice));
      if (index >= 0) {
        selectedValue = `voice:${index}`;
      } else {
        const option = document.createElement('option');
        option.value = 'unavailable';
        option.textContent = `${this.selectedVoice?.name || 'Voz guardada'} — no disponible ahora`;
        this.select.append(option);
        selectedValue = 'unavailable';
      }
    }
    this.select.value = selectedValue;

    const supportsSpeech = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
    this.select.disabled = !supportsSpeech;
    this.previewButton.disabled = !supportsSpeech;
    this.saveButton.disabled = !supportsSpeech;
    if (!supportsSpeech) {
      this.status.textContent = 'Este navegador no admite lectura por voz.';
    } else if (!voices.length) {
      this.status.textContent = 'Cargando voces… Si no aparecen, se intentará usar la voz predeterminada del navegador.';
    } else if (!voices.some(voice => /^es(?:-|$)/i.test(voice.lang || ''))) {
      this.status.textContent = 'No hay voces disponibles en español. Puedes mostrar las voces de otros idiomas.';
    } else if (this.status.textContent.startsWith('Cargando voces') || this.status.textContent.startsWith('No hay voces disponibles en español')) {
      this.status.textContent = '';
    }
    this.updateVoiceMeta();
  }

  handleSelectionChange() {
    this.stopPreview();
    const value = this.select.value;
    if (value === 'auto') {
      this.mode = 'auto';
      this.selectedVoice = null;
    } else if (value.startsWith('voice:')) {
      const index = Number(value.slice(6));
      const voice = this.visibleVoices[index];
      if (voice) {
        this.mode = 'selected';
        this.selectedVoice = {
          voiceURI: voice.voiceURI || '',
          name: voice.name || '',
          lang: voice.lang || ''
        };
      }
    }
    this.status.textContent = '';
    this.updateVoiceMeta();
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

  updateVoiceMeta() {
    if (!this.meta) return;
    const pref = this.currentPreference();
    const voice = speechManager.resolveVoice(pref, speechManager.getVoices(), { fallback: false });
    if (this.mode === 'selected' && !voice) {
      this.meta.textContent = 'La voz guardada no está disponible en este momento; tu elección anterior se conservará si no guardas cambios.';
      return;
    }
    const actualVoice = voice || speechManager.resolveVoice({ mode: 'auto' });
    if (actualVoice) {
      const service = actualVoice.localService === false ? 'Voz en línea (puede necesitar conexión)' : 'Voz local';
      this.meta.textContent = `${this.mode === 'auto' ? 'Selección automática · ' : ''}${actualVoice.lang || 'Idioma desconocido'} · ${service}`;
    } else {
      this.meta.textContent = 'El navegador utilizará su voz predeterminada.';
    }
  }

  previewVoice() {
    this.stopPreview();
    const preference = this.currentPreference();
    const result = speechManager.createUtterance(TEST_TEXT, preference, { fallback: false });
    if (!result) {
      this.status.textContent = 'No se ha podido preparar la prueba de voz.';
      return;
    }
    if (preference.mode === 'selected' && !result.voice) {
      this.status.textContent = 'Esa voz no está disponible ahora. Elige otra o usa la selección automática.';
      return;
    }
    const utterance = result.utterance;
    this.testUtterance = utterance;
    this.previewButton.disabled = true;
    this.stopButton.disabled = false;
    this.status.textContent = `Reproduciendo${result.voice ? `: ${result.voice.name}` : ' con la voz predeterminada'}…`;
    utterance.onend = () => this.finishPreview(utterance, 'Prueba finalizada.');
    utterance.onerror = () => this.finishPreview(utterance, 'No se pudo reproducir esta voz en el navegador.');
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      this.finishPreview(utterance, 'No se pudo iniciar la prueba de voz.');
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
    const stored = speechManager.savePreference(this.currentPreference());
    this.status.textContent = stored
      ? 'Preferencia guardada. Se aplicará a las explicaciones.'
      : 'Se aplicará durante esta sesión, pero el navegador no permitió guardarla para la próxima.';
    this.backdrop.querySelector('#voice-settings-saved').textContent = this.mode === 'auto'
      ? `Voz guardada: Automática · ${this.formatRate(this.rate)}×`
      : `Voz guardada: ${this.selectedVoice.name} · ${this.formatRate(this.rate)}×`;
  }

  trapFocus(event) {
    const focusable = Array.from(this.dialog.querySelectorAll('button:not(:disabled), select:not(:disabled), input:not(:disabled)'));
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
    if (this.keyHandler) document.removeEventListener('keydown', this.keyHandler);
    this.backdrop?.remove();
    this.backdrop = null;
  }
}
