import { arrayScheduleResponse } from "./../../schemas/schedules.schema";
import AppDataSource from "../../data-source";
import { Schedule } from "./../../entities/schedules.entity";

export const retrieveSchedulesService = async () => {
  const schedulesRepository = AppDataSource.getRepository(Schedule);

  const schedules = await schedulesRepository.find({
    relations: {
      user: true,
    },
  });

  const schedulesToShow = await arrayScheduleResponse.validate(schedules, {
    stripUnknown: true,
  });

  return schedulesToShow;
};
