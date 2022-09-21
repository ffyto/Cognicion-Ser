import { connect } from 'mongoose';

async function connectDb() {
  const URI = process.env.MONGODB_URI;
  try {
    connect(URI);

    console.log('Connected to MongoDB!!');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
}

export default connectDb;
