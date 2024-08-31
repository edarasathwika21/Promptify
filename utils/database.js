import mongoose from 'mongoose';

// Track if MongoDB is already connected
let isConnected = false;

export const connectToDB = async () => {
  // Set options for Mongoose
  mongoose.set('strictQuery', true); // Handle deprecation warnings

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MongoDB URI is not defined in environment variables');
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt', // Ensure this is the correct database name
      useNewUrlParser: true,  // Handle deprecated URL parser
      useUnifiedTopology: true, // Handle deprecated connection management
      // Other options can be added here if needed
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw new Error('Failed to connect to MongoDB');
  }
};
