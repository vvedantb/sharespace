export type Category = "TEXTBOOKS" | "ELECTRONICS" | "FURNITURE" | "CLOTHING" | "NOTES" | "OTHER";
export type Condition = "NEW" | "LIKE_NEW" | "GOOD" | "FAIR" | "POOR";
export type ItemStatus = "ACTIVE" | "SOLD" | "REMOVED";

export interface Item {
  id: string;
  title: string;
  description: string | null;
  price: number;
  category: Category;
  condition: Condition;
  status: ItemStatus;
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerRating?: number;
  university?: string | null;
  courseCode?: string | null;
  createdAt: string;
  views: number;
  saves: number;
  isMentorRecommended?: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string | null;
  avatarUrl: string | null;
  university: string | null;
  course: string | null;
  yearOfStudy: number | null;
  graduationYear: number | null;
  bio: string | null;
  rating?: number;
  itemsListed?: number;
  itemsSold?: number;
  isMentor?: boolean;
  isVerified?: boolean;
  hasCompletedOnboarding?: boolean;
  isAdmin?: boolean;
  createdAt?: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  lastMessage: string | null;
  lastMessageTime: string;
  unread: boolean;
  itemId?: string | null;
  itemTitle?: string | null;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  sentAt: string;
  isRead: boolean;
}

export type MentorStatus = "PENDING" | "APPROVED" | "REJECTED";
export type MentorType = "STUDENT" | "ALUMNI";

export interface Mentor {
  id: string;
  userId: string;
  name: string;
  university: string | null;
  course: string | null;
  bio: string | null;
  expertise: string[];
  rating: number;
  endorsements: number;
  totalAnswers: number;
  helpfulAnswers: number;
  isVerified: boolean;
  status: MentorStatus;
  mentorType: MentorType;
}

export type QuestionCategory = "ACADEMIC" | "STUDENT_LIFE" | "COURSE_ADVICE" | "TEXTBOOK_RECOMMENDATION";
export type QuestionStatus = "OPEN" | "ANSWERED" | "CLOSED";

export interface Question {
  id: string;
  title: string;
  content: string;
  askerId: string;
  askerName: string;
  category: QuestionCategory;
  courseCode?: string | null;
  status: QuestionStatus;
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

export type NotificationType = "MESSAGE" | "SALE" | "QUESTION" | "ANSWER" | "ENDORSEMENT" | "REVIEW";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string | null;
  isRead: boolean;
  createdAt: string;
  link?: string | null;
}
