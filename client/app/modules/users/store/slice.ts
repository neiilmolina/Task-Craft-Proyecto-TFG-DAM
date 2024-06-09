import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserUIWithId } from "./interfaces"

const userSlice = createSlice({
  name: "users",
  initialState: [] as UserUIWithId[] ,
  reducers: {
    addUser: (state, action: PayloadAction<UserUIWithId>) => {
      state.push({...action.payload});
    },
    editUser: (state, action: PayloadAction<UserUIWithId>) => {
      const index = state.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      return state.filter((user) => user.id !== action.payload);
    },
    setUsers: (state, action: PayloadAction<UserUIWithId[]>) => {
      return action.payload;
    }
  },
});

export const { addUser, editUser, deleteUser, setUsers } = userSlice.actions;
export default userSlice.reducer;
