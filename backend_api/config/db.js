import { connect, Schema, model } from 'mongoose';

// Connect to the local MongoDB database
const connectDB = async () => {
  try {
    await connect('mongodb://localhost:27017/SmartBrain', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to the local MongoDB database!');
  } catch (err) {
    console.error(err);
  }
}

connectDB();

const userSchema = new Schema({
  email: String,
  password: String,
});

const User = model('User', userSchema);

export default User;
