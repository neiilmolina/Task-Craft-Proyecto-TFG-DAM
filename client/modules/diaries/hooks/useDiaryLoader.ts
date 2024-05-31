import { useAppDispatch, useAppSelector } from "../../../store/hooks/store";
import { useEffect } from "react";
import { useDiaryActions } from "./useDiaryActions";
import { fetchDiaries } from "../store/initialDiaries";

const useDiaryLoader = () => {
  const dispatch = useAppDispatch();
  const diaries = useAppSelector((state) => state.diaries);
  const { updateDiaries } = useDiaryActions();

  useEffect(() => {
    const loadDiaries = async () => {
      try {
        const fetchedDiaries = await fetchDiaries();
        updateDiaries(fetchedDiaries);
      } catch (error) {
        console.error("Hubo un problema al cargar los diarios:", error);
      }
    };

    loadDiaries();
  }, [dispatch]);

  return diaries;
};

export default useDiaryLoader;
