import mongoose from 'mongoose';
const uri = process.env.ATLAS_URI || "";

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
