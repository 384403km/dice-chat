export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '请用POST请求' });
  }
  const { messages } = req.body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: '缺少messages数组' });
  }
  const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'sk-32fc46067f5a4631a957c8abff7a1ec0';
  const DEEPSEEK_BASE = 'https://api.deepseek.com/v1/chat/completions';
  const MODEL = 'deepseek-chat';
  try {
    const r = await fetch(DEEPSEEK_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + DEEPSEEK_API_KEY },
      body: JSON.stringify({ model: MODEL, messages: messages, temperature: 0.85, max_tokens: 4096 })
    });
    if (!r.ok) {
      const errText = await r.text();
      return res.status(r.status).json({ error: 'DeepSeek调用失败: ' + errText.substring(0, 200) });
    }
    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) return res.status(500).json({ error: 'AI返回为空' });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).json({ reply });
  } catch (e) {
    return res.status(500).json({ error: '后端错误: ' + e.message });
  }
}
