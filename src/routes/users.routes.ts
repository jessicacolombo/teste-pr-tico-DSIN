import { ensureAuthMiddleware } from "./../middlewares/ensureAuth.middleware";
import { userSchema } from "./../schemas/user.schema";
import { ensureDataIsValid } from "./../middlewares/ensureDataIsValid.middleware";
import {
  createUserController,
  retrieveUserInfoController,
} from "./../controllers/user.controllers";
import { Router } from "express";

export const userRoutes = Router();

userRoutes.post("", ensureDataIsValid(userSchema), createUserController);
userRoutes.get("/:id", ensureAuthMiddleware, retrieveUserInfoController);
