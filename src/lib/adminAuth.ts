// src/lib/adminAuth.ts

const ADMIN_TOKEN_KEY = "exploremas_admin_token";
const ADMIN_SESSION_KEY = "exploremas_admin_session";

export function getAdminToken(): string | null {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
  localStorage.setItem(ADMIN_SESSION_KEY, "1");
}

export function setAdminSessionLoggedIn() {
  // kalau BE admin_login cuma balikin "Logged in"
  localStorage.setItem(ADMIN_SESSION_KEY, "1");
  if (!localStorage.getItem(ADMIN_TOKEN_KEY)) {
    localStorage.setItem(ADMIN_TOKEN_KEY, "session");
  }
}

export function clearAdminAuth() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_SESSION_KEY);
}

export function isAdminLoggedIn(): boolean {
  return Boolean(
    localStorage.getItem(ADMIN_TOKEN_KEY) ||
      localStorage.getItem(ADMIN_SESSION_KEY)
  );
}
