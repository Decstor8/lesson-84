import { Model } from "mongoose";

export interface UserTypes {
    username: string;
    password: string;
    token: string;
  }

  interface Methods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
  }
  
  type Models = Model<UserTypes, {}, Methods>;