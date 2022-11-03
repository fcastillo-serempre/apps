import { Response, Request } from 'express';
import * as bcrypt from 'bcryptjs';

import { User } from '../models';
import { getErrorMessage, handleUserFromJwt } from '../helpers';

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password, name, role } = req.body;

  try {
    let user = await User.findOne({ email });

    // Create user with model
    user = new User({
      email,
      name,
      password,
      role,
    }); // Ignores params not in schema

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Save user
    await user.save();

    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const editUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const authenticatedUser = handleUserFromJwt(res).get();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    // Encrypt password
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest, {
    new: true,
  });

  return res.status(200).json({ user, authenticatedUser });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const authenticatedUser = handleUserFromJwt(res).get();

  try {
    /* const user = await User.findByIdAndDelete(id); // Physical delete */
    const user = await User.findByIdAndUpdate(
      id,
      { status: false },
      {
        new: true,
      }
    ); // Logical delete

    return res.status(200).json({ user, authenticatedUser });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const limit = <number>Number(req.query.limit) || 10;
  const page = <number>Number(req.query.page) || 0;
  const query = { status: true };

  try {
    const [total, users] = await Promise.all([
      User.countDocuments(query), // Total documents
      User.find(query)
        .limit(limit)
        .skip(limit * page), // Documents to show
    ]);

    if (users.length === 0) {
      return res.status(400).json({
        message: 'No users found',
      });
    }

    return res.status(200).json({
      total,
      users,
    });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};
