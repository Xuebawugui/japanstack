"use client";
import { useState } from "react";
import { initiateLineLogin, loginIfNeeded, getProfile, type LiffProfile } from "@/lib/line";
import { createDepositPayment } from "@/lib/payjp";

export default function WeddingPage() {
  const [depositInfo, setDepositInfo] = useState<{ total: number; id: string } | null>(null);
  async function handleLogin() {
    await initiateLineLogin();
    await loginIfNeeded();
  }

  async function handleDeposit() {
    const res = await createDepositPayment({ amount: 5000, currency: "jpy", note: "会場予約内金" });
    if (res?.id) setDepositInfo({ id: String(res.id), total: Number(res.total || 0) });
  }

  return (
    <div className="px-6 py-10 max-w-3xl">
      <h1 className="text-2xl font-semibold">Wedding Venue Booker</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        LINEログインで新郎新婦の本人確認、内金決済で仮予約を確定。
      </p>
      <div className="mt-6 flex gap-3">
        <button onClick={handleLogin} className="rounded-md bg-black text-white px-4 py-2">
          LINEでログイン
        </button>
        <button onClick={handleDeposit} className="rounded-md border px-4 py-2">
          内金5,000円を支払う
        </button>
      </div>
      <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
        <ProfileInfo />
      </div>
      {depositInfo && (
        <div className="mt-4 text-sm">支払いID: {depositInfo.id} 合計: ¥{depositInfo.total}</div>
      )}
    </div>
  );
}

function ProfileInfo() {
  const [name, setName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  async function load() {
    const p = (await getProfile()) as LiffProfile | null;
    if (p?.displayName) setName(p.displayName);
    if (p?.userId) setUserId(p.userId);
  }
  async function sendConfirm() {
    const to = userId;
    if (!to) {
      alert("LINEユーザーIDがありません");
      return;
    }
    await fetch("/api/line/push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, text: "仮予約を受け付けました" }),
    });
    alert("確認メッセージを送信しました");
  }
  return (
    <div>
      <button onClick={load} className="rounded-md border px-3 py-1">プロフィール取得</button>
      {name && <span className="ml-2">ようこそ、{name} さん</span>}
      {userId && (
        <button onClick={sendConfirm} className="ml-3 rounded-md bg-black text-white px-3 py-1">確認メッセージ送信</button>
      )}
    </div>
  );
}