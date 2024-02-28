import { skillEntities } from "../../../entities/Skill.entities.js"

export const verifyIdSkillMiddleware = async (req, res, next) => {
    const skill_id = req.params.skill_id;
    const findSkill = await skillEntities.findByPk(skill_id);
    if (!findSkill) {
        return res.status(404).json({ error: "O id da skill não é valido ou não existe." });
    }

    next();

}