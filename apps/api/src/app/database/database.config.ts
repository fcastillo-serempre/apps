import mongoose from 'mongoose';

import { config } from '../config';

const dbUri = config.db.uri;

export const dbConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(dbUri);
    console.log('Database online');
  } catch (error) {
    console.log(error);
    throw new Error('Error initializing database');
  }
};
