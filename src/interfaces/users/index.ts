export interface IUserRequest {
  name: string;
  email: string;
  cellphone: string;
  password: string;
  isAdm: boolean;
}

export interface IUser extends IUserRequest {
  id: string;
}

export interface IUserWithoutPassword {
  id: string;
  name: string;
  email: string;
  cellphone: string;
  isAdm: boolean;
}

export interface IUserLogin {
  email: string;
  password: string;
}
