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
  date: string;
  user_id: string;
  description: string;
  title: string;
}

export interface DiaryUIWithID extends DiaryUI {
  id: string;
}
