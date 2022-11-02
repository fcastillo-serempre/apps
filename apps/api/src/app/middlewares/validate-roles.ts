import type { NextFunction, Response, Request } from 'express';

import { UserRole } from '@apps/api-interfaces';

import { handleUserFromJwt } from '../helpers';

export const isAdminRole = (
  _: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const user = handleUserFromJwt(res).get();

  if (!user) {
    return res.status(500).json({
      message: 'Role wants to be checked without checking token',
    });
  }

  const { role, name } = user;

  if (role !== UserRole.ADMIN) {
    return res.status(401).json({
      message: `${name} is not an admin`,
    });
  }

  next();
};

export const hasUserRole = (...roles) => {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    const user = handleUserFromJwt(res).get();

    if (!roles.includes(user.role)) {
      return res.status(401).json({
        message: `Service requires one of the following roles: ${roles}`,
      });
    }

    next();
  };
};
