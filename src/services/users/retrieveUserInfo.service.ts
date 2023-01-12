import { userWithoutPassword } from "./../../schemas/user.schema";
import AppDataSource from "../../data-source";
import { User } from "./../../entities/user.entity";
import { AppError } from "../../errors/AppError";

export const retrieveUserInfoService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  const userToShow = await userWithoutPassword.validate(user, {
    stripUnknown: true,
  });

  return userToShow;
};
