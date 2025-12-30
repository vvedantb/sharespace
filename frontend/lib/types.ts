export type Category = "textbooks" | "electronics" | "furniture" | "clothing" | "notes" | "other";
export type Condition = "new" | "like-new" | "good" | "fair" | "poor";
export type ItemStatus = "active" | "sold" | "removed";

export interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  condition: Condition;
  status: ItemStatus;
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  university: string;
  courseCode?: string;
  createdAt: string;
  views: number;
  saves: number;
  isMentorRecommended: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  university: string;
  course: string;
  yearOfStudy: number;
  bio: string;
  rating: number;
  itemsListed: number;
  itemsSold: number;
  isMentor: boolean;
  isVerified: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  itemId?: string;
  itemTitle?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  sentAt: string;
  isRead: boolean;
}

export interface Mentor {
  id: string;
  userId: string;
  name: string;
  university: string;
  course: string;
  bio: string;
  expertise: string[];
  rating: number;
  endorsements: number;
  totalAnswers: number;
  helpfulAnswers: number;
  isVerified: boolean;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  askerId: string;
  askerName: string;
  category: "academic" | "student-life" | "course-advice" | "textbook-recommendation";
  courseCode?: string;
  status: "open" | "answered" | "closed";
  createdAt: string;
  answerCount: number;
}

export interface Answer {
  id: string;
  questionId: string;
  mentorId: string;
  mentorName: string;
  content: string;
  helpfulCount: number;
  isEndorsed: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  reviewerId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: "message" | "sale" | "question" | "answer" | "endorsement" | "review";
  title: string;
  description: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}
