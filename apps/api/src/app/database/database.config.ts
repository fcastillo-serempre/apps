import mongoose from 'mongoose';

import { getEnvVariables } from '@apps/helpers';

const { dbUri } = getEnvVariables();

export const dbConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(dbUri);
    console.log('Database online');
  } catch (error) {
    console.log(error);
    throw new Error('Error initializing database');
  }
};
