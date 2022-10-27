import mongoose from 'mongoose';

const URI = process.env.NEXT_PUBLIC_MONGO_URI;

export default function connectDb() {
  try {
    mongoose.connect(URI);

    console.log('Connected to MongoDB!!');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
}
