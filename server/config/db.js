import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = 'mongodb://localhost:27017/';
    console.log('Attempting to connect to local MongoDB...');

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });

    console.log('Successfully connected to local MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    setTimeout(connectDB, 5000);
  }
};

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to local MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected. Reconnecting...');
  setTimeout(connectDB, 5000);
});

export default connectDB;
