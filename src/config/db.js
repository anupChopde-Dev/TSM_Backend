import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
//   const uri = 'mongodb://localhost:27017/TSM';
  if (!uri) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('MongoDB connected');
};

export default connectDB;
