import passport from "koa-passport";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import Boom from "@hapi/boom";
import { generateJWTToken } from "../helpers/jwt.js";

export const Login = async (ctx) => {
  return passport.authorize("local", async (err, user, info, status) => {
    if (err) {
      ctx.throw(err);
    }
    // User is Authorized
    if (user) {
      // Generate JWT Token
      delete user["password"];
      const jwt = await generateJWTToken(user);
      ctx.status = 200;
      ctx.body = {
        ...user,
        token: jwt,
      };
    } else {
      const err = Boom.badRequest("Invalid Username/Password!");
      ctx.throw(err);
    }
  })(ctx);
};

export const Register = async (ctx) => {
  const { username, password } = ctx.request.body;

  if (username === "" || password === "") {
    const err = Boom.badRequest("Password or Username cannot be empty");
    ctx.throw(err);
  }

  // Check if there is an exiting user
  let user = await User.findOne({ username });

  // There is an existing user
  if (user) {
    const err = Boom.badRequest("Existing Username!");
    ctx.throw(err);
    return;
  }
  // Create new user
  user = new User({
    username,
    password,
  });

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  try {
    await user.save();
    const userObj = user.toObject();
    delete userObj["password"];
    ctx.status = 201;
    ctx.body = userObj;
  } catch (err) {
    ctx.throw(err);
  }
};
