import { userEntities } from "../../../entities/User.entities.js";
import { userSchema } from "../../schemas.yup.js";
import { schemaValidation } from "../../validation/schema.validation.js";
import { verifiyInfoUserValidation } from "../../validation/verifiyInfoUser.validation.js";

export const updateUserMiddleware = async (req, res, next) => { 
    const findUser = await userEntities.findByPk(req.params.user_id);
    if (!findUser) {
        return res.status(404).json({ error: "Id do usuario é invalido, impossivel realizar a alteração." });
    }
    const name = (!req.body.name ? findUser.name : req.body.name);
    const username = req.body.username;
    const email = req.body.email;
    const password = (!req.body.password ? findUser.password : req.body.password);

    const errorFields = await schemaValidation(userSchema, { name, username, email, password });
    if (errorFields) {
        return res.status(400).json(errorFields);
    }

    const userValid = await verifiyInfoUserValidation({ username, email });

    if (!userValid) {
        return res.status(400).json({ error: "Um dos dados que você digitou ja foram registrados" });
    } 

    next();

}