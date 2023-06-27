import { requestData } from '../../types/requestData';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '../../constants/userConstants';
import { z } from "zod";

const rules = z.object({
    email: z.string().email().nonempty(),
    password: z.string().max(PASSWORD_MAX_LENGTH).min(PASSWORD_MIN_LENGTH).nonempty()
})

export default (requestBody: requestData) => rules.safeParse(requestBody);