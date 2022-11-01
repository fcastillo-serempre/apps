import { Response, Request } from 'express';
import * as bcrypt from 'bcryptjs';

import { User } from '../models';
import { generateToken, getErrorMessage } from '../helpers';

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    // Check if user exists
    if (user) {
      return res.status(400).json({
        message: 'A user already exists with that email',
      });
    }

    // Create user with model
    user = new User(req.body);

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Save user
    await user.save();
    const { id: uid, name } = user;

    // Generate JWT
    const token = await generateToken({
      uid,
      name,
    });

    return res.status(201).json({
      uid,
      name,
      token,
      email,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).json({
        message: 'User or password are incorrect',
      });
    }

    // Check password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: 'Password is incorrect',
      });
    }

    const { id: uid, name } = user;

    // Generate JWT
    const token = await generateToken({
      uid,
      name,
    });

    return res.status(200).json({
      token,
      id: uid,
      name,
      email,
    });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const revalidateToken = async (_, res: Response): Promise<Response> => {
  // console.log(res.locals.jwtPayload);
  const { uid, name } = res.locals.jwtPayload;

  // Generate JWT
  const token = await generateToken({
    uid,
    name,
  });

  return res.json({ id: uid, name, token });
};
