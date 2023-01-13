import { IUserWithoutPassword } from "./../users/index";
export interface IScheduleRequest {
  date: string;
  time: string;
  service: string;
  userId: string;
}

export interface ISchedule extends IScheduleRequest {
  id: string;
}

export interface IScheduleUpdate {
  date?: string;
  time?: string;
}

export interface IScheduleResponse {
  date: string;
  time: string;
  service: string;
  user: IUserWithoutPassword;
}
