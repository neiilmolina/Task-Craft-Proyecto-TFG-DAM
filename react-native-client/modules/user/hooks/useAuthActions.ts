import { useAppDispatch } from "../../../store/hooks/store";
import { login, logout } from "../store/slice.auth";

const useAuthActions = () => {
  const dispatch = useAppDispatch();

  const authLogin = () => {
    dispatch(login());
  };

  const authLogout = () => {
    dispatch(logout());
  };

  return { authLogin, authLogout };
};

export default useAuthActions;
