import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  age: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    requires: true,
  },
});

// Create the 'User' model from the schema
const User = mongoose.model('user', userSchema);

// Export the model as default to be used in other files
export default User;
