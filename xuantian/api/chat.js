// Vercel Serverless Function - /api/chat
// Xiaomi MiMo V2.5 Pro via Token Plan

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
    
    var api_key = process.env.MIMO_API_KEY || "tp-c1vwmfnloag52g03op7iaf54ng1d3wnxg8nflksh0sqkbt12";
    var base_url = "https://token-plan-cn.xiaomimimo.com/v1/chat/completions";
    
    var resp = await fetch(base_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + api_key,
        'api-key': api_key
      },
      body: JSON.stringify({
        model: 'mimo-v2.5-pro',
        messages: msgs,
        temperature: 0.8,
        max_tokens: 4096,
        top_p: 0.9
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