const KEY = "muevetechico_admin_token";

export function getAdminToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(KEY);
}

export function setAdminToken(token: string) {
  localStorage.setItem(KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(KEY);
}
