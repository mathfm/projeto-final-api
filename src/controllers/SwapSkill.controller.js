import { swapSkillEntity } from "../entities/SwapSkill.entities.js";

export const createSwapSkill = async (username_sender, username_recipient, skill_desired_id, skill_offered_id) => {
    await swapSkillEntity.create({username_sender, username_recipient, skill_desired_id, skill_offered_id });

    return swapSkillEntity.findAll();
    
}