import { UserEntity } from '@apps/models';

import {
  asyncCheckToken,
  asyncLogin,
  asyncLoginWithGoogle,
  asyncLogout,
  PayloadLogin,
} from '../auth/auth.actions';
import {
  selectAuthStatus,
  selectAuthUser,
  selectAuthErrorMessage,
} from '../auth/auth.selectors';
import { AuthStatus } from '../auth/auth.types';
import { useAppDispatch } from './use-app-dispatch';
import { useAppSelector } from './use-app-selector';

interface UseAuthStore {
  status: AuthStatus;
  user: UserEntity | undefined;
  errorMessage: string | undefined;

  // Actions
  handleLogin: (user: PayloadLogin) => void;
  handleLogout: () => void;
  handleCheckToken: () => void;
  handleLoginWithGoogle: (tokenId: string) => void;
}

export const useAuthStore = (): UseAuthStore => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAuthStatus);
  const user = useAppSelector(selectAuthUser);
  const errorMessage = useAppSelector(selectAuthErrorMessage);

  const handleLogin = (user: PayloadLogin) => {
    dispatch(asyncLogin(user));
  };

  const handleLogout = () => {
    dispatch(asyncLogout());
  };

  const handleCheckToken = () => {
    dispatch(asyncCheckToken());
  };

  const handleLoginWithGoogle = (tokenId: string) => {
    dispatch(asyncLoginWithGoogle(tokenId));
  };

  return {
    status,
    user,
    errorMessage,

    // Actions
    handleLogin,
    handleLogout,
    handleCheckToken,
    handleLoginWithGoogle,
  };
};
