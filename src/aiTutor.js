/**
 * Tutor con IA para la teoría — clave de API propia
 *
 * La clave se guarda SOLO en localStorage de este navegador y se envía
 * únicamente al proveedor elegido. No hay backend ni telemetría.
 *
 * Aviso: en una web estática cualquier clave usada desde el navegador es
 * accesible para quien controle ese dispositivo. Úsalo solo en equipos de
 * confianza y con claves de bajo límite de gasto.
 */

import { CLAVES, leerJSON, guardarJSON } from './storage.js';

export const AI_PROVIDERS = {
  gemini: {
    id: 'gemini',
    label: 'Google Gemini',
    defaultModel: 'gemini-3.8-flash',
    modelExample: 'gemini-3.8-flash',
    keyPlaceholder: 'AIza...',
    keysUrl: 'https://aistudio.google.com/app/apikey'
  },
  anthropic: {
    id: 'anthropic',
    label: 'Anthropic (Claude)',
    defaultModel: 'claude-haiku-4-5',
    modelExample: 'claude-haiku-4-5',
    keyPlaceholder: 'sk-ant-...',
    keysUrl: 'https://console.anthropic.com/settings/keys'
  },
  openrouter: {
    id: 'openrouter',
    label: 'OpenRouter (muchos modelos)',
    defaultModel: 'google/gemini-2.5-flash',
    modelExample: 'google/gemini-2.5-flash',
    keyPlaceholder: 'sk-or-...',
    keysUrl: 'https://openrouter.ai/keys'
  }
};

export const AI_MAX_QUESTION_LENGTH = 400;
export const AI_MAX_CONTEXT_LENGTH = 9000;
export const AI_TIMEOUT_MS = 120000;

const SYSTEM_PROMPT = [
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

function friendlyHttpError(status) {
  if (status === 400) return 'El proveedor ha rechazado la solicitud. Revisa el modelo elegido en Configuración.';
  if (status === 401 || status === 403) return 'La clave de API no es válida o no tiene permiso. Revísala en Configuración.';
  if (status === 404) return 'El modelo elegido no existe o no está disponible. Cambia el modelo en Configuración.';
  if (status === 429) return 'Se ha alcanzado el límite de uso o no hay saldo en la cuenta del proveedor. Inténtalo más tarde.';
  if (status >= 500) return 'El servicio del proveedor no está disponible ahora mismo. Inténtalo dentro de un rato.';
  return 'No se ha podido obtener la respuesta del proveedor.';
}

async function httpErrorFromResponse(response) {
  let detail = '';
  try {
    detail = (await response.text()).slice(0, 2000).toLowerCase();
  } catch {
    // Respuesta sin cuerpo legible: se usa el mensaje genérico según el estado.
  }
  console.warn('[Tutor IA] Error HTTP del proveedor:', response.status, detail.slice(0, 300));
  const keyProblem = /api[ _-]?key|api_key_invalid|invalid.*key|unauthorized|permission/.test(detail);
  if (keyProblem || response.status === 401 || response.status === 403) {
    return 'La clave de API no es válida o no tiene permiso. Revísala en Configuración.';
  }
  return friendlyHttpError(response.status);
}

function normalizeConfig(raw) {
  const config = raw && typeof raw === 'object' ? raw : {};
  const provider = AI_PROVIDERS[config.provider] ? config.provider : 'gemini';
  return {
    version: 1,
    provider,
    keys: config.keys && typeof config.keys === 'object' ? config.keys : {},
    models: config.models && typeof config.models === 'object' ? config.models : {}
  };
}

export class AiTutor {
  load() {
    return normalizeConfig(leerJSON(CLAVES.tutorIa, null));
  }

  save(config) {
    return guardarJSON(CLAVES.tutorIa, normalizeConfig(config));
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

  /**
   * Convierte lo que escribe el usuario ("3.8 Flash", "models/gemini-3.8-flash")
   * en el ID real de la API ("gemini-3.8-flash").
   */
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
    const tail = key.slice(-4);
    return `••••••${tail}`;
  }

  hasKey() {
    return this.getSettings().hasKey;
  }

  buildPrompt({ question, theoryContext, currentSlide }) {
    const context = String(theoryContext || '').slice(0, AI_MAX_CONTEXT_LENGTH);
    const current = currentSlide ? `Diapositiva que está viendo ahora: ${currentSlide}.\n\n` : '';
    return {
      system: SYSTEM_PROMPT,
      user: `${current}TEORÍA DEL CAPÍTULO:\n${context}\n\nPREGUNTA DEL NIÑO:\n${question}`
    };
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
    const prompt = this.buildPrompt({ question: cleanQuestion, theoryContext, currentSlide });

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);
    const onAbort = () => controller.abort();
    if (signal) signal.addEventListener('abort', onAbort);
    console.info('[Tutor IA] Petición a', providerId, model);

    try {
      const answer = await this.request(providerId, { apiKey, model, ...prompt, signal: controller.signal });
      if (!answer.trim()) throw new Error('El proveedor ha devuelto una respuesta vacía. Prueba a preguntar de otra forma.');
      return answer.trim();
    } catch (error) {
      if (error.name === 'AbortError') {
        if (signal?.aborted) throw new Error('Solicitud cancelada.', { cause: error });
        console.warn('[Tutor IA] Tiempo de espera agotado:', providerId, model, AI_TIMEOUT_MS);
        const mensaje = providerId === 'gemini'
          ? 'La respuesta ha tardado más de 2 minutos. Gemini 3.8 Flash está teniendo mucha latencia estos días: prueba el modelo gemini-3.6-flash o inténtalo más tarde.'
          : 'La respuesta ha tardado más de 2 minutos. Inténtalo de nuevo o cambia de modelo en Configuración.';
        throw new Error(mensaje, { cause: error });
      }
      if (error instanceof TypeError) {
        throw new Error('No se ha podido conectar con el proveedor. Comprueba tu conexión a Internet.', { cause: error });
      }
      throw error;
    } finally {
      clearTimeout(timer);
      if (signal) signal.removeEventListener('abort', onAbort);
    }
  }

  async request(providerId, { apiKey, model, system, user, signal }) {
    if (providerId === 'gemini') return this.requestGemini({ apiKey, model, system, user, signal });
    if (providerId === 'anthropic') return this.requestAnthropic({ apiKey, model, system, user, signal });
    return this.requestOpenRouter({ apiKey, model, system, user, signal });
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
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user }
        ],
        temperature: 0.4,
        max_tokens: 400
      })
    });
    if (!response.ok) throw new Error(await httpErrorFromResponse(response));
    const data = await response.json();
    return data?.choices?.[0]?.message?.content || '';
  }

  async requestGemini({ apiKey, model, system, user, signal }) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
    const generationConfig = { temperature: 0.4, maxOutputTokens: 2048 };
    // Gemini 2.5 Flash: desactivar el "pensamiento" para que no se coma la respuesta.
    if (/^gemini-2\.5-.*flash/i.test(model)) {
      generationConfig.thinkingConfig = { thinkingBudget: 0 };
    } else if (/^gemini-3(?:\.\d+)?/i.test(model)) {
      // Gemini 3.x usa thinkingLevel (minimal/low/medium/high), no thinkingBudget.
      generationConfig.thinkingConfig = { thinkingLevel: 'low' };
    }
    const response = await fetch(url, {
      method: 'POST',
      signal,
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: 'user', parts: [{ text: user }] }],
        generationConfig
      })
    });
    if (!response.ok) throw new Error(await httpErrorFromResponse(response));
    const data = await response.json();
    if (data?.promptFeedback?.blockReason) {
      throw new Error('El proveedor ha bloqueado la respuesta. Prueba a preguntar de otra forma.');
    }
    const candidate = data?.candidates?.[0];
    const parts = candidate?.content?.parts || [];
    const answer = parts.map(part => part.thought ? '' : (part.text || '')).join('');
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
    if (!response.ok) throw new Error(await httpErrorFromResponse(response));
    const data = await response.json();
    const blocks = Array.isArray(data?.content) ? data.content : [];
    return blocks.filter(block => block.type === 'text').map(block => block.text || '').join('');
  }
  async testConnection() {
    return this.ask({
      question: '¿Qué dice la teoría de prueba?',
      theoryContext: 'La teoría de prueba dice: OK.',
      currentSlide: 'Prueba de conexión'
    });
  }
}

export const aiTutor = new AiTutor();
