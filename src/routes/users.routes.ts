import { userSchema } from "./../schemas/user.schema";
import { ensureDataIsValid } from "./../middlewares/ensureDataIsValid.middleware";
import { createUserController } from "./../controllers/user.controllers";
import { Router } from "express";

export const userRoutes = Router();

userRoutes.post("", ensureDataIsValid(userSchema), createUserController);
