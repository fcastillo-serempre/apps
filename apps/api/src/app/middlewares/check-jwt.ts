import { Response, Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import { Token } from '../helpers';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  // Read token
  const token = <string>req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'There is no token in the request',
    });
  }

  try {
    const jwtPayload = <Token>jwt.verify(token, process.env.JWT_SECRET);

    // (req as CustomRequest).token = jwtPayload;
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    console.error(error);
    res.status(401).json({
      ok: false,
      message: 'Token is not valid',
    });
    return;
  }

  next();
};
