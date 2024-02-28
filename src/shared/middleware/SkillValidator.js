import { object, string, ValidationError } from "yup";
import { skillEntities } from "../../entities/Skill.entities.js";

const skillSchema = object({
    skill_name: string().required().min(3).max(20).lowercase(),
    describle: string().required().min(5).max(200).lowercase()
});

export const skillCreateValidator = async (req, res, next) => {
    try {
        const skillExist = await skillEntities.findOne({
            where: {
                skill_name: req.body.skill_name
            }
        })
        
        if (!skillExist) {
            await skillSchema.validate(req.body, { abortEarly: false });
            return next();
        }
        
        else {
            res.status(400).json({
                errors: { error: "skill already exist" }
            });
        }

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
