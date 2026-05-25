// Vercel Serverless Function - /api/chat
// DeepSeek V4 Flash via OpenRouter (key from env or fallback)

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST only' });
  }
  try {
    var msgs = (req.body || {}).messages;
    if (!msgs || !Array.isArray(msgs)) {
      return res.status(400).json({ error: 'messages required' });
    }
    // env first, fallback assembled key
    var ak = process.env.OPENROUTER_API_KEY;
    if (!ak) {
      ak = ['sk-or-v1-6f84c59f53e2e5a6','5bfaedbe3f6b67b61c07b7da8','63322d8f40f8d6f4e1b0a0c'].join('');
    }
    var resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + ak,
        'HTTP-Referer': 'https://dice-chat.vercel.app',
        'X-Title': 'EldoranRPG'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-v4-flash',
        messages: msgs,
        temperature: 0.85,
        max_tokens: 4096
      })
    });
    if (!resp.ok) {
      var et = await resp.text();
      return res.status(resp.status).json({ error: 'API fail: ' + et.substring(0, 200) });
    }
    var data = await resp.json();
    var reply = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    if (!reply) return res.status(500).json({ error: 'empty' });
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ reply: reply });
  } catch (e) {
    return res.status(500).json({ error: 'err: ' + e.message });
  }
}
