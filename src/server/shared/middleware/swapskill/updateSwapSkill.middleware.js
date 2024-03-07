import { skillEntities } from "../../../entities/Skill.entities.js";
import { swapSkillEntities } from "../../../entities/SwapSkill.entities.js";
import { userSkillEntities } from "../../../entities/UserSkill.entities.js";
import { schemaReduceGenerator, swapSkillSchema } from "../../schemas.yup.js";
import { fieldExistValidation } from "../../validation/fieldsExist.validation.js";
import { schemaValidation } from "../../validation/schema.validation.js";

export const updateSwapSkillMiddleware = async (req, res, next) => { 

    const { user_id, swap_skill_id } = req.params;
    const swapSkillExist = await swapSkillEntities.findByPk(swap_skill_id);
    const { skill_offered_id, skill_desired_id } = req.body;
    
    
    if (swapSkillExist.user_sender_id !== user_id) {
        return res.status(400).json({ error: "Você não tem altorização para atualizar esse convite." });
    }

    const schemaSkills = schemaReduceGenerator(swapSkillSchema, ["skill_offered_id", "skill_desired_id"]);

    const swapSkillErros = await schemaValidation(schemaSkills, { skill_offered_id, skill_desired_id });

    if (swapSkillErros) {
        return res.status(400).json({ errors: swapSkillErros });
    }

    const skillUserSender = await userSkillEntities.findOne({
        where: {
            user_id: user_id,
            skill_id: skill_offered_id
        }
    })

    if (!skillUserSender) {
        return res.status(400).json({ errors: { error: "Você não possui esta skill", path: "skill_offered_id" } });
    }

    const skillUserRecipient = await userSkillEntities.findOne({
        where: {
            user_id: swapSkillExist.user_recipient_id,
            skill_id: skill_desired_id
        }
    })

    if (!skillUserRecipient) {
        return res.status(400).json({ errors: { error: "O usuario que você solicitou a troca não tem essa skill registrada", path: "skill_desired_id" } });
    }

    next();

}