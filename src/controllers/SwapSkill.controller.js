import { swapSkillEntity } from "../entities/SwapSkill.entities.js";


export const createSwapSkill = async (req, res) => {
    try {
        const userInvited = {
            user_sender_id: req.params.user_sender_id,
            user_recipient_id: req.body.user_recipient_id,
            skill_desired_id: req.body.skill_desired_id,
            skill_offered_id: req.body.skill_offered_id
        }

        await swapSkillEntity.create(userInvited);
        return res.status(201).json({ message: "Convite enviado com sucesso!" });

    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}