import { TFunction } from "i18next";

declare module 'express' {
    interface Request {
      t: TFunction;
    }
    interface Response {
      __ : any
    }
}