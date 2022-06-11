import { Profile } from "../models/UserSchema";

export interface IUser {
  username: string;
  password: string;
  fullName: string;
  profile: Profile;
}

export interface Token {
  id: string;
  profile: Profile;
  iat: number;
  exp: number;
}
