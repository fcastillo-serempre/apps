import { Response, Request } from 'express';

import { getErrorMessage, getUid } from '../helpers';
import { Space } from '../models';

export const getSpaces = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const uid = getUid(res);

  const limit = <number>Number(req.query.limit) || 10;
  const page = <number>Number(req.query.page) || 0;

  try {
    const spaces = await Space.find({
      user: uid,
    })
      .limit(limit)
      .skip(limit * page)
      .populate('user', 'email');

    return res.send({ spaces });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const createSpace = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const space = new Space(req.body);
  const uid = getUid(res);

  try {
    space.user = uid;
    space.createdAt = new Date();
    space.emoji = '🚀';
    space.published = false;

    const savedSpace = await space.save();
    return res.send({ space: savedSpace });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const updateSpace = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const spaceId = req.params.id;
  const uid = getUid(res);

  try {
    const space = await Space.findById(spaceId);

    // Check if space exists
    if (!space) {
      return res.status(404).json({
        message: 'Space not found with id ' + spaceId,
      });
    }

    // Check if the user is the owner of the space
    if (!space.user.equals(uid)) {
      return res.status(401).json({
        message: 'You do not have permission to edit this space',
      });
    }

    // Update space
    const newSpace = req.body;

    newSpace.user = uid;
    newSpace.updatedAt = new Date();

    const updatedSpace = await Space.findByIdAndUpdate(spaceId, newSpace, {
      new: true,
    });

    return res.send({ space: updatedSpace });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const deleteSpace = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const spaceId = req.params.id;
  const uid = getUid(res);

  try {
    const space = await Space.findById(spaceId);

    // Check if space exists
    if (!space) {
      return res.status(404).json({
        message: 'Space not found with id ' + spaceId,
      });
    }

    // Check if the user is the owner of the space
    if (!space.user.equals(uid)) {
      return res.status(401).json({
        message: 'You do not have permission to delete this space',
      });
    }

    // Delete space
    await Space.findByIdAndDelete(spaceId);

    return res.send({ ok: true, space });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};
