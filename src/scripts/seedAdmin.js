import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/user.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('MONGO_URI is not set in .env');
  process.exit(1);
}

const adminData = {
  username: 'admin',
  email: 'admin@admin.com',
  password: 'admin@000',
  role: 'admin',
};

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    const admin = await User.create({
      username: adminData.username,
      email: adminData.email,
      password: hashedPassword,
      role: adminData.role,
    });

    process.exit(0);
  } catch (error) {
    console.error('Failed to seed admin user:', error.message);
    process.exit(1);
  }
};

seedAdmin();
