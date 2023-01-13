import { User } from "./../../entities/user.entity";
import { AppError } from "./../../errors/AppError";
import { IScheduleUpdate } from "./../../interfaces/schedules/index";
import { Schedule } from "./../../entities/schedules.entity";
import AppDataSource from "../../data-source";
import { schedulesResponse } from "../../schemas/schedules.schema";

export const updateScheduleService = async (
  scheduleId: string,
  userId: string,
  newScheduleData: IScheduleUpdate
) => {
  const schedulesRepository = AppDataSource.getRepository(Schedule);
  const userRepository = AppDataSource.getRepository(User);

  const schedule = await schedulesRepository.findOne({
    where: {
      id: scheduleId,
    },
    relations: {
      user: true,
    },
  });

  if (!schedule) {
    throw new AppError("Schedule not found.", 404);
  }

  const findSchedule = await schedulesRepository.findOneBy({
    date: newScheduleData.date,
    time: newScheduleData.time,
  });

  if (findSchedule) {
    throw new AppError(
      "There is already a schedule for this day and time.",
      401
    );
  }

  const user = await userRepository.findOneBy({
    id: userId,
  });

  if (user.id !== schedule.user.id && !user.isAdm) {
    throw new AppError("Must be owner or adm to complete", 401);
  }

  const now = new Date().toLocaleDateString();
  const [day, month, year] = now.split("/");

  const [scheduledYear, scheduledMonth, scheduledDay] =
    schedule.date.split("-");

  if (
    scheduledYear === year &&
    scheduledMonth === month &&
    Number(scheduledDay) - Number(day) <= 2
  ) {
    throw new AppError(
      "The reeschedules can only be made with more than 2 days to the schedule date. Call Cabeleileila Leila to complete the operation.",
      401
    );
  }

  const updatedSchedule = schedulesRepository.create({
    ...schedule,
    ...newScheduleData,
  });

  await schedulesRepository.save(updatedSchedule);

  const updatedScheduleToShow = await schedulesResponse.validate(
    updatedSchedule,
    {
      stripUnknown: true,
    }
  );

  return updatedScheduleToShow;
};
