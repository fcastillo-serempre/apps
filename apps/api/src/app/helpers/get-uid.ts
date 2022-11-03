import { Response } from 'express';
import { Types } from 'mongoose';

export const getIdFromJwt = (res: Response): Types.ObjectId => {
  const uid = res.locals.jwtPayload.user.id;
  if (!uid) {
    throw new Error('id must be sent');
  }
  return uid;
};
