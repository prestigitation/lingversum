import { Service } from "typedi";
import baseController from "./baseController";
import { Request, Response } from "express";
import User from "../../models/user.model";
import Profile from "../../models/profile.model";


@Service()
export default class userController extends baseController {
    constructor() {
        super();
    }

    async getProfile(request: Request, response: Response) {
        const user = await User.findOne({
            where: {
                email: request?.user?.email
            }
        });
        const profile = await Profile.findOne({
            where: {
                id: user?.getDataValue("profileId")
            }
        })

        if (profile) {
            return response.send(profile);
        } else {
            return response.json({});
        }
    }
}