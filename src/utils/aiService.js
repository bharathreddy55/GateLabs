// Centralized Gemini AI Service Utility with Model Fallback & Validation

export const GEMINI_MODELS = [
  'gemini-1.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-pro',
  'gemini-1.5-flash-latest'
];

export function getApiKey() {
  const key = localStorage.getItem('gemini_api_key');
  return key ? key.trim() : null;
}

export function saveApiKey(key) {
  if (key && key.trim()) {
    localStorage.setItem('gemini_api_key', key.trim());
  } else {
    localStorage.removeItem('gemini_api_key');
  }
}

export async function testApiKey(keyToTest) {
  const key = (keyToTest || getApiKey() || '').trim();
  if (!key) {
    return { success: false, error: 'No API key provided.' };
  }

  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Respond with OK.' }] }]
        })
      });

      if (res.ok) {
        return { success: true, modelUsed: model };
      } else {
        const errData = await res.json().catch(() => ({}));
        const msg = errData.error?.message || `HTTP ${res.status} ${res.statusText}`;
        if (res.status === 400 && msg.toLowerCase().includes('api key')) {
          return { success: false, error: 'Invalid API Key. Check key permissions in Google AI Studio.' };
        }
      }
    } catch (err) {
      console.warn(`Test error for model ${model}:`, err.message);
    }
  }

  return { success: false, error: 'Could not connect to Gemini API. Please check your network connection or API key.' };
}

export async function generateContent(promptText, options = {}) {
  const key = getApiKey();
  if (!key) {
    throw new Error('Gemini API key is not configured. Please set your API key in AI Configuration.');
  }

  let lastError = null;

  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
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
        if (text) {
          return { text, modelUsed: model };
        }
      } else {
        const errData = await res.json().catch(() => ({}));
        const errorMsg = errData.error?.message || `HTTP ${res.status} ${res.statusText}`;
        lastError = errorMsg;

        if (res.status === 400 && errorMsg.toLowerCase().includes('api key')) {
          throw new Error(`Invalid Gemini API Key: ${errorMsg}`);
        }
        if (res.status === 429) {
          throw new Error('Gemini API Rate Limit exceeded. Please wait a moment and try again.');
        }
      }
    } catch (err) {
      if (err.message.includes('Invalid Gemini API Key') || err.message.includes('Rate Limit')) {
        throw err;
      }
      lastError = err.message;
    }
  }

  throw new Error(`Gemini AI Generation failed: ${lastError || 'Unknown error'}`);
}
