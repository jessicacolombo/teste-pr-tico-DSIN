import { retrieveSchedulesService } from "./../services/schedules/retrieveAllSchedules.service";
import { createScheduleService } from "./../services/schedules/createSchedule.service";
import { IScheduleRequest } from "./../interfaces/schedules/index";
import { updateScheduleService } from "./../services/schedules/updateSchedule.service";
import { Request, Response } from "express";
import { retrieveSchedulesFromAUserService } from "../services/schedules/retrieveSchedulesFromAUser.service";

export const createScheduleContoller = async (req: Request, res: Response) => {
  const newScheduleData: IScheduleRequest = req.body;
  const newschedule = await createScheduleService(newScheduleData);
  return res.status(201).json(newschedule);
};

export const retrieveSchedulesContoller = async (
  req: Request,
  res: Response
) => {
  const schedules = await retrieveSchedulesService();
  return res.status(200).json(schedules);
};

export const retrieveSchedulesFromAUserContoller = async (
  req: Request,
  res: Response
) => {
  const userId: string = req.params.id;
  const schedules = await retrieveSchedulesFromAUserService(userId);
  return res.status(200).json(schedules);
};

export const updateScheduleContoller = async (req: Request, res: Response) => {
  const newscheduleData: IScheduleRequest = req.body;
  const scheduleId: string = req.params.id;
  const userId: string = req.user.id;
  const updatedSchedule = await updateScheduleService(
    scheduleId,
    userId,
    newscheduleData
  );
  return res.status(200).json(updatedSchedule);
};
