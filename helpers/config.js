import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const config = {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 4040,
  JWT_PASSWORD: process.env.JWT_PASSWORD || "chatbox-is-cool",
  MONGO_URI: process.env.MONGO_URI,
  ACCESS_TOKEN_TTL: process.env.ACCESS_TOKEN_TTL,
  REFRESH_TOKEN_TTL: process.env.REFRESH_TOKEN_TTL,
  SERVER_URL: process.env.SERVER_URL,

  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_LOCAL_PORT: process.env.DB_LOCAL_PORT,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_PORT: process.env.DB_PORT,
};
