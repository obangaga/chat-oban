export default async function handler(req, res) {
  const apiKey = "sk-70d0ef0323e24a27be336d867c2ca82d"; // Gunakan .env kalau nanti lebih aman
  const { message } = await req.json();

  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "You are ObanBot, a crypto degen expert who answers with a touch of sarcasm." },
          { role: "user", content: message }
        ],
        temperature: 0.8
      })
    });

    const data = await response.json();
    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ reply: "Maaf, OBAN BOT lagi error 😅" });
  }
}
