import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserApp } from "./interfaces"

const userSlice = createSlice({
  name: "users",
  initialState: [] as UserApp[] ,
  reducers: {
    addUser: (state, action: PayloadAction<UserApp>) => {
      state.push({...action.payload});
    },
    editUser: (state, action: PayloadAction<UserApp>) => {
      const index = state.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      return state.filter((user) => user.id !== action.payload);
    },
    setUsers: (state, action: PayloadAction<UserApp[]>) => {
      return action.payload;
    }
  },
});

export const { addUser, editUser, deleteUser, setUsers } = userSlice.actions;
export default userSlice.reducer;
