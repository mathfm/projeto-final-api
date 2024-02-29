import { userEntity } from "../../../entities/User.entities.js";
import { schemaReduceGenerator, userSchema } from "../../schemas.js";
import { schemaValidation } from "../../validation/SchemaValidation.js";

export const updatePasswordMiddleware = async (req, res, next) => { 

    const user_id = req.params.user_id;
    const password = req.body.password;
    const userInfo = await userEntity.findByPk(user_id);

    if (!userInfo) {
        return res.status(404).json({ error: "Id não encontrado" });
    }

    if (password === userInfo.password) {
        return res.status(400).json({ error: "Senha igual a anterior" });
    }
    
    const schemaPassword = schemaReduceGenerator(userSchema, ["password"]);
    const errorsPassword = await schemaValidation(schemaPassword, { password });

    if (errorsPassword) {
        return res.status(400).json({ error: errorsPassword});
    }
    
    next();

};