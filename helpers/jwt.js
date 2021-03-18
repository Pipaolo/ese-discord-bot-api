import { config } from "./config.js";
import jwt from "jsonwebtoken";

export const generateJWTToken = async (payload) => {
  try {
    const token = jwt.sign(payload, config.JWT_PASSWORD, {
      expiresIn: "1h",
    });
    return Promise.resolve(token);
  } catch (err) {
    return Promise.reject(err);
  }
};
