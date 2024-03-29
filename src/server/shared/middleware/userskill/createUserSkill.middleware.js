
import { skillEntities } from "../../../entities/Skill.entities.js";
import { userSkillEntities } from "../../../entities/UserSkill.entities.js";
import { userSkillSchema } from "../../schemas.yup.js";
import { fieldExistValidation } from "../../validation/fieldsExist.validation.js";
import { schemaValidation } from "../../validation/schema.validation.js";


export const verificyExistUserSkill = async (objectUser) => {
    const userSkillExist = await userSkillEntities.findAll({
        where: {
            user_id: objectUser.user_id,
            skill_id: objectUser.skill_id
        }
    })
    return userSkillExist;
}

export const createSkillMiddleware = async (req, res, next) => {

    const user_id = req.params.user_id;
    const skill_id = req.body.skill_id;

    try {
        const schemaUserSkillErrors = await schemaValidation(userSkillSchema, {user_id, skill_id});

        if (schemaUserSkillErrors) {
            return res.status(400).json({ errors: schemaUserSkillErrors});
        }
        
        const skillExist = await fieldExistValidation(skillEntities, "id", skill_id);


        if (!skillExist) {
            return res.status(400).json({ errors: { error: "Skill não encontrada", path: "skill_id" } });
        }

        const userSlillExist = await verificyExistUserSkill({ user_id, skill_id });

        if (userSlillExist.length !== 0) {
            return res.status(400).json({ error: "Essa skill ja esta registrada na sua conta" });
        }

        next();

    } catch (error) {
        res.status(400).json({
            errors: error.message 
        })
    }
}