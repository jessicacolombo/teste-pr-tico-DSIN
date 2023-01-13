import { ensureAuthMiddleware } from "./../middlewares/ensureAuth.middleware";
import {
  createScheduleContoller,
  retrieveSchedulesContoller,
  retrieveSchedulesFromAUserContoller,
  updateScheduleContoller,
} from "./../controllers/schedules.controllers";
import { Router } from "express";

export const schedulesRoutes = Router();

schedulesRoutes.post("", ensureAuthMiddleware, createScheduleContoller);
schedulesRoutes.get("", ensureAuthMiddleware, retrieveSchedulesContoller);
schedulesRoutes.get(
  "/user/:id",
  ensureAuthMiddleware,
  retrieveSchedulesFromAUserContoller
);
schedulesRoutes.patch("/:id", ensureAuthMiddleware, updateScheduleContoller);
