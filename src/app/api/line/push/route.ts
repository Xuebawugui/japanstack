export async function POST(req: Request) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) return Response.json({ error: "missing_token" }, { status: 400 });
  try {
    const { to, text } = await req.json();
    const res = await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ to, messages: [{ type: "text", text }] }),
    });
    const data = await res.json().catch(() => ({}));
    return Response.json({ ok: res.ok, data }, { status: res.status });
  } catch {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }
}