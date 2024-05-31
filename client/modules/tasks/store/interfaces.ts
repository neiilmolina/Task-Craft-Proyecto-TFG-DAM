export interface TaskApi {
    id: string;
    date: {
      _seconds: number;
      _nanoseconds: number;
    };
    user_id: string;
    title: string;
    category: string;
    description?: string;
    completed: boolean;
  
}

export interface TaskUI {
  date: string;
  user_id: string;
  description: string;
  completed: boolean;
  title: string;
  category: string;
}

export interface TaskUIWithID extends TaskUI{
  id: string;
}