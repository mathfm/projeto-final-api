import { userEntities } from "../../../entities/User.entities.js";
import { userSchema } from "../../schemas.yup.js";
import { fieldExistValidation } from "../../validation/fieldsExist.validation.js";
import { schemaValidation } from "../../validation/schema.validation.js";

export const createUserMiddleware = async (req, res, next) => {
    const emailExist = await fieldExistValidation(userEntities, "email", req.body.email);
    const usernameExist = await fieldExistValidation(userEntities, "username", req.body.username);
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