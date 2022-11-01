import { Response, Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import type { Token } from '@apps/api-interfaces';
import { getEnvVariables } from '@apps/helpers';

const { jwtSecret } = getEnvVariables();

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  // Read token
  const token = <string>req.header('x-token');

  if (!token) {
    return res.status(401).json({
      message: 'There is no token in the request',
    });
  }

  try {
    const jwtPayload = <Token>jwt.verify(token, jwtSecret);

    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: 'Token is not valid',
    });
    return;
  }

  next();
};
