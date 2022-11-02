import { Response, Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import type { Token } from '@apps/api-interfaces';
import { getEnvVariables } from '@apps/helpers';

import { User } from '../models';
import { handleUserFromJwt } from '../helpers';

const { jwtSecret } = getEnvVariables();

export const checkJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Read token
  const token = <string>req.header('x-token');

  if (!token) {
    return res.status(401).json({
      message: 'There is no token in the request',
    });
  }

  try {
    const { id } = <Token>jwt.verify(token, jwtSecret);

    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json({
        message: 'Token is not valid - user does not exist in DB',
      });
    }

    if (!user.status) {
      return res.status(401).json({
        message: 'Token is not valid - user is disabled',
      });
    }

    handleUserFromJwt(res).set(user);
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: 'Token is not valid',
    });
    return;
  }

  next();
};
