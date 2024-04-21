import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, Rootstate } from "../index";

export const useAppSelector: TypedUseSelectorHook<Rootstate> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
