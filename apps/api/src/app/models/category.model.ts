import { Schema, model } from 'mongoose';

import { Category as CategoryType } from '@apps/api-interfaces';

const categorySchema = new Schema<CategoryType>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

categorySchema.method('toJSON', function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;

  return object;
});

export const Category = model<CategoryType>('Category', categorySchema);
