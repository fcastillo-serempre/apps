import mongoose from 'mongoose';

const dbUri = process.env.MONGODB_URI;

export const dbConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(dbUri);
    console.log('Database online');
  } catch (error) {
    console.log(error);
    throw new Error('Error initializing database');
  }
};
