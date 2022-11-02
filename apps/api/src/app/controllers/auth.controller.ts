import { Response, Request } from 'express';
import * as bcrypt from 'bcryptjs';

import { User } from '../models';
import { generateToken, getErrorMessage } from '../helpers';

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

    // Generate JWT
    const token = await generateToken({
      uid: user.id,
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

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: 'Password is incorrect',
      });
    }

    const { id, name } = user;

    // Generate JWT
    const token = await generateToken({
      uid: id,
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

export const editUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    // Encrypt password
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  return res.status(200).json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    /* const user = await User.findByIdAndDelete(id); // Physical delete */
    const user = await User.findByIdAndUpdate(id, { status: false }); // Logical delete

    return res.status(200).json(user);
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

export const revalidateToken = async (_, res: Response): Promise<Response> => {
  // console.log(res.locals.jwtPayload);
  const { id, name } = res.locals.jwtPayload;

  // Generate JWT
  const token = await generateToken({
    uid: id,
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
