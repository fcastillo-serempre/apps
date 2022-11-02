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
import { checkJwt, fieldsValidator, hasUserRole } from '../middlewares';

const router = Router(); // Create a new router

// Create user
router.post(
  '/create',
  [
    // Middlewares
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

// get User
router.get(
  '/:id',
  [
    // Middlewares
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
    check('role').custom(isValidRole),
    fieldsValidator,
  ],
  editUser
);

// Delete user
router.delete(
  '/:id',
  [
    checkJwt,
    // isAdminRole,
    hasUserRole(UserRole.ADMIN, UserRole.USER),
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(userExistsById),
    fieldsValidator,
  ],
  deleteUser
);

router.get('/', getUsers);

export default router;
