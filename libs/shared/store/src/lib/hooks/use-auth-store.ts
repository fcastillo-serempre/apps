import { UserEntity } from '@apps/models';

import { checkToken, login, logout, PayloadLogin } from '../auth/auth.actions';
import {
  selectAuthStatus,
  selectAuthUser,
  selectAuthErrorMessage,
} from '../auth/auth.selectors';
import { useAppDispatch } from './use-app-dispatch';
import { useAppSelector } from './use-app-selector';

interface UseAuthStore {
  status: string;
  user: UserEntity | undefined;
  errorMessage: string | undefined;

  // Actions
  handleLogin: (user: PayloadLogin) => void;
  handleLogout: () => void;
  handleCheckToken: () => void;
}

export const useAuthStore = (): UseAuthStore => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAuthStatus);
  const user = useAppSelector(selectAuthUser);
  const errorMessage = useAppSelector(selectAuthErrorMessage);

  const handleLogin = (user: PayloadLogin) => {
    dispatch(login(user));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleCheckToken = () => {
    dispatch(checkToken());
  };

  return {
    status,
    user,
    errorMessage,

    // Actions
    handleLogin,
    handleLogout,
    handleCheckToken,
  };
};
