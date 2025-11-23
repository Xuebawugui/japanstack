export async function POST(req: Request) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return Response.json({ text: "APIキー未設定です" });
  try {
    const { topic } = await req.json();
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          { role: "system", content: "丁寧なビジネス日本語で、短く要点をまとめる" },
          { role: "user", content: String(topic || "ご案内文を作成してください") },
        ],
        temperature: 0.4,
      }),
    });
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content || "生成に失敗しました";
    return Response.json({ text });
  } catch {
    return Response.json({ text: "生成に失敗しました" }, { status: 500 });
  }
}