import Boom from "@hapi/boom";
import User from "../models/user.js";

export const FetchUser = async (ctx, next) => {
  // Get User
  const { user: loggedInUser } = ctx.state;

  const user = await User.findOne({ username: loggedInUser.username }).populate(
    "rooms"
  );

  if (!user) {
    const err = Boom.badRequest("User does not exist!");
    ctx.throw(err);
    return;
  }

  const userObj = user.toObject();

  // Remove password from the response body
  delete userObj["password"];
  ctx.status = 200;
  ctx.body = userObj;
};
