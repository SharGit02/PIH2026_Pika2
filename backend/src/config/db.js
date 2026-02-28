import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('🔌 [DB] Connecting to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ [DB] MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ [DB] MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
