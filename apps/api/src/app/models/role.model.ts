import { Schema, model } from 'mongoose';

interface RoleType {
  role: string;
}

const roleSchema = new Schema<RoleType>({
  role: {
    type: String,
    required: [true, 'Role is required'],
  },
});

export const Role = model<RoleType>('Role', roleSchema);
