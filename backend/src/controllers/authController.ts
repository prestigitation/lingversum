import { Response, Request } from "express";
import Container, { Service } from "typedi";
import bcrypt from "bcrypt";
import userRegisterValidator from "../validators/user/userRegisterValidator";
import User from "../../models/user.model";
import authService from "../services/authService";
import userLoginValidator from "../validators/user/userLoginValidator";
import authRepository from "../repositories/authRepository";


@Service()
export default class authController {
    async login(request: Request, response: Response) {
        const service = Container.get(authService)
        const {email, password, name} = request.body;

        let validator = userLoginValidator(request.body)
            if(validator.success) {
                const user = await User.findOne({
                    where: {
                        email
                    }
                });
                if (user) {
                    if (service.matchHash(password, user?.getDataValue("password"))) {
                        return response.json(service.generateToken({
                            name,
                            email
                        }))
                    } else {
                        return response.status(403).send(request.t("USER.INCORREСT_PASSWORD"))
                    }
                } else {
                    return response.status(400).send(request.t("USER.NOT_FOUND"))
                }
            } else {
                return response.status(422).send(request.t("USER.NOT_VALIDATED"))
            }
    }

    async register(request: Request, response: Response) {
        const {email, password, name} = request.body
        const repository = new authRepository();
        if(await User.findOne({
            where: {
                email
            }
        })) {
            return response.status(409).send(request.t("USER.ALREADY_EXISTS"));
        } else {
            let validator = userRegisterValidator(request.body)
            if(validator.success) {
                await repository.createUser({name, email, password})

                return response.sendStatus(201);
            } else {
                return response.status(422).send(request.t("USER.NOT_VALIDATED"))
            }
        }
    } 
}