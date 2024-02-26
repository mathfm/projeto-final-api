import { object, string } from "yup";


export const userSchema = object({
    name: string().required().min(3),
    username: string().required().min(5),
    email: string().email().required(),
    password: string().required().min(8)
})


