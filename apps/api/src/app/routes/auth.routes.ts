/*
    user routes / Auth
    host + /api/v1/auth
*/

import { Router } from 'express';
import { check } from 'express-validator';

import { createUser, loginUser, revalidateToken } from '../controllers';
import { credentialsNotValid, emailExists, isValidRole } from '../helpers';
import { checkJwt, fieldsValidator } from '../middlewares';

const router = Router(); // Create a new router

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

router.get('/renew', checkJwt, revalidateToken);

export default router;
