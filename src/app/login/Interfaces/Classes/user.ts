import { IUser } from "../i-user";

export class User implements IUser {
  id: number;
  name: string;
  email: string;
  token: string;
  password: string;


  constructor(
    email: string,
    password: string
  ) {
    this.id = 0
    this.name = ""
    this.email = email
    this.token = ""
    this.password = password
  }

}
