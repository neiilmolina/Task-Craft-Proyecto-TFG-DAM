import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DiaryUIWithID } from "./interfaces";

const diariesSlice = createSlice({
    name: "diaries",
    initialState:[] as DiaryUIWithID[],
    reducers: {
      addDiary: (state, action: PayloadAction<DiaryUIWithID>) => {
        state.push({ ...action.payload });
      },
      editDiary: (state, action: PayloadAction<DiaryUIWithID>) => {
        const index = state.findIndex((diary) => diary.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      },
      deleteDiary: (state, action: PayloadAction<string>) => {
        return state.filter((diary) => diary.id !== action.payload);
      },
      setDiaries: (state, action: PayloadAction<DiaryUIWithID[]>) => {
        return action.payload;
      },
      rollbackDiary: (state, action: PayloadAction<DiaryUIWithID>) => {
        const isDiaryAlreadyDefined = state.some(
          (diary) => diary.id === action.payload.id
        );
        if (!isDiaryAlreadyDefined) {
          // Buscar la posición en la que se debería insertar el nuevo elemento
          const indexToInsert = state.findIndex(
            (diary) => diary.id === action.payload.id
          );
          if (indexToInsert !== -1) {
            // Insertar el nuevo elemento en la posición original usando splice
            state.splice(indexToInsert, 0, action.payload);
          } else {
            // Si no se encuentra la posición, simplemente añadir al final
            state.push(action.payload);
          }
        }
      },
    },
  });
  
  export const { addDiary, editDiary, deleteDiary, setDiaries, rollbackDiary } =
    diariesSlice.actions;
  export default diariesSlice.reducer;