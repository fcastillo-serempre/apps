import { Response } from 'express';
import { Types } from 'mongoose';

export const getUid = (res: Response): Types.ObjectId => {
  const uid = res.locals.jwtPayload.uid;
  if (!uid) {
    throw new Error('uid must be sent');
  }
  return uid;
};
