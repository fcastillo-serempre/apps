/*
    user routes / Auth
    host + /api/v1/auth
*/

import { Router } from 'express';
import { check } from 'express-validator';

import {
  createUser,
  deleteUser,
  editUser,
  getUsers,
  loginUser,
  revalidateToken,
} from '../controllers';
import {
  credentialsNotValid,
  emailExists,
  isValidRole,
  userExistsById,
} from '../helpers';
import { checkJwt, fieldsValidator } from '../middlewares';

const router = Router(); // Create a new router

// Create user
router.post(
  '/new',
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

// Login user
router.post(
  '/',
  [
    // Middlewares
    check('email', 'Email is required').isEmail(),
    check('email').custom(credentialsNotValid),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
    fieldsValidator,
  ],
  loginUser
);

// Edit user
router.put(
  '/:id',
  [
    // Middlewares
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(userExistsById),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
    check('role').custom(isValidRole),
    fieldsValidator,
  ],
  editUser
);

// Delete user
router.delete(
  '/:id',
  [
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(userExistsById),
    fieldsValidator,
  ],
  deleteUser
);

router.get('/', getUsers);

// Revalidate token
router.get('/renew', checkJwt, revalidateToken);

export default router;
