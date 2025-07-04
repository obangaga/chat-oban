export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sk-70d0ef0323e24a27be336d867c2ca82d',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'Kamu adalah OBAN BOT, AI crypto Indonesia yang jago menjelaskan token degen, on-chain data, dan blockchain.' },
          { role: 'user', content: message }
        ],
        temperature: 0.8
      })
    });

    const data = await response.json();

    const reply = data.choices?.[0]?.message?.content || 'Maaf, OBAN BOT bingung jawabnya 🤖';
    res.status(200).json({ reply });
  } catch (err) {
    console.error('Error DeepSeek:', err);
    res.status(500).json({ reply: 'Maaf, OBAN BOT lagi error 😅' });
  }
}
