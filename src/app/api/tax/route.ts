export async function POST(req: Request) {
  try {
    const { amount, tax_rate } = await req.json();
    const rate = typeof tax_rate === "number" ? tax_rate : 0.1;
    const base = typeof amount === "number" ? amount : 0;
    const tax = Math.round(base * rate);
    const total = base + tax;
    return Response.json({ amount: base, tax_rate: rate, tax, total });
  } catch {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }
}