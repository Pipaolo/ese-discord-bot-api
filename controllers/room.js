import Room from "../models/room.js";
import User from "../models/user.js";
import Boom from "@hapi/boom";

export const CreateRoom = async (ctx, next) => {
  const { name: roomName } = ctx.request.body;
  const { user: loggedInUser } = ctx.state;

  const user = await User.findOne({ username: loggedInUser.username });

  if (!user) {
    const error = Boom.badRequest("User not found");
    ctx.throw(error);
    return next();
  }

  const newRoom = new Room({
    name: roomName,
    createdBy: loggedInUser._id,
  });
  try {
    await newRoom.save();
    user.rooms = [...user.rooms, newRoom._id];
    await user.save();
    ctx.status = 200;
    ctx.body = newRoom.toObject();
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
};
export const JoinRoom = async (ctx, next) => {
  try {
    const roomDoc = await Room.findById(ctx.params.id);

    if (!roomDoc) {
      const err = Boom.badData("Room not found!");
      ctx.throw(err);
      return next();
    }

    ctx.body = roomDoc.toObject();
    ctx.status = 200;
  } catch {
    const err = Boom.badRequest("Room not found!");
    ctx.throw(err);
  }
};

export const GetRooms = async (ctx, next) => {
  try {
    const { user } = ctx.state;
    const roomDocs = await Room.find({ createdBy: user._id });

    if (!roomDocs) {
      ctx.body = [];
      ctx.status = 200;
      return next();
    }

    const rooms = roomDocs.map((doc) => doc.toObject());
    ctx.body = rooms;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(error);
  }
};

export const DeleteRoom = async (ctx, next) => {
  try {
    const { id: roomID } = ctx.request.params;
    const room = await Room.findById(roomID);
    if (!room) {
      const err = Boom.badRequest("Room not found!");
      ctx.throw(err);
      return next();
    }

    await Room.deleteOne({ _id: roomID });
    ctx.status = 200;
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
};
