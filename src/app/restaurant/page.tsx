"use client";
import { useState } from "react";
import { generateJapaneseCopy } from "@/lib/groq";

export default function RestaurantPage() {
  const [topic, setTopic] = useState<string>("おまかせ予約のご案内");
  const [result, setResult] = useState<string>("");
  async function handleCopy() {
    const text = await generateJapaneseCopy({ topic });
    setResult(text);
  }

  return (
    <div className="px-6 py-10 max-w-3xl">
      <h1 className="text-2xl font-semibold">Japanese Restaurant Omakase</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        丁寧な日本語の案内文をAIで生成し、おまかせ予約体験を向上。
      </p>
      <div className="mt-6 flex items-center gap-2">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border px-2 py-1 rounded w-80"
        />
        <button onClick={handleCopy} className="rounded-md border px-4 py-2">日本語の案内文を生成</button>
      </div>
      {result && <p className="mt-4 whitespace-pre-wrap">{result}</p>}
    </div>
  );
}