import { database } from "../database/connection.js";
import { swapSkillEntities } from "../entities/SwapSkill.entities.js";


export const createSwapSkill = async (req, res) => {
    await database.sync();
    try {
        const userInvited = {
            user_sender_id: req.params.user_id,
            user_recipient_id: req.body.user_recipient_id,
            skill_desired_id: req.body.skill_desired_id,
            skill_offered_id: req.body.skill_offered_id
        }

        await swapSkillEntities.create(userInvited);
        const resultCreate = await swapSkillEntities.findOne({ where: userInvited });
        return res.status(201).json({ message: "Convite enviado com sucesso!", invited: resultCreate });
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}


export const getSwapSkills = async (req, res) => { 
    await database.sync();
    try {
        const swapSkills = await swapSkillEntities.findAll({
            where: {
                user_sender_id: req.params.user_id
            }
        });
        return res.status(200).json({ swapSkills });
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

export const deleteSwapSkill = async (req, res) => { 
    try {
        await database.sync();
        const { swap_skill_id } = req.params;
        await swapSkillEntities.destroy({ where: { id: swap_skill_id } });
        return res.status(200).json({ sucess: "Convite deletado com sucesso!" });        
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

