import { Schema, model } from 'mongoose';

import type { Space as SpaceType } from '@apps/api-interfaces';

const spaceSchema = new Schema<SpaceType>({
  id: {
    type: String,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  emoji: {
    type: String,
    required: [true, 'Emoji is required'],
  },
  published: {
    type: Boolean,
    required: [true, 'Published is required'],
  },
  createdAt: {
    type: Date,
    required: [true, 'Created at is required'],
  },
  updatedAt: {
    type: Date,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
});

spaceSchema.method('toJSON', function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export const Space = model<SpaceType>('Space', spaceSchema);
