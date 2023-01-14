import { userWithoutPassword } from "./../../schemas/user.schema";
import { AppError } from "./../../errors/AppError";
import { User } from "./../../entities/user.entity";
import AppDataSource from "../../data-source";
import { IUserLogin } from "./../../interfaces/users/index";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

export const createSessionService = async (userData: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email: userData.email,
    },
    relations: {
      schedules: true,
    },
  });

  if (!user) {
    throw new AppError("Wrong email/password.", 403);
  }

  const matchPassword = await compare(userData.password, user.password);

  if (!matchPassword) {
    throw new AppError("Wrong email/password.", 403);
  }

  const token = jwt.sign({ email: userData.email }, process.env.SECRET_KEY, {
    expiresIn: "24h",
    subject: user.id,
  });

  const userToShow = await userWithoutPassword.validate(user, {
    stripUnknown: true,
  });

  return { user: userToShow, token: token };
};
