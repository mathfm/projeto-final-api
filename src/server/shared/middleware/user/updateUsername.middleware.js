import { userEntities } from "../../../entities/User.entities.js";
import { schemaReduceGenerator, userSchema } from "../../schemas.js";
import { fieldExistValidation } from "../../validation/fieldsExist.validation.js";
import { schemaValidation } from "../../validation/schema.validation.js";

export const updateUsernameMiddleware = async (req, res, next) => {
    const user_id = req.params.user_id;
    const username = req.body.username;
    const findUser = await userEntities.findByPk(user_id);
    if (!findUser) {
        return res.status(404).json({ error: "Id não localizado" });
    }
    const schemaUsername = schemaReduceGenerator(userSchema, ["username"]);
    const errorsUsername = schemaValidation(schemaUsername, { username });

    if (errorsUsername) {
        return res.status(400).json(errorsUsername);
    }

    if (await fieldExistValidation(userEntity, "username", username)) {
        return res.status(400).json({ error: "Esse username ja estar registrado." });
    }
    
    next();
};