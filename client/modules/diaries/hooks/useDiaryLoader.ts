import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/store";
import { fetchDiaries } from "../store/initialDiaries";
import { useDiaryActions } from "./useDiaryActions";

const useDiaryLoader = () => {
  const dispatch = useAppDispatch();
  const diaries = useAppSelector((state) => state.diaries);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { updateDiaries } = useDiaryActions();

  useEffect(() => {
    const loadDiaries = async () => {
      try {
        setLoading(true);
        const fetchedDiaries = await fetchDiaries();
        updateDiaries(fetchedDiaries);
        setLoading(false);
      } catch (error) {
        console.error("Hubo un problema al cargar los diarios:", error);
        setError("Hubo un problema al cargar los diarios.");
        setLoading(false);
      }
    };

    loadDiaries();
  }, []);

  return { diaries, loading, error };
};

export default useDiaryLoader;
