import { Router } from 'express';
import { check } from 'express-validator';

import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from '../controllers';
import {
  categoryExistsById,
  categoryExistsByIdAndActive,
  categoryExistsByName,
} from '../helpers';
import { checkJwt, fieldsValidator, isAdminRole } from '../middlewares';

const router = Router();

// Get categories
router.get('/', getCategories);

// Get category by id
router.get(
  '/:id',
  [
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(categoryExistsById),
    fieldsValidator,
  ],
  getCategoryById
);

// Create category
router.post(
  '/',
  [
    checkJwt,
    check('name', 'Name is required').not().isEmpty(),
    check('name').custom(categoryExistsByName),
    fieldsValidator,
  ],
  createCategory
);

// Edit category
router.put(
  '/:id',
  [
    checkJwt,
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(categoryExistsById),
    check('id').custom(categoryExistsByIdAndActive),
    check('name').custom(categoryExistsByName).optional(),
    fieldsValidator,
  ],
  updateCategory
);

// Delete category
router.delete(
  '/:id',
  [
    checkJwt,
    isAdminRole,
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(categoryExistsById),
    check('id').custom(categoryExistsByIdAndActive),
    fieldsValidator,
  ],
  deleteCategory
);

export default router;
