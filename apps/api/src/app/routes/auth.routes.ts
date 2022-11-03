/*
    user routes / Auth
    host + /api/v1/auth
*/

import { Router } from 'express';
import { check } from 'express-validator';

import { checkJwt, fieldsValidator } from '../middlewares';
import { credentialsNotValid, emailExists, isValidRole } from '../helpers';
import { googleSignIn, login, register, revalidateToken } from '../controllers';

const router = Router(); // Create a new router

router.post(
  '/register',
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
  register
);

router.post(
  '/login',
  [
    // Middlewares
    check('email', 'Email is required').isEmail(),
    check('email').custom(credentialsNotValid),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
    fieldsValidator,
  ],
  login
);

router.post(
  '/google',
  [check('tokenId').not().isEmpty(), fieldsValidator],
  googleSignIn
);

// Revalidate token
router.get('/renew', checkJwt, revalidateToken);

export default router;
