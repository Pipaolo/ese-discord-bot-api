import Router from "@koa/router";
import { Login, Register } from "../controllers/authentication.js";
import {
  CreateRoom,
  JoinRoom,
  DeleteRoom,
  GetRooms,
} from "../controllers/room.js";
import { FetchUser } from "../controllers/user.js";

export const PublicRouter = new Router();

PublicRouter.patch("/auth/login", Login);
PublicRouter.post("/auth/register", Register);

export const PrivateRouter = new Router();

// Setup Private routes here.
PrivateRouter.get("/user", FetchUser);
PrivateRouter.get("/room", GetRooms)
  .get("/room/:id", JoinRoom)
  .post("/room", CreateRoom)
  .delete("/room/:id", DeleteRoom);
