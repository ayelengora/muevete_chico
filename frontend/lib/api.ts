import type { Combo, HomePayload, InquiryPayload, Post, Review, SiteSettings } from "./types";

export function apiBase() {
  if (typeof window === "undefined") {
    return process.env.API_URL || "http://127.0.0.1:43124";
  }
  return "";
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${apiBase()}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...(init?.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...(init?.headers || {}),
    },
  });

  if (!res.ok) {
    let message = "Algo salió mal";
    try {
      const data = await res.json();
      message = data.error || data.errors?.join(", ") || message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  home: () => request<HomePayload>("/api/v1/home"),
  settings: () => request<SiteSettings>("/api/v1/settings"),
  posts: () => request<Post[]>("/api/v1/posts"),
  post: (slug: string) => request<Post>(`/api/v1/posts/${slug}`),
  combos: () => request<Combo[]>("/api/v1/combos"),
  combo: (slug: string) => request<Combo>(`/api/v1/combos/${slug}`),
  reviews: () => request<Review[]>("/api/v1/reviews"),
  createReview: (payload: Partial<Review>) =>
    request<{ review: Review; message: string }>("/api/v1/reviews", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  createInquiry: (payload: InquiryPayload) =>
    request<{ message: string }>("/api/v1/inquiries", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

export function adminRequest<T>(
  path: string,
  token: string,
  init?: RequestInit
): Promise<T> {
  return request<T>(path, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
  });
}
