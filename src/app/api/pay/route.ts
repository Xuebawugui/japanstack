export async function POST(req: Request) {
  const secret = process.env.PAYJP_SECRET_KEY;
  try {
    const { amount, currency, note } = await req.json();
    const base = typeof amount === "number" ? amount : 0;
    const tax = Math.round(base * 0.1);
    const total = base + tax;
    if (!secret) {
      return Response.json({ id: "stub", amount: base, tax, total, currency: currency || "jpy", note });
    }
    return Response.json({ id: "stub", amount: base, tax, total, currency: currency || "jpy", note });
  } catch {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }
}