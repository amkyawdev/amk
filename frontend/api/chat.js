// Vercel serverless API - Chat endpoint
// Proxies to Groq API with server-side key

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get key from server env (not exposed to client)
    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Parse the incoming request body
    const body = await new Promise((resolve) => {
      const chunks = [];
      req.on('data', (chunk) => chunks.push(chunk));
      req.on('end', () => resolve(Buffer.concat(chunks).toString()));
    });

    const parsed = JSON.parse(body);
    
    // Forward to Groq with key
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: parsed.model || 'llama-3.1-8b-instant',
        messages: parsed.messages,
        max_tokens: parsed.max_tokens || 256,
        temperature: parsed.temperature || 0.7,
      }),
    });

    const data = await groqRes.json();
    
    return res.json(data);
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal error' });
  }
}