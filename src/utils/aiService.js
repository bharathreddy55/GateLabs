// Universal Multi-Provider AI Service Utility
// Supports: Google Gemini, OpenAI, Anthropic Claude, and OpenRouter

export const PROVIDERS = {
  gemini: {
    name: 'Google Gemini',
    models: ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'],
    defaultModel: 'gemini-1.5-flash',
    placeholder: 'AIzaSy...'
  },
  openai: {
    name: 'OpenAI',
    models: ['gpt-4o-mini', 'gpt-4o', 'gpt-3.5-turbo'],
    defaultModel: 'gpt-4o-mini',
    placeholder: 'sk-proj-...'
  },
  anthropic: {
    name: 'Anthropic Claude',
    models: ['claude-3-5-sonnet-20240620', 'claude-3-haiku-20240307'],
    defaultModel: 'claude-3-5-sonnet-20240620',
    placeholder: 'sk-ant-...'
  },
  openrouter: {
    name: 'OpenRouter (Free & Paid Models)',
    models: ['google/gemini-2.0-flash-exp:free', 'meta-llama/llama-3.3-70b-instruct:free', 'openai/gpt-4o-mini'],
    defaultModel: 'google/gemini-2.0-flash-exp:free',
    placeholder: 'sk-or-v1-...'
  }
};

export function getAiConfig() {
  const provider = localStorage.getItem('ai_provider') || 'gemini';
  const apiKey = (localStorage.getItem('ai_api_key') || localStorage.getItem('gemini_api_key') || '').trim();
  const model = localStorage.getItem('ai_model') || PROVIDERS[provider]?.defaultModel || 'gemini-1.5-flash';
  return { provider, apiKey, model };
}

export function getApiKey() {
  const { apiKey } = getAiConfig();
  return apiKey || null;
}

export function saveAiConfig(provider, apiKey, model) {
  const p = provider || 'gemini';
  const key = (apiKey || '').trim();
  const m = model || PROVIDERS[p]?.defaultModel;

  localStorage.setItem('ai_provider', p);
  if (key) {
    localStorage.setItem('ai_api_key', key);
    localStorage.setItem('gemini_api_key', key); // Backward compatibility
  } else {
    localStorage.removeItem('ai_api_key');
    localStorage.removeItem('gemini_api_key');
  }
  if (m) {
    localStorage.setItem('ai_model', m);
  }
}

export async function testApiKey(provider, apiKey, model) {
  const p = provider || 'gemini';
  const key = (apiKey || '').trim();
  const m = model || PROVIDERS[p]?.defaultModel;

  if (!key) {
    return { success: false, error: 'No API key provided.' };
  }

  try {
    if (p === 'gemini') {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${key}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: 'Respond with OK.' }] }] })
      });
      if (res.ok) return { success: true, modelUsed: m };
      const err = await res.json().catch(() => ({}));
      return { success: false, error: err.error?.message || `HTTP ${res.status}` };
    }

    if (p === 'openai' || p === 'openrouter') {
      const baseUrl = p === 'openai' ? 'https://api.openai.com/v1/chat/completions' : 'https://openrouter.ai/api/v1/chat/completions';
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      };
      if (p === 'openrouter') {
        headers['HTTP-Referer'] = window.location.origin;
        headers['X-Title'] = 'GateLabs';
      }

      const res = await fetch(baseUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: m,
          messages: [{ role: 'user', content: 'Respond with OK.' }],
          max_tokens: 10
        })
      });
      if (res.ok) return { success: true, modelUsed: m };
      const err = await res.json().catch(() => ({}));
      return { success: false, error: err.error?.message || err.message || `HTTP ${res.status}` };
    }

    if (p === 'anthropic') {
      const url = 'https://api.anthropic.com/v1/messages';
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': key,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: m,
          messages: [{ role: 'user', content: 'Respond with OK.' }],
          max_tokens: 10
        })
      });
      if (res.ok) return { success: true, modelUsed: m };
      const err = await res.json().catch(() => ({}));
      return { success: false, error: err.error?.message || `HTTP ${res.status}` };
    }
  } catch (err) {
    return { success: false, error: err.message };
  }

  return { success: false, error: 'Provider test failed.' };
}

export async function generateContent(promptText, options = {}) {
  const { provider, apiKey, model } = getAiConfig();

  if (!apiKey) {
    throw new Error('No AI API key is configured. Please set your API key in AI Configuration.');
  }

  if (provider === 'openai' || provider === 'openrouter') {
    const baseUrl = provider === 'openai' ? 'https://api.openai.com/v1/chat/completions' : 'https://openrouter.ai/api/v1/chat/completions';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };
    if (provider === 'openrouter') {
      headers['HTTP-Referer'] = window.location.origin;
      headers['X-Title'] = 'GateLabs';
    }

    const res = await fetch(baseUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: model || (provider === 'openai' ? 'gpt-4o-mini' : 'google/gemini-2.0-flash-exp:free'),
        messages: [{ role: 'user', content: promptText }],
        temperature: options.temperature ?? 0.2
      })
    });

    if (res.ok) {
      const data = await res.json();
      const text = data.choices?.[0]?.message?.content;
      if (text) return { text, modelUsed: model };
    } else {
      const errData = await res.json().catch(() => ({}));
      throw new Error(`${PROVIDERS[provider]?.name || provider} API Error: ${errData.error?.message || res.statusText}`);
    }
  }

  if (provider === 'anthropic') {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: model || 'claude-3-5-sonnet-20240620',
        messages: [{ role: 'user', content: promptText }],
        max_tokens: options.maxTokens ?? 4096
      })
    });

    if (res.ok) {
      const data = await res.json();
      const text = data.content?.[0]?.text;
      if (text) return { text, modelUsed: model };
    } else {
      const errData = await res.json().catch(() => ({}));
      throw new Error(`Anthropic API Error: ${errData.error?.message || res.statusText}`);
    }
  }

  // Default: Google Gemini
  const GEMINI_MODELS = [model, 'gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'].filter(Boolean);
  let lastError = null;

  for (const m of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${apiKey}`;
      const body = {
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: options.generationConfig || {
          temperature: options.temperature ?? 0.2,
          maxOutputTokens: options.maxTokens ?? 8192
        }
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return { text, modelUsed: m };
      } else {
        const errData = await res.json().catch(() => ({}));
        const errorMsg = errData.error?.message || `HTTP ${res.status} ${res.statusText}`;
        lastError = errorMsg;

        if (res.status === 400 && errorMsg.toLowerCase().includes('api key')) {
          throw new Error(`Invalid Gemini API Key: ${errorMsg}`);
        }
      }
    } catch (err) {
      if (err.message.includes('Invalid Gemini API Key')) throw err;
      lastError = err.message;
    }
  }

  throw new Error(`Gemini AI Generation failed: ${lastError || 'Unknown error'}`);
}
