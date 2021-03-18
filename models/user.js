import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rooms: [
    {
      type: Schema.ObjectId,
      ref: "Room",
    },
  ],
});

export default model("User", UserSchema);
