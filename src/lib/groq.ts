type CopyInput = { topic: string };

export async function generateJapaneseCopy(input: CopyInput) {
  const res = await fetch("/api/groq", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic: input.topic }),
  });
  const data = await res.json();
  return String(data.text || "生成に失敗しました");
}