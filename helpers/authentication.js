import passport from "koa-passport";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { Strategy } from "passport-local";

passport.use(
  new Strategy((username, password, done) => {
    // Fetch the user from the database.
    User.findOne({ username })
      .then(async (doc) => {
        // Check if password matches
        const validPassword = await bcrypt.compare(password, doc.password);
        if (validPassword) {
          return done(null, doc.toObject(), {
            message: "Login Success!",
          });
        } else {
          return done(null, null, {
            message: "Incorrect Username and Password",
          });
        }
      })
      .catch(() => {
        return done(null, null, {
          message: "Incorrect Username and Password",
        });
      });
  })
);
