import { TFunction } from "i18next";
import User from "../../models/user.model";
import jwtUserInfo from "../types/jwtUserInfo";

declare module 'express' {
    interface Request {
      t: TFunction;
      user?: jwtUserInfo;
    }
    interface Response {
      __ : any
    }
}