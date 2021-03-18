import Koa from "koa";
import { initSockets } from "../sockets/index.js";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import passport from "koa-passport";
import session from "koa-session";
import mongoose from "mongoose";
import errorHandler from "koa-better-error-handler";
import koa404Handler from "koa-404-handler";
import IO from "koa-socket-2";
import jwt from "koa-jwt";
import "../helpers/authentication.js";
import { config } from "../helpers/config.js";
import { PublicRouter, PrivateRouter } from "../routes/index.js";
import cors from "@koa/cors";

const app = new Koa();

app.keys = [config.JWT_PASSWORD];
app.use(session({}, app));
app.use(cors());
// Set default response
// data type to json
app.use((ctx, next) => {
  //   ctx.set("Content-Type", "application/json");
  return next();
});

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(logger());
app.use(bodyParser());

// Set Error Handlers
app.context.onerror = errorHandler();
app.use(koa404Handler);

// Setup Public Routes
app.use(PublicRouter.routes());
app.use(PublicRouter.allowedMethods());

app.use(jwt({ secret: config.JWT_PASSWORD }));
// Setup Protected Routes
app.use(PrivateRouter.routes());
app.use(PrivateRouter.allowedMethods());

// Start Loading the Database
mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    // INITIALIZE Socket IO
    initSockets();
  })
  .catch((err) => {
    console.log(err);
  });

export default app;
