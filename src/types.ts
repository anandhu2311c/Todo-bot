export interface Message {
  text: string;
  isBot: boolean;
}

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}