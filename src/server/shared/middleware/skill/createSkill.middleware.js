import { skillEntities } from "../../../entities/Skill.entities.js";
import { skillSchema } from "../../schemas.yup.js";
import { fieldExistValidation } from "../../validation/fieldsExist.validation.js";
import { schemaValidation } from "../../validation/schema.validation.js";

export const createSkillMiddleware = async (req, res, next) => {
    const skillExist = await fieldExistValidation(skillEntities, "skill_name", req.body.skill_name);
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