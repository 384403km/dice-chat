// Vercel Serverless Function - /api/chat
// 使用 OpenRouter 中转 DeepSeek V4 Flash

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

    // 从环境变量读取 API Key（必须在 Vercel 中配置）
    const API_KEY = process.env.OPENROUTER_API_KEY;
    if (!API_KEY) {
      return res.status(500).json({ error: '未配置 OPENROUTER_API_KEY 环境变量' });
    }

    const API_BASE = 'https://openrouter.ai/api/v1/chat/completions';

    const r = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_KEY,
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
      const errText = await r.text();
      console.error('API error:', r.status, errText);
      return res.status(r.status).json({ error: 'API调用失败: ' + errText.substring(0, 200) });
    }

    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({ error: 'AI返回为空' });
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ reply });

  } catch (e) {
    console.error('Server error:', e);
    return res.status(500).json({ error: '后端错误: ' + e.message });
  }
}
