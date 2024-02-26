import { object, string, ValidationError } from "yup";
import { userEntity } from "../../entities/User.entities.js";
import { skillEntities } from "../../entities/Skill.entities.js";
import { userSkillEntity } from "../../entities/UserSkill.entities.js";

const swapSkillSchema = object({
    user_sender_id: string().required().length(36),
    user_sender_id: string().required().length(36),
    skill_desired_id: string().required().length(36),
    skill_offered_id: string().required().length(36)
});

export const swapSkillValidateCreate = async (req, res, next) => { 
    try {
        const userInvited = {
            user_sender_id: req.params.user_sender_id,
            user_recipient_id: req.body.user_recipient_id,
            skill_desired_id: req.body.skill_desired_id,
            skill_offered_id: req.body.skill_offered_id
        }

        await swapSkillSchema.validate(userInvited, { abortEarly: false });
        const usernameRecipientIsValid = await userEntity.findByPk(userInvited.user_recipient_id);

        if (!usernameRecipientIsValid) {
            res.status(401).json({ Error: "O usuário que você está tentando convidar não existe." });
        }

        if (!await skillEntities.findByPk(userInvited.skill_desired_id ||
            !await skillEntities.findByPk(userInvited.skill_offered_id))) {
            res.status(401).json({ Error: "Uma das skills é invalida." });
        }

        const userSenderIsValid = await userSkillEntity.findOne({
            where: {
                user_id: userInvited.user_sender_id
            }
        });

        const userRecipientsValid = await userSkillEntity.findAll({
            where: {
                user_id: userInvited.user_recipient_id
            }
        });

        if (!userSenderIsValid.skill == userInvited.skill_offered_id) {
            res.status(400).json({ Error: "Essa skill não esta registrada na sua conta" });
        }

        if (!userRecipientsValid.skill == userInvited.skill_desired_id) {
            res.status(400).json({ Error: "O usuario que você quer convidar não possui essa skill." });
        }


        next();

        


    } catch (error) {
        const captureErros = [];
        if (error instanceof ValidationError) {
            error.inner.forEach(error => {
                error.message
                error.path
                captureErros.push({ error: error.message, path: error.path });
            })
            
            return res.status(400).json({
                errors: captureErros
            });
        }
    }
}