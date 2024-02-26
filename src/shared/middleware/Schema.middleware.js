import { userSchema } from "../schemas.js";
import { schemaValidation } from "./validation/SchemaValidator.js";

export const schemaMiddleware = async (req, res, next) => { 
    const schemaIsEmpty = await schemaValidation(userSchema, req.body);
    if (!schemaIsEmpty) {
        return next();
    }
    return res.status(401).json(schemaIsEmpty);
}

