import { AppError } from "./../../errors/AppError";
import { User } from "./../../entities/user.entity";
import {
  IUserRequest,
  IUserWithoutPassword,
} from "./../../interfaces/users/index";
import AppDataSource from "../../data-source";
import { userWithoutPassword } from "../../schemas/user.schema";

export const createUserService = async (
  userData: IUserRequest
): Promise<IUserWithoutPassword> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: userData.email,
  });

  if (user) {
    throw new AppError("Email already registered.", 400);
  }

  const createdUser = userRepository.create(userData);
  await userRepository.save(createdUser);

  const userToShow = await userWithoutPassword.validate(createdUser, {
    stripUnknown: true,
  });

  return userToShow;
};
