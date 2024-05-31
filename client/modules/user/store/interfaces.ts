interface GeneralUser {
  id: string;
  name: string;
  admin: boolean;
  url_image: string;
}

export interface UserApi extends GeneralUser {
  date: {
    _seconds: number;
    _nanoseconds: number;
  };
}

export interface UserApp extends GeneralUser{
  date: string;
}