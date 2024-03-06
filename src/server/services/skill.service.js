import { skillEntities } from "../entities/Skill.entities.js";

export class SkillService {
    async createSkill(skill_name, description) {
        try {
            const newSkill = {
                skill_name: skill_name,
                description: description
            }
            await skillEntities.create(newSkill);
            const registerSkill = await skillEntities.findOne(newSkill);
            return { message: "Skill registrada com sucesso!", skill: registerSkill };
        } catch (error) {
            return error.message;
        }
    };

    async getSkill(skill_id) {
        try {
            const result = await skillEntities.findOne({id: skill_id});
            return { message: "Skill encontrada!", skill: result };
        } catch (error) {
            return error.message;
        }
    };

    async getAllSkill() {
        try {
            const result = await skillEntities.findAll();
            return { message: "Todas as skills encontradas!", skills: result };
        } catch (error) {
            return error.message;
        }
    };

    async updateSkill(skill_id, skill_name, description) {
        try {
            const updateSkill = {
                skill_name: skill_name,
                description: description
            }
            await skillEntities.update(updateSkill, { where: { id: skill_id } });
            const result = await skillEntities.findOne({ id: skill_id });
            return { message: "Skill atualizada com sucesso!", skill: result };
        } catch (error) {
            return error.message;
        }
    };
    
    async deleteSkill(skill_id) {
        try {
            await skillEntities.destroy({ where: { id: skill_id } });
            return { message: "Skill deletada com sucesso!" };
        } catch (error) {
            return error.message;
        }
    };

};