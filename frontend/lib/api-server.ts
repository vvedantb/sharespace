import { Item, User, Conversation, Message, Mentor, Question, Answer, Review, Notification } from "./types";

function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT || 3000}`;
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${getBaseUrl()}${endpoint}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

export const serverApi = {
  items: {
    list: (params?: { category?: string; search?: string }) => {
      const query = new URLSearchParams();
      if (params?.category) query.set("category", params.category);
      if (params?.search) query.set("search", params.search);
      const queryString = query.toString();
      return fetchApi<Item[]>(`/api/items${queryString ? `?${queryString}` : ""}`);
    },
    get: (id: string) => fetchApi<Item>(`/api/items/${id}`),
  },
  users: {
    get: (id: string) => fetchApi<User>(`/api/users/${id}`),
    getListings: (id: string) => fetchApi<Item[]>(`/api/users/${id}/listings`),
  },
  mentors: {
    list: (search?: string) => {
      const query = search ? `?search=${encodeURIComponent(search)}` : "";
      return fetchApi<Mentor[]>(`/api/mentors${query}`);
    },
    get: (id: string) => fetchApi<Mentor>(`/api/mentors/${id}`),
  },
  questions: {
    list: (params?: { search?: string; category?: string }) => {
      const query = new URLSearchParams();
      if (params?.search) query.set("search", params.search);
      if (params?.category) query.set("category", params.category);
      const queryString = query.toString();
      return fetchApi<Question[]>(`/api/questions${queryString ? `?${queryString}` : ""}`);
    },
    get: (id: string) => fetchApi<Question>(`/api/questions/${id}`),
    getAnswers: (id: string) => fetchApi<Answer[]>(`/api/questions/${id}/answers`),
  },
  notifications: {
    list: () => fetchApi<Notification[]>("/api/notifications"),
  },
  conversations: {
    list: () => fetchApi<Conversation[]>("/api/conversations"),
    getMessages: (id: string) => fetchApi<Message[]>(`/api/conversations/${id}/messages`),
  },
};
