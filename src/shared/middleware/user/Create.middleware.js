import { userEntity } from "../../../entities/User.entities.js";
import { userSchema } from "../../schemas.js";

export const userMiddleware = async (req, res, next) => {
    const emailExist = await fieldExist(userEntity, "email", req.body.email);
    const usernameExist = await fieldExist(userEntity, "username", req.body.username);
    const errorFields = await schemaValidation(userSchema, req.body);

    if (!errorFields) {
        if (!usernameExist && !emailExist) {
            next();
        } else {
            res.status(400).json({ error: "Email ou username já esta registrado"});
        }
    } else {
        res.status(400).json({ errors: errorFields });
    }

}