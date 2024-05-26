import { Middleware } from "@reduxjs/toolkit";
import { Rootstate } from "../index";
import { config } from "dotenv";
import {
  rollbackDiary,
  deleteDiary,
  editDiary,
} from "../../modules/diaries/store/slice";
import { DiaryUI, DiaryApi } from "../../modules/diaries/store/interfaces";

const URL = "http://192.168.56.1:2508"; // process.env.API_URL;

const syncWithDatabaseMiddlewareDiaries: Middleware =
  (store: any) => (next: any) => (action: any) => {
    const { type, payload } = action;
    const previousState = store.getState() as Rootstate;
    next(action);

    if (type === "diaries/addDiary") {
      const newDiary = payload as DiaryUI;

      fetch(`${URL}/diaries`, {
        method: "POST",
        body: JSON.stringify(newDiary),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to add diary");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Diary added successfully:", data);
        })
        .catch((error) => {
          console.error("Error adding diary:", error);
          // Optional: dispatch an action to handle the error
        });
    }

    if (type === "diaries/editDiary") {
      const editedDiary = payload as DiaryUI;
      const editedDiaryId = payload.id;
      const diaryToEdit = previousState.diaries.find(
        (diary) => diary.id === editedDiaryId
      );

      fetch(`${URL}/diaries/${editedDiaryId}`, {
        method: "PUT",
        body: JSON.stringify(editedDiary),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to edit diary");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Diary edited successfully:", data);
        })
        .catch((error) => {
          console.error("Error editing diary:", error);
          if (diaryToEdit) {
            store.dispatch(editDiary(diaryToEdit));
          }
        });
    }

    if (type === "diaries/deleteDiary") {
      const diaryId = payload as string;
      const diaryToRemove = previousState.diaries.find(
        (diary) => diary.id === diaryId
      );

      fetch(`${URL}/diaries/${diaryId}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to delete diary");
          }
          console.log("Diary deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting diary:", error);
          if (diaryToRemove) {
            store.dispatch(rollbackDiary(diaryToRemove));
          }
        });
    }
  };

export default syncWithDatabaseMiddlewareDiaries;
