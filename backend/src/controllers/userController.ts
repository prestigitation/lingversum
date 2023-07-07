import { Service } from "typedi";
import baseController from "./baseController";


@Service()
export default class userController extends baseController {
    constructor() {
        super();
    }

    async getProfile() {

    }
}