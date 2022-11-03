/*
    user routes / Auth
    host + /api/v1/auth
*/

import { Router } from 'express';
import { check } from 'express-validator';

import { UserRole } from '@apps/api-interfaces';

import {
  createUser,
  deleteUser,
  editUser,
  getUser,
  getUsers,
} from '../controllers';
import { emailExists, isValidRole, userExistsById } from '../helpers';
import {
  checkJwt,
  fieldsValidator,
  hasUserRole,
  isAdminRole,
} from '../middlewares';

const router = Router(); // Create a new router

// Create user
router.post(
  '/create',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('email').custom(emailExists),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
    check('role').custom(isValidRole),
    fieldsValidator,
  ],
  createUser
);

// Get User
router.get(
  '/:id',
  [
    checkJwt,
    hasUserRole(UserRole.ADMIN, UserRole.USER),

    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(userExistsById),
    fieldsValidator,
  ],
  getUser
);

// Edit user
router.put(
  '/:id',
  [
    checkJwt,
    hasUserRole(UserRole.ADMIN, UserRole.USER),

    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(userExistsById),
    check('email', 'Email is required').isEmail().optional(),
    check('password', 'Password must be at least 6 characters')
      .isLength({
        min: 6,
      })
      .optional(),
    check('role').custom(isValidRole).optional(),
    fieldsValidator,
  ],
  editUser
);

// Delete user
router.delete(
  '/:id',
  [
    checkJwt,
    hasUserRole(UserRole.ADMIN, UserRole.USER),

    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(userExistsById),
    fieldsValidator,
  ],
  deleteUser
);

router.get('/', [checkJwt, isAdminRole], getUsers);

export default router;
