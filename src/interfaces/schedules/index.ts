export interface IScheduleRequest {
  date: string;
  time: string;
  service: string;
  userId: string;
}

export interface ISchedule extends IScheduleRequest {
  id: string;
}
