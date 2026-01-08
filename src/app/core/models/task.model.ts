export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 1 | 2 | 3 | 4 | 5;
  dueDate: Date;
  completed: boolean;
  userId: string;
  createdAt: Date;
}

export type PriorityLevel = 1 | 2 | 3 | 4 | 5;