// src/lib/auth.ts
const TOKEN_KEY = "exploremas_token";
const ALT_TOKEN_KEY = "token"; // kalau sebelumnya kamu simpan di key "token"
const SESSION_KEY = "exploremas_session"; // buat BE yang gak ngasih token (misal admin_login)

export function getToken(): string | null {
  return (
    localStorage.getItem(TOKEN_KEY) ||
    localStorage.getItem(ALT_TOKEN_KEY) ||
    null
  );
}

export function setToken(token: string) {
  // token beneran
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(SESSION_KEY, "1");
}

export function setSessionLoggedIn() {
  // untuk kasus BE balikin "Logged in" tanpa token
  localStorage.setItem(SESSION_KEY, "1");
  // kasih dummy token biar konsisten dengan flow lama
  if (!localStorage.getItem(TOKEN_KEY)) {
    localStorage.setItem(TOKEN_KEY, "session");
  }
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ALT_TOKEN_KEY);
  localStorage.removeItem(SESSION_KEY);
}

export function isLoggedIn(): boolean {
  // valid kalau punya token (asli/dummy) atau session flag
  return Boolean(getToken() || localStorage.getItem(SESSION_KEY));
}
