import { userEntities } from "../../../entities/User.entities.js";
import { schemaReduceGenerator, userSchema } from "../../schemas.js";
import { fieldExistValidation } from "../../validation/fieldsExist.validation.js";
import { schemaValidation } from "../../validation/schema.validation.js";


export const updateEmailMiddleware = async (req, res, next) => {
    const user_id = req.params.user_id;
    const email = req.body.email;
    const findUser = await userEntities.findByPk(user_id);

    if (!findUser) {
        return res.status(404).json({ error: "Id do usuario não foi encontrado!" });
    }

    if (await fieldExistValidation(userEntities, "email", email)) {
        return res.status(400).json({ error: "Esse email ja estar registrado." });
    }

    const schemaEmail = schemaReduceGenerator(userSchema, ["email"]);
    const errorsEmail = await schemaValidation(schemaEmail, { email });

    if (errorsEmail) {
        return res.status(400).json({ error: errorsEmail });
    }

    next();
    
};