import { skillEntities } from "../../../entities/Skill.entities.js";
import { skillSchema } from "../../schemas.js";
import { fieldExist } from "../../validation/FieldsValidation.js";
import { schemaValidation } from "../../validation/SchemaValidation.js";

export const skillUpdateMiddleware = async (req, res, next) => { 
    const skill_id = req.params.skill_id;
    const findSkill = await skillEntities.findByPk(skill_id);
    const skill_name = (!req.body.skill_name ? findSkill.skill_name : req.body.skill_name);
    const description =  (!req.body.skill_description ? findSkill.description : req.body.description);
    
    const errorsFieldSkill = await schemaValidation(skillSchema, { skill_name, description });

    if (errorsFieldSkill) {
        
        return res.status(400).json(errorsFieldSkill);
    }

    if (skill_name === findSkill.skill_name) {

        return next();
    }

    const skillExist = await fieldExist(skillEntities, "skill_name", skill_name);
    if (skillExist) {
        return res.status(400).json({ error: "Essa skill ja existe." });
    }

    return next();


}