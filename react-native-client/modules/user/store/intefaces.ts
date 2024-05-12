import { RejectedActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { User } from "firebase/auth";

export interface UserApi {
    id: string;
    date: {
      _seconds: number;
      _nanoseconds: number;
    };
    password: string;
    name: string;
    admin: boolean;
    email: string;
    url_image: string;
  }

export interface AuthState {
  isAuth: boolean;
  success: boolean;
  error: any | null
  loading: boolean;
  userData: User | null;
  accessToken: string | null;
  isExpired: boolean | null;

}