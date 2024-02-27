import { skillEntities } from "../../entities/Skill.entities.js";
import { skillSchema } from "../schemas.js"
import { fieldExist } from "../validation/FieldsValidation.js";
import { schemaValidation } from "../validation/SchemaValidator.js"

export const skillMiddleware = async (req, res, next) => {
    const skillExist = await fieldExist(skillEntities, "skill_name", req.body.skill_name);
    if (!skillExist) {
        const errors = await schemaValidation(skillSchema, req.body); 
        if (!errors) {
            next();
        } else {
            res.status(400).json({ errors });
        }
    }

    else {
        res.status(400).json({
            errors: { error: "A skill ja estar registrada no sistema." }
        });
    }

}