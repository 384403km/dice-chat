export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '请用POST请求' });
  }
  const { messages } = req.body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: '缺少messages数组' });
  }
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  if (!OPENROUTER_API_KEY) {
    return res.status(500).json({ error: '未配置OPENROUTER_API_KEY环境变量' });
  }
  const MODEL = 'anthropic/claude-3.5-haiku';
  try {
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + OPENROUTER_API_KEY, 'HTTP-Referer': req.headers.origin || 'https://roll-chat.vercel.app', 'X-Title': 'Roll Chat' },
      body: JSON.stringify({ model: MODEL, messages: messages, temperature: 0.85, max_tokens: 400 })
    });
    if (!r.ok) { const errText = await r.text(); return res.status(r.status).json({ error: 'AI调用失败: ' + errText.substring(0, 200) }); }
    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) return res.status(500).json({ error: 'AI返回为空' });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).json({ reply });
  } catch (e) { return res.status(500).json({ error: '后端错误: ' + e.message }); }
}