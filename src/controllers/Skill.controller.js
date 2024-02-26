import { database } from "../database/connection.js";
import { skillEntities } from "../entities/Skill.entities.js";


export const createSkill = async (req, res) => {
    try {
        await database.sync();
        const { skill_name, describle_skill } = req.body;
        await skillEntities.create({ skill_name, describle_skill });
        return res.status(201).json({ message: "skill registrada com sucesso" });
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

export const updateDescrible = async (id, newDescrible) =>{
    await database.sync();
    const skill = await skillEntities.findByPk(id);
    await skill.update({describle:newDescrible});
    return  "Descrição atualizada com sucesso";
};

export const updateSkillName = async (id, newName) =>{
    await database.sync();
    const skill = await skillEntities.findByPk(id);
    await skill.update({skill_name:newName});
    return  "Nome atualizado com sucesso!";
};

export const destroySkill = async (id)=>{
    await database.sync();
    const skill = await skillEntities.findByPk(id);
    await skill.destroy();
    return  "Habilidade deletada!";
}