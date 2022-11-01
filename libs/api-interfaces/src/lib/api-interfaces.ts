import { Types } from 'mongoose';

export interface Token {
  uid: string;
  name: string;
}

//
// User model
//

export interface BaseUser {
  email: string;
  password: string;
}
export interface User extends BaseUser {
  name: string;
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
