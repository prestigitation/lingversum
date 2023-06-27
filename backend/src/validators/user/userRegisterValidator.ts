import { NAME_MAX_LENGTH, NAME_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '../../constants/userConstants';
import { requestData } from '../../types/requestData';
import { z } from "zod";

const rules = z.object({
    name: z.string().min(NAME_MIN_LENGTH).max(NAME_MAX_LENGTH),
    email: z.string().email(),
    password: z.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH)
})

export default (requestBody: requestData) => rules.safeParse(requestBody);