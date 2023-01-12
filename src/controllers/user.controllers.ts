import { retrieveUserInfoService } from "./../services/users/retrieveUserInfo.service";
import { Request, Response } from "express";
import { createUserService } from "./../services/users/createUser.service";
import { IUserRequest } from "./../interfaces/users/index";

export const createUserController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;
  const createdUser = await createUserService(userData);
  return res.status(201).json(createdUser);
};

export const retrieveUserInfoController = async (
  req: Request,
  res: Response
) => {
  const userId: string = req.params.id;
  const user = await retrieveUserInfoService(userId);
  return res.status(200).json(user);
};
