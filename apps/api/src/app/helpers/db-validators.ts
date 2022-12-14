import { Category, Role, User } from '../models';
// import * as bcrypt from 'bcryptjs';

export const isValidRole = async (role: string) => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`Role '${role}' does not exist`);
  }
};

export const emailExists = async (email: string) => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error(`Email '${email}' already exists`);
  }
};

export const credentialsNotValid = async (email: string) => {
  const emailExists = await User.findOne({ email, status: true });
  if (!emailExists) {
    throw new Error(`User or password are incorrect`);
  }
};

export const userExistsById = async (id: string) => {
  const userExists = await User.findById(id);
  if (!userExists) {
    throw new Error(`User with id '${id}' does not exist`);
  }
};

export const categoryExistsByName = async (query: string) => {
  const name = query.toUpperCase();

  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    throw new Error(`Category '${name}' already exists`);
  }
};

export const categoryExistsById = async (id: string) => {
  const categoryExists = await Category.findById(id);
  if (!categoryExists) {
    throw new Error(`Category with id '${id}' does not exist`);
  }
};

export const categoryExistsByIdAndActive = async (id: string) => {
  const categoryExists = await Category.findById(id);
  if (!categoryExists || !categoryExists.status) {
    throw new Error(`Category with id '${id}' is not active`);
  }
};

// export const passwordNotValid = async (email: string, password: string) => {
//   const user = await User.findOne({ email });
//   const validPassword = bcrypt.compareSync(password, user.password);
//   if (!validPassword) {
//     throw new Error(`Password is incorrect`);
//   }
// };
