import mongoose from 'mongoose';

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
   dbName:"new-task"
    });
    console.log('Database connected successfully 👍👍');
  } catch (error) {
    console.error('Database connection error 🚨🚨🚨', error.message);
    process.exit(1); 
  }
};

export default dbConnection;
