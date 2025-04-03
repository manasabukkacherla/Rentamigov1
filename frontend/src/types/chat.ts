export type MessageType = 'user' | 'bot' | 'employee';
export type UserType = 'tenant' | 'agent' | 'unknown';

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
}

export interface PredefinedResponse {
  keywords: string[];
  response: string;
}

export interface ChatState {
  messages: Message[];
  isWaitingForEmployee: boolean;
  employeeResponded: boolean;
  userType: UserType;
}

export interface ChatNotification {
  id: string;
  userId: string;
  userType: UserType;
  messages: Message[];
  status: 'pending' | 'active' | 'resolved';
  timestamp: Date;
  title: string;
}

export interface ChatMessage {
    id: string;
    content: string;
    type: MessageType;
    timestamp: Date;
  }
  
  export interface ChatNotification {
    id: string;
    userId: string;
    userType: UserType;
    messages: Message[];
    status: 'pending' | 'active' | 'resolved';
    timestamp: Date;
    title: string;
  }