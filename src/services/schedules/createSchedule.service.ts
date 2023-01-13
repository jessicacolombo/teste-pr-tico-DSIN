import { schedulesResponse } from "./../../schemas/schedules.schema";
import { AppError } from "./../../errors/AppError";
import { User } from "./../../entities/user.entity";
import { Schedule } from "./../../entities/schedules.entity";
import AppDataSource from "../../data-source";
import { IScheduleRequest } from "./../../interfaces/schedules/index";

export const createScheduleService = async (
  newScheduleData: IScheduleRequest
) => {
  const schedulesRepository = AppDataSource.getRepository(Schedule);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: newScheduleData.userId,
  });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  const findSchedule = await schedulesRepository.findOneBy({
    date: newScheduleData.date,
    time: newScheduleData.time,
  });

  console.log(findSchedule);
  if (findSchedule) {
    throw new AppError(
      "There is already a schedule for this day and time.",
      401
    );
  }

  const schedule = schedulesRepository.create(newScheduleData);
  schedule.user = user;

  const newSchedule = await schedulesRepository.save(schedule);

  const scheduleToShow = await schedulesResponse.validate(newSchedule, {
    stripUnknown: true,
  });

  return scheduleToShow;
};
