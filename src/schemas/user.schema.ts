import {
  IUser,
  IUserRequest,
  IUserWithoutPassword,
} from "./../interfaces/users/index";
import * as yup from "yup";
import { SchemaOf } from "yup";

export const userSchema: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  cellphone: yup.string().required(),
  password: yup.string().required(),
  isAdm: yup.boolean().required(),
});

export const userWithoutPassword: SchemaOf<IUserWithoutPassword> = yup
  .object()
  .shape({
    id: yup.string(),
    name: yup.string(),
    email: yup.string(),
    cellphone: yup.string().required(),
    isAdm: yup.boolean(),
  });
