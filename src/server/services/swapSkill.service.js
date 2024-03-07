import { swapSkillEntities } from "../entities/SwapSkill.entities.js";

export class SwapSkillService {
    async createSwapSkill(user_id, user_recipient_id, skill_desired_id, skill_offered_id) {
        try {
            const invited = {
                user_sender_id: user_id,
                user_recipient_id: user_recipient_id,
                skill_desired_id: skill_desired_id,
                skill_offered_id: skill_offered_id
            }
            await swapSkillEntities.create(invited);
            const resultInvited = await swapSkillEntities.findOne({ where: invited });
            return { message: "Convite enviado com sucesso!", invited: resultInvited };
        } catch (error) {
            return error.message;
        }
    };

    async getSwapSkills(user_id) { 
        try {
            const swapSkills = await swapSkillEntities.findAll({ where: { user_sender_id: user_id } });
            return { message: "Convites encontrados!", invited: swapSkills };
        } catch (error) {
            return error.message;
        }
    };

    async updateSwapSkill(swap_skill_id, skill_offered_id, skill_desired_id) {
        try {
            await swapSkillEntities.update({ skill_offered_id: skill_offered_id, skill_desired_id: skill_desired_id }, { where: { id: swap_skill_id } });
            const resultSwapSkillupdate = await swapSkillEntities.findOne({ where: { id: swap_skill_id } });
            return { message: "Convite atualizado com sucesso!", invited: resultSwapSkillupdate };
        } catch (error) {
            return error.message;
        }
    }

    async deleteSwapSkill(swap_skill_id) {
        try {
            await swapSkillEntities.destroy({ where: { id: swap_skill_id } });
            return { message: "Convite deletado com sucesso!" };
        } catch (error) {
            return error.message;
        }
    };
}