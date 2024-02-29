import { swapSkillEntities } from "../../../entities/SwapSkill.entities.js"
import { userEntities } from "../../../entities/User.entities.js";
import { userSkillEntities } from "../../../entities/UserSkill.entities.js"
import { swapSkillSchema } from "../../schemas.js"
import { fieldExistValidation } from "../../validation/fieldsExist.validation.js"
import { schemaValidation } from "../../validation/schema.validation.js"


const verificyExistSwapSkill = async (user_sender_id, user_recipient_id) => {
    const userSkillExist = await swapSkillEntities.findAll({
        where: {
            user_sender_id: user_sender_id,
            user_recipient_id: user_recipient_id
        }
    })
    return userSkillExist;
}

export const createSwapSkillMiddleware = async (req, res, next) => {
    const invitedSwapSkill = {
        user_sender_id: req.params.user_sender_id,
        skill_offered_id: req.body.skill_offered_id,
        user_recipient_id: req.body.user_recipient_id,
        skill_desired_id: req.body.skill_desired_id
    }

    if (invitedSwapSkill.user_sender_id === invitedSwapSkill.user_recipient_id) {
        return res.status(400).json({ errors: { error: "Id de quem você esta enviando a solicitação não pode ser o mesmo", path: "user_recipient_id" } });
    }

    if (invitedSwapSkill.skill_offered_id === invitedSwapSkill.skill_desired_id) {
    return res.status(400).json({ errors: { error: "Ambas skills são iguais, não e possivel realizar o convite.", path: "skill_recipient_id" } });
    }

    const schemaSwapValidationErros = await schemaValidation(swapSkillSchema, invitedSwapSkill)
    if (schemaSwapValidationErros) {
        return res.status(400).json(schemaSwapValidationErros);
    }

    const [userSendExist, userRecepientExist] = await Promise.all([
        fieldExistValidation(userEntities, "id", invitedSwapSkill.user_sender_id),
        fieldExistValidation(userEntities, "id", invitedSwapSkill.user_recipient_id)
    ])

    if (!userSendExist) {
        return res.status(400).json({ errors: { error: "Id do usuario invalido", path: "user_sender_id" } });
    } 

    if (!userRecepientExist) {
        return res.status(400).json({ errors: { error: "Id de quem você esta enviando a solicitação não foi encontrado", path: "user_recipient_id" } });
    }

    const skillUserSender = await userSkillEntities.findOne({
        where: {
            user_id: invitedSwapSkill.user_sender_id,
            skill_id: invitedSwapSkill.skill_offered_id
        }
    })

    if (!skillUserSender) {
        return res.status(400).json({ errors: { error: "Você não possui esta skill", path: "skill_offered_id" } });
    }

    const skillUserRecipient = await userSkillEntities.findOne({
        where: {
            user_id: invitedSwapSkill.user_recipient_id,
            skill_id: invitedSwapSkill.skill_desired_id
        }
    })

    if (!skillUserRecipient) {
        return res.status(400).json({ errors: { error: "O usuario que você solicitou a troca não tem essa skill registrada", path: "skill_desired_id" } });
    }
    const swapValidaion = await verificyExistSwapSkill(invitedSwapSkill.user_sender_id, invitedSwapSkill.user_recipient_id);
    if (swapValidaion.length !== 0) {
        return res.status(400).json({ errors: "O convite para esse usuario ja foi enviado. aguarde a resposta" });
    }

    next();
    
}