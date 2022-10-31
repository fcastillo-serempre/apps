import { Schema, model } from 'mongoose';

const userSchema = new Schema<{
  name: string;
  email: string;
  password: string;
}>({
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

export const User = model('User', userSchema);
