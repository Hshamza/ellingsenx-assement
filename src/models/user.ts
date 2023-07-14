import mongoose, { Document, Schema } from 'mongoose';

// Define the User schema
interface UserSchema extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

// Create the User model
const User = mongoose.model<UserSchema>('User', userSchema);

export default User;
