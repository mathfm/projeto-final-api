import { userEntity } from "../../../entities/User.entities.js";
import { fieldExist } from "./FieldsValidation.js";

export const verityEmailAndUsername = async (req, res, next) => {
    const emailExist = await fieldExist(userEntity,"email", req.body.email);
    const usernameExist = await fieldExist(userEntity, "username", req.body.username);
    

    if (!emailExist && !usernameExist) {
        return next();
    } else {
        res.status(400).json({
            errors: { error: `Email ou usuario já cadastrado` }
        });
    }
}