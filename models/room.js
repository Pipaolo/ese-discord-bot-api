import mongoose from "mongoose";

const { Schema, model } = mongoose;

const RoomSchema = new Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
});

export default model("Room", RoomSchema);
