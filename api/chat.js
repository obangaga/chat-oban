// File: /api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { message } = req.body;

  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer sk-70d0ef0323e24a27be336d867c2ca82d",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "You are OBAN BOT, a smart crypto degen assistant with cyberpunk attitude." },
        { role: "user", content: message }
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "Maaf, OBAN BOT lagi error 😅";
  res.status(200).json({ reply });
}
