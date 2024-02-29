import { userSkillEntity } from "../../../entities/UserSkill.entities.js";

export const verifyIdUserSkillMiddleware = async (req, res, next) => { 

    const user_skill_id = req.params.user_skill_id;

    const findUserSkill = await userSkillEntity.findByPk(user_skill_id);
    if (!findUserSkill) {
        return res.status(404).json({ error: "Seu registro dessa skill e invalido ou não existe." });
    }
    next();

}