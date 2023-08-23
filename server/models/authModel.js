import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  locker: {
    type: String,
  },
  rfid: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  tutorial: {
    type: Boolean,
  },

});

const authModel = mongoose.model("user", authSchema);
export default authModel;
