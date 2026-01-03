import { Item, User, Conversation, Message, Mentor, Question, Answer, Review, Notification } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

export const api = {
  items: {
    list: (params?: { category?: string; search?: string }) => {
      const query = new URLSearchParams();
      if (params?.category) query.set("category", params.category);
      if (params?.search) query.set("search", params.search);
      const queryString = query.toString();
      return fetchApi<Item[]>(`/api/items${queryString ? `?${queryString}` : ""}`);
    },
    get: (id: string) => fetchApi<Item>(`/api/items/${id}`),
    create: (data: Partial<Item>) =>
      fetchApi<Item>("/api/items", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Item>) =>
      fetchApi<Item>(`/api/items/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id: string) =>
      fetchApi<void>(`/api/items/${id}`, { method: "DELETE" }),
    updateStatus: (id: string, status: string) =>
      fetchApi<void>(`/api/items/${id}/status?status=${status}`, { method: "PUT" }),
    save: (id: string) =>
      fetchApi<void>(`/api/items/${id}/save`, { method: "POST" }),
    unsave: (id: string) =>
      fetchApi<void>(`/api/items/${id}/save`, { method: "DELETE" }),
    incrementView: (id: string) =>
      fetchApi<void>(`/api/items/${id}/view`, { method: "POST" }),
  },

  users: {
    get: (id: string) => fetchApi<User>(`/api/users/${id}`),
    getCurrent: () => fetchApi<User>("/api/users/me"),
    update: (id: string, data: Partial<User>) =>
      fetchApi<User>(`/api/users/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    getListings: (id: string) => fetchApi<Item[]>(`/api/users/${id}/listings`),
    getReviews: (id: string) => fetchApi<Review[]>(`/api/users/${id}/reviews`),
  },

  auth: {
    register: (data: { cognitoId: string; email: string; firstName: string; lastName: string; university?: string }) =>
      fetchApi<User>("/api/auth/register", { method: "POST", body: JSON.stringify(data) }),
  },

  conversations: {
    list: () => fetchApi<Conversation[]>("/api/conversations"),
    get: (id: string) => fetchApi<Conversation>(`/api/conversations/${id}`),
    create: (data: { participantId: string; itemId?: string; initialMessage?: string }) =>
      fetchApi<Conversation>("/api/conversations", { method: "POST", body: JSON.stringify(data) }),
    getMessages: (id: string) => fetchApi<Message[]>(`/api/conversations/${id}/messages`),
    sendMessage: (id: string, content: string) =>
      fetchApi<Message>(`/api/conversations/${id}/messages`, { method: "POST", body: JSON.stringify({ content }) }),
    markAllRead: (id: string) =>
      fetchApi<void>(`/api/conversations/${id}/messages/read`, { method: "PUT" }),
  },

  messages: {
    markRead: (id: string) =>
      fetchApi<void>(`/api/messages/${id}/read`, { method: "PUT" }),
  },

  mentors: {
    list: (search?: string) => {
      const query = search ? `?search=${encodeURIComponent(search)}` : "";
      return fetchApi<Mentor[]>(`/api/mentors${query}`);
    },
    get: (id: string) => fetchApi<Mentor>(`/api/mentors/${id}`),
    create: (data: { bio?: string; expertise?: string[] }) =>
      fetchApi<Mentor>("/api/mentors", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: { bio?: string; expertise?: string[] }) =>
      fetchApi<Mentor>(`/api/mentors/${id}`, { method: "PUT", body: JSON.stringify(data) }),
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
    create: (data: { title: string; content: string; category: string; courseCode?: string }) =>
      fetchApi<Question>("/api/questions", { method: "POST", body: JSON.stringify(data) }),
    updateStatus: (id: string, status: string) =>
      fetchApi<void>(`/api/questions/${id}/status?status=${status}`, { method: "PUT" }),
    getAnswers: (id: string) => fetchApi<Answer[]>(`/api/questions/${id}/answers`),
    createAnswer: (id: string, content: string) =>
      fetchApi<Answer>(`/api/questions/${id}/answers`, { method: "POST", body: JSON.stringify({ content }) }),
  },

  answers: {
    markHelpful: (id: string) =>
      fetchApi<void>(`/api/answers/${id}/helpful`, { method: "PUT" }),
    endorse: (id: string) =>
      fetchApi<void>(`/api/answers/${id}/endorse`, { method: "PUT" }),
  },

  reviews: {
    create: (userId: string, data: { rating: number; comment?: string; itemId?: string }) =>
      fetchApi<Review>(`/api/users/${userId}/reviews`, { method: "POST", body: JSON.stringify(data) }),
  },

  notifications: {
    list: () => fetchApi<Notification[]>("/api/notifications"),
    getUnreadCount: () => fetchApi<number>("/api/notifications/unread-count"),
    markRead: (id: string) =>
      fetchApi<void>(`/api/notifications/${id}/read`, { method: "PUT" }),
    markAllRead: () =>
      fetchApi<void>("/api/notifications/read-all", { method: "PUT" }),
  },

  images: {
    upload: async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      const res = await fetch(`${API_URL}/api/images/upload`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      return res.json() as Promise<string[]>;
    },
    delete: (url: string) =>
      fetchApi<void>(`/api/images?url=${encodeURIComponent(url)}`, { method: "DELETE" }),
  },
};

export const categories = [
  { value: "textbooks", label: "Textbooks" },
  { value: "electronics", label: "Electronics" },
  { value: "furniture", label: "Furniture" },
  { value: "clothing", label: "Clothing" },
  { value: "notes", label: "Notes" },
  { value: "other", label: "Other" },
];

export const conditions = [
  { value: "new", label: "New" },
  { value: "like-new", label: "Like New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "poor", label: "Poor" },
];
