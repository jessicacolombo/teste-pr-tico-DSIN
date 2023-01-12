export interface IUserRequest {
  name: string;
  email: string;
  cellphone: string;
  password: string;
  isAdm: boolean;
}

export interface IUser extends IUserRequest {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}
