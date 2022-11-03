import { Response, Request } from 'express';
import * as bcrypt from 'bcryptjs';

import {
  generateToken,
  getErrorMessage,
  handleUserFromJwt,
  verifyGoogle,
} from '../helpers';
import { User } from '../models';

export const register = async (
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

    // Generate JWT
    const token = await generateToken({
      id: user.id,
      name,
    });

    return res.status(201).json({
      token,
      user,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // console.log(user.google);
    // if (user.google) {
    //   return res.status(400).json({
    //     message: 'Use your Google account to login',
    //   });
    // }

    // Check password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: 'Password is incorrect',
      });
    }

    const { id, name } = user;

    const token = await generateToken({
      id,
      name,
    });

    return res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const googleSignIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const tokenId = <string>req.body.tokenId;

  try {
    const { email, name, picture } = await verifyGoogle(tokenId);

    let user = await User.findOne({ email });

    if (!user) {
      // Create user
      user = new User({
        name,
        email,
        password: ':P',
        photoURL: picture,
        google: true,
      });

      await user.save();
    }

    if (!user.status) {
      return res.status(401).json({
        message: 'User is not active',
      });
    }

    const token = await generateToken({
      id: user.id,
      name,
    });

    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const revalidateToken = async (_, res: Response): Promise<Response> => {
  const { id, name } = handleUserFromJwt(res).get();

  // Generate JWT
  const token = await generateToken({
    id,
    name,
  });

  const user = await User.findById(id);

  if (!user) {
    return res.status(400).json({
      message: 'User not found',
    });
  }

  return res.json({ token, user });
};
