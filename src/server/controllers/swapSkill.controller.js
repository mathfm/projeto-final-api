import { SwapSkillService } from "../services/swapSkill.service.js";

const swapSkillService = new SwapSkillService();
export const createSwapSkill = async (req, res) => {

    const { user_id } = req.params;
    const { user_recipient_id, skill_desired_id, skill_offered_id } = req.body;
        
    const result = await swapSkillService.createSwapSkill(user_id, user_recipient_id, skill_desired_id, skill_offered_id);

    if (typeof result !== "object" && result == null) {
        return res.status(404).json({ error: result });
    }

    return res.status(201).json(result);
        
};

export const getSwapSkills = async (req, res) => {
    
    const { user_id } = req.params;
    const result = await swapSkillService.getSwapSkills(user_id);

    if (typeof result !== "object" && result == null) {
        return res.status(404).json({ error: result });
    }

    return res.status(200).json(result);
        
};

export const deleteSwapSkill = async (req, res) => {
    
    const { swap_skill_id } = req.params;
    const result = await swapSkillService.deleteSwapSkill(swap_skill_id);

    if (typeof result !== "object" || !result) {
        return res.status(500).json({ error: result });
    }

    return res.status(200).json(result);
        
};

