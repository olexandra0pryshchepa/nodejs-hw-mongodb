import 'dotenv/config';
import setupServer from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();
    console.log("MongoDB connected successfully");
    setupServer();
  } catch (error) {
      console.error("MongoDB connection error:", error.message);
      console.log(process.env.MONGODB_USER);
      console.log('MONGODB_USER:', process.env.MONGODB_USER);
console.log('MONGODB_PASSWORD:', process.env.MONGODB_PASSWORD);
  }
};

bootstrap();
