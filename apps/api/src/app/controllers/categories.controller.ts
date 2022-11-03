import { Response, Request } from 'express';

import { Category as CategoryType } from '@apps/api-interfaces';

import { getErrorMessage, getIdFromJwt, handleUserFromJwt } from '../helpers';
import { Category } from '../models';

// ✅ Public
export const getCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const limit = <number>Number(req.query.limit) || 10;
  const page = <number>Number(req.query.page) || 0;

  try {
    const [total, categories] = await Promise.all([
      Category.countDocuments(),
      Category.find()
        .limit(limit)
        .skip(limit * page)
        .populate('user', 'name'),
    ]);

    if (categories.length === 0) {
      return res.status(404).json({
        msg: 'No categories found',
      });
    }

    return res.status(200).json({ total, categories });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

// ✅ Public
export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id).populate('user', 'name');

    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

// ✅ Private - Every with valid token
export const createCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const name = req.body.name.toUpperCase();

  try {
    const id = getIdFromJwt(res);

    const category = new Category({
      name,
      user: id,
    });

    await category.save();

    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

// ✅ Edit category - Private - Every with valid token
export const updateCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, status, ...rest } = <CategoryType>req.body;

  const authenticatedUser = handleUserFromJwt(res).get();

  if (rest.name) {
    rest.name = rest.name.toUpperCase();
  }

  try {
    const category = await Category.findByIdAndUpdate(id, rest, {
      new: true,
    });

    return res.send({ category, authenticatedUser });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

// ✅ Private - Admin
export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const user = handleUserFromJwt(res).get();

  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );

    return res.send({ category, user });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};
