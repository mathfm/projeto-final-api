import { postEntities } from "../../../entities/Post.entities.js";
import { userSkillEntities } from "../../../entities/UserSkill.entities.js";

export const deleteSkillMiddleware = async (req, res, next) => {
    const skill_id = req.params.skill_id;
    const skillUsed = await userSkillEntities.findOne({ where: { skill_id: skill_id } });
    const postSkillUsed = await postEntities.findOne({ where: { skill_id: skill_id } });
    if (skillUsed || postSkillUsed) {
        return res.status(400).json({ error: "Mais usuarios utilizam essa skill, ela não pode ser deletada."})
    }
    next();
}