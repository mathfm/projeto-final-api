import { userEntity } from "../../../entities/User.entities.js";
import { schemaReduceGenerator, userSchema } from "../../schemas.js";
import { fieldExist } from "../../validation/FieldsValidation.js";
import { schemaValidation } from "../../validation/SchemaValidation.js";


export const updateEmalMiddleware = async (req, res, next) => {
    const user_id = req.params.user_id;
    const email = req.body.email;
    const findUser = await userEntity.findByPk(user_id);

    if (!findUser) {
        return res.status(404).json({ error: "Id do usuario não foi encontrado!" });
    }

    if (await fieldExist(userEntity, "email", email)) {
        return res.status(400).json({ error: "Esse email ja estar registrado." });
    }

    const schemaEmail = schemaReduceGenerator(userSchema, ["email"]);
    const errorsEmail = await schemaValidation(schemaEmail, { email });

    if (errorsEmail) {
        return res.status(400).json({ error: errorsEmail });
    }

    next();
    
};