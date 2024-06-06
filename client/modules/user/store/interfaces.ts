
export interface UserApi {
  id: string;
  admin: boolean;
  date: {
    _seconds: number;
    _nanoseconds: number;
  };
  createDiary: boolean;
}

export interface UserUI{
  admin: boolean;
  date: string;
  createDiary: boolean;
}

export interface UserUIWithId extends UserUI {
  id: string;
}