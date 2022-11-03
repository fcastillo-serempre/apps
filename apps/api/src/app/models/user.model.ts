import { Schema, model } from 'mongoose';

import { type User as UserType, UserRole } from '@apps/api-interfaces';

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
  role: {
    type: String,
    default: UserRole.USER,
    enum: [UserRole.ADMIN, UserRole.USER],
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
  photoURL: {
    type: String,
  },
});

userSchema.method('toJSON', function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id, password, ...object } = this.toObject();
  object.id = _id;

  return object;
});

export const User = model<UserType>('User', userSchema);
