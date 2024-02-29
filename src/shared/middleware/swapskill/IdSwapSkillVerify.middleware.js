import { swapSkillEntity } from "../../../entities/SwapSkill.entities.js";

export const verifyIdSwapSkillMiddleware = async (req, res, next) => {
    const swap_skill_id = req.params.swap_skill_id;
    const findSwap = await swapSkillEntity.findByPk(swap_skill_id);
    if (!findSwap) {
        return res.status(404).json({ error: "Esse id não e valido ou foi deletado." });
    }
    next();
}