import mongoose from "mongoose";

const connectDB = async () => {
  const res = await mongoose.connect(
    "mongodb+srv://daffeyd:daffeyd@cluster0.ytznq4r.mongodb.net/dataEntity?retryWrites=true&w=majority"
  );
  if (res) {
    console.log("connected Successfully");
  }
};

export default connectDB;
