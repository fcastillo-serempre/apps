import { Types } from 'mongoose';

export interface Token {
  id: Types.ObjectId;
  name: string;
}

//
// User model
//

export enum UserRole {
  ADMIN = 'ADMIN_ROLE',
  USER = 'USER_ROLE',
}

type Role = UserRole.ADMIN | UserRole.USER;

export interface BaseUser {
  email: string;
  password: string;
  role: Role;
  status: boolean;
  google: boolean;
}
export interface User extends BaseUser {
  id: Types.ObjectId;
  name: string;
  photoURL?: string;
}
//
// Space model
//
export type SpaceId = string;

export interface Space {
  id: SpaceId;
  title: string;
  emoji: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  user: Types.ObjectId;
}
