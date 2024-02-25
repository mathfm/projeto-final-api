import { object, string, ValidationError } from "yup";
import { skillEntities } from "../../entities/Skill.entities.js";

const userSkillSchema = object({
    user_id: string().required().length(36),
    skill_id: string().required().length(36)
});

export const userSkillValidateCreate = async (req, res, next) => {
    try {
        const userBody = {
            user_id: req.params.user_id,
            skill_id: req.body.skill_id
        }
        
        await userSkillSchema.validate(userBody, { abortEarly: false });
        const validateSkill = await skillEntities.findByPk(req.body.skill_id);
        if (!validateSkill) {
            return res.status(400).json({ errors: { error: "Skill essa não existe", path: "skill_id" } });
        } 

        return next();

        
    } catch (error) {
        const captureErros = [];
        if (error instanceof ValidationError) {
            error.inner.forEach(error => {
                captureErros.push({ error: error.message, path: error.path });
            })
            
            return res.status(400).json({ errors: captureErros });
        }
    }
}