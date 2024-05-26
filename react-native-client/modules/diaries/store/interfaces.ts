export interface DiaryApi {
  id: string;
  date: {
    _seconds: number;
    _nanoseconds: number;
  };
  user_id: string;
  description: string;
  title: string;
}

export interface DiaryUI {
  id: string;
  date: string;
  user_id: string;
  description: string;
  title: string;
}
