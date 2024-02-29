import { userSkillEntity } from "../../../entities/UserSkill.entities.js";

export const deleteSkillMiddleware = async (req, res, next) => {
    const skill_id = req.params.skill_id;
    const skillUsed = await userSkillEntity.findOne({ where: { skill_id: skill_id } });

    if (skillUsed) {
        return res.status(400).json({ error: "Mais usuarios registraram essa skill, ela não pode ser deletada."})
    }
    next();
}