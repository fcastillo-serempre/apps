/*
    user routes / Spaces
    host + /api/v1/spaces
*/

import { Router } from 'express';
import { check } from 'express-validator';

import {
  createSpace,
  deleteSpace,
  getSpaces,
  updateSpace,
} from '../controllers';

import { checkJwt, fieldsValidator } from '../middlewares';

const router: Router = Router();

// All spaces should be private
router.use(checkJwt);

// Get spaces
router.get('/', getSpaces);

// Create space
router.post(
  '/',
  [
    // Middlewares
    check('title', 'Title is required').not().isEmpty(),
    fieldsValidator,
  ],
  createSpace
);

// Update space
router.put(
  '/:id',
  [check('title', 'Title is required').not().isEmpty(), fieldsValidator],
  updateSpace
);

// Delete space
router.delete('/:id', deleteSpace);

export default router;
