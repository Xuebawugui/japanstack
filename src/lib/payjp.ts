type PaymentInput = { amount: number; currency: string; note?: string };

export async function createDepositPayment(input: PaymentInput) {
  const res = await fetch("/api/pay", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = await res.json();
  alert(`支払いID: ${data.id} 合計: ¥${data.total}`);
  return data;
}