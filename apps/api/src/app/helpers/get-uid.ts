import { Response } from 'express';
import { Types } from 'mongoose';

export const getUid = (res: Response): Types.ObjectId => {
  const uid = res.locals.jwtPayload.id;
  if (!uid) {
    throw new Error('id must be sent');
  }
  return uid;
};
