import mongoose from 'mongoose';
import { dbUrl } from './config.js';

export async function connectDB() {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('--- Connected to the database');
    return mongoose.connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error disconnecting from the database', error);
  }
}
