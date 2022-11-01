import type { UserEntity } from '@apps/models';

export type AuthStatus = 'checking' | 'not-authenticated' | 'authenticated';

export type AuthState = {
  errorMessage?: string;
  status: AuthStatus;
  user?: UserEntity;
};
