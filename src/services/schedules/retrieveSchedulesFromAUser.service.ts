import { arrayScheduleResponse } from "./../../schemas/schedules.schema";
import { AppError } from "./../../errors/AppError";
import { User } from "./../../entities/user.entity";
import AppDataSource from "../../data-source";
import { Schedule } from "./../../entities/schedules.entity";

export const retrieveSchedulesFromAUserService = async (userId: string) => {
  const schedulesRepository = AppDataSource.getRepository(Schedule);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const schedules = await schedulesRepository
    .createQueryBuilder("schedules")
    .innerJoinAndSelect("schedules.user", "user")
    .where("schedules.user = :user_id", { user_id: user.id })
    .getMany();

  const schedulesToShow = await arrayScheduleResponse.validate(schedules, {
    stripUnknown: true,
  });

  return schedulesToShow;
};
