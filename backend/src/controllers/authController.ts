import { Response, Request } from "express";
import Container, { Service } from "typedi";
import userRegisterValidator from "../validators/user/userRegisterValidator";
import User from "../../models/user.model";
import authService from "../services/authService";
import userLoginValidator from "../validators/user/userLoginValidator";
import authRepository from "../repositories/authRepository";
import baseController from "./baseController";


@Service()
export default class authController extends baseController {
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
                        return response.status(403).send({message: this.getI18N()?.__("USER.INCORREСT_PASSWORD")});
                    }
                } else {
                    return response.status(400).send({message: this.getI18N()?.__("USER.NOT_FOUND")});
                }
            } else {
                return response.status(422).send({message: this.getI18N()?.__("USER.NOT_VALIDATED")});
            }
    }

    async register(request: Request, response: Response) {
        const {email, password, name} = request.body
        const repository = new authRepository();
        await User.findOne({
            where: {
                email
            }
        }).then(async (user) => {
            if(user) {
                return response.status(409).send(this.getI18N()?.__("USER.ALREADY_EXISTS"));
            } else {
                let validator = userRegisterValidator(request.body)
                if(validator.success) {
                    await repository.createUser({name, email, password})
    
                    return response.sendStatus(201);
                } else {
                    return response.status(422).send({message: this.getI18N()?.__("USER.NOT_VALIDATED")})
                }
            }
        }).catch((e) => {
            return response.status(500).send({message: this.getI18N()?.__("ERROR.SERVER_ERROR")});
        })
    } 
}