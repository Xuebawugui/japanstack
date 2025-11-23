"use client";
import { isHoliday, nextBusinessDay } from "@/lib/jpCalendar";
import { getTestUserId } from "@/lib/line";

export default function SalonPage() {
  const [amount, setAmount] = useState<number>(8000);
  async function calcTax() {
    const res = await fetch("/api/tax", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, tax_rate: 0.1 }),
    });
    const data = await res.json();
    alert(`税込: ¥${data.total} (税額: ¥${data.tax})`);
  }

  function checkDate(d: string) {
    const h = isHoliday(d);
    const nb = nextBusinessDay(d);
    alert(`${d} は${h ? "祝日" : "平日"}。次の営業日は ${nb}`);
  }

  async function sendReminder() {
    const to = getTestUserId();
    if (!to) {
      alert("テスト用ユーザーIDが未設定です");
      return;
    }
    await fetch("/api/line/push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, text: "ご予約のリマインドです" }),
    });
    alert("LINEにリマインドを送信しました");
  }

  return (
    <div className="px-6 py-10 max-w-3xl">
      <h1 className="text-2xl font-semibold">Hair Salon Reservation</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        日本の消費税計算とLINEリマインド通知を想定した予約フロー。
      </p>
      <div className="mt-6">
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="border px-2 py-1 rounded w-32"
          />
          <button onClick={calcTax} className="rounded-md bg-black text-white px-4 py-2">
            税込み料金を計算
          </button>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-2">
        <input type="date" onChange={(e) => checkDate(e.target.value)} className="border px-2 py-1 rounded" />
      </div>
      <div className="mt-6">
        <button onClick={sendReminder} className="rounded-md border px-4 py-2">LINEでリマインド送信</button>
      </div>
    </div>
  );
}