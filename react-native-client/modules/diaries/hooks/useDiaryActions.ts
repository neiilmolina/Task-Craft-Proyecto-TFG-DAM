import { useAppDispatch } from "../../../store/hooks/store";
import {
  addDiary,
  editDiary,
  deleteDiary,
  setDiaries,
} from "../store/slice";
import { DiaryUIWithID, DiaryUI } from "../store/interfaces";

export const useDiaryActions = () => {
  const dispatch = useAppDispatch();

  const addNewDiary = ({ id, date, user_id, description, title }: DiaryUIWithID) => {
    const isoDate = new Date(date).toISOString();
    dispatch(addDiary({ id, date: isoDate, user_id, description, title }));
  };

  const editExistingDiary = (
    diaryId: string,
    { date, user_id, description, title }: DiaryUI
  ) => {
    dispatch(
      editDiary({ id: diaryId, ...{ date, user_id, description, title } })
    );
  };

  const removeDiary = (diaryId: string) => {
    dispatch(deleteDiary(diaryId));
  };

  const updateDiaries = (diaries: DiaryUIWithID[]) => {
    dispatch(setDiaries(diaries));
  };

  return { addNewDiary, editExistingDiary, removeDiary, updateDiaries };
};
