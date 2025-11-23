export type LiffProfile = { userId: string; displayName: string; pictureUrl?: string };
type Liff = {
  init: (opts: { liffId: string }) => Promise<void>;
  isLoggedIn: () => boolean;
  login: () => void;
  getProfile: () => Promise<LiffProfile>;
};

export async function initiateLineLogin() {
  const channelId = process.env.NEXT_PUBLIC_LINE_CHANNEL_ID;
  if (!channelId) {
    alert("LINEの設定が未入力です");
    return;
  }
  if (typeof window === "undefined") return;
  const w = window as Window & { liff?: Liff };
  if (!w.liff) {
    await loadLiffScript();
  }
  if (!w.liff) return;
  await w.liff.init({ liffId: channelId });
}

export async function loginIfNeeded() {
  const w = window as Window & { liff?: Liff };
  if (!w.liff) return;
  if (!w.liff.isLoggedIn()) {
    w.liff.login();
  }
}

export async function getProfile() {
  const w = window as Window & { liff?: Liff };
  if (!w.liff) return null;
  try {
    const p = await w.liff.getProfile();
    return p;
  } catch {
    return null;
  }
}

async function loadLiffScript() {
  await new Promise<void>((resolve) => {
    const s = document.createElement("script");
    s.src = "https://static.line-scdn.net/liff/edge/2/sdk.js";
    s.onload = () => resolve();
    document.head.appendChild(s);
  });
}

export function getTestUserId() {
  return process.env.NEXT_PUBLIC_LINE_TEST_USER_ID || "";
}