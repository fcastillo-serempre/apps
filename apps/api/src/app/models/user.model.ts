import { Schema, model } from 'mongoose';

import type { User as UserType } from '@apps/api-interfaces';

const userSchema = new Schema<UserType>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
});

export const User = model<UserType>('User', userSchema);
