import { Response } from 'express';

import type { User } from '@apps/api-interfaces';

interface HandleUserFromJwt {
  get: () => User;
  set: (user: User) => void;
}

export const handleUserFromJwt = (res: Response): HandleUserFromJwt => {
  return {
    get() {
      const user = <User>res.locals.jwtPayload.user;
      if (!user) {
        throw new Error('user must be sent');
      }
      return user;
    },
    set(user: User) {
      res.locals.jwtPayload = {
        user,
      };
    },
  };
};
