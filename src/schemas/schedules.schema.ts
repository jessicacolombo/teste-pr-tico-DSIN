import { userWithoutPassword } from "./user.schema";
import { IScheduleResponse } from "./../interfaces/schedules/index";
import * as yup from "yup";
import { SchemaOf } from "yup";

export const schedulesResponse: SchemaOf<IScheduleResponse> = yup
  .object()
  .shape({
    id: yup.string().required(),
    date: yup.string().required(),
    time: yup.string().required(),
    service: yup.string().required(),
    user: userWithoutPassword,
  });

export const arrayScheduleResponse: SchemaOf<IScheduleResponse[]> =
  yup.array(schedulesResponse);
