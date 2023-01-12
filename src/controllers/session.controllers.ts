import { IUserLogin } from "./../interfaces/users/index";
import { createSessionService } from "./../services/session/createSession.service";
import { Request, Response } from "express";

export const createSessionController = async (req: Request, res: Response) => {
  const userData: IUserLogin = req.body;
  const token = await createSessionService(userData);
  return res.status(200).json({ token: token });
};
