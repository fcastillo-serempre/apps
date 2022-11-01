import { AuthState } from '../auth/auth.types';

export const authInitialState: AuthState = {
  status: 'checking',
  errorMessage: undefined,
  user: undefined,
};
