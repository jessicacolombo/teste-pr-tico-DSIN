import { AppError } from "./../errors/AppError";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

require("dotenv").config();

export const ensureAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let authorization = req.headers.authorization;

  if (!authorization) {
    throw new AppError("Missing authorization headers.", 401);
  }

  authorization = authorization.split(" ")[1];

  return jwt.verify(
    authorization,
    process.env.SECRET_KEY,
    (error, decoded: any) => {
      if (error) {
        throw new AppError(error.message, 401);
      }

      req.user = {
        id: decoded.sub,
      };

      return next();
    }
  );
};
