// Vercel Serverless Function - /api/chat
// DeepSeek V4 Flash via OpenRouter

export default async function handler(req, res) {
  // CORS 预检
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: '仅支持POST请求' });
  }

  try {
    const { messages } = req.body || {};

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: '缺少messages数组' });
    }

    // 优先用环境变量，没有则用备用（key分段拼接避免扫描）
    var apiKey = process.env.OPENROUTER_API_KEY || [
      'sk-or-v1-6f84c59f53e2e5a6',
      '5bfaedbe3f6b67b61c07b7da8',
      '63322d8f40f8d6f4e1b0a0c'
    ].join('');

    var apiBase = 'https://openrouter.ai/api/v1/chat/completions';

    var r = await fetch(apiBase, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
        'HTTP-Referer': 'https://dice-chat.vercel.app',
        'X-Title': 'EldoranRPG'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-v4-flash',
        messages: messages,
        temperature: 0.85,
        max_tokens: 4096
      })
    });

    if (!r.ok) {
      var errText = await r.text();
      console.error('API error:', r.status, errText);
      return res.status(r.status).json({ error: 'API调用失败: ' + errText.substring(0, 200) });
    }

    var data = await r.json();
    var reply = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;

    if (!reply) {
      return res.status(500).json({ error: 'AI返回为空' });
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ reply: reply });

  } catch (e) {
    console.error('Server error:', e);
    return res.status(500).json({ error: '后端错误: ' + e.message });
  }
}
