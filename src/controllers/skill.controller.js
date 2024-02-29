import { database } from "../database/connection.js";
import { skillEntities } from "../entities/skill.entities.js";


export const createSkill = async (req, res) => {
    try {
        await database.sync();
        const { skill_name, description } = req.body;
        await skillEntities.create({ skill_name, description });
        return res.status(201).json({ message: "skill registrada com sucesso" });
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

export const getSkill = async (req, res) => {
    try{
        await database.sync();
        const { skill_id } = req.params;
        const skill = await skillEntities.findOne({ where: { id: skill_id } });
        return res.status(200).json({ skill: skill });
    } catch(error){
        return res.status(404).json({ error: error.message });
    }
}

export const getAllSkill = async (req, res) => { 
    try {
        const skills = await skillEntities.findAll();
        return res.status(200).json({ skills });
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

export const updateSkill = async (req, res) =>{
    try {
        
        await database.sync();
        const { skill_id } = req.params;
        const { skill_name, description } = req.body;

        const skill = await skillEntities.findByPk(skill_id);
        await skill.update({skill_name: skill_name, description: description});
        return res.status(200).json({ message: "Informações atualizada com sucesso!"});
    } catch(error){
        return res.status(404).json({ error: error.message });
    }
};


export const deleteSkill = async (req, res)=>{
    try{
        await database.sync();
        const { skill_id } = req.params;
        const skill = await skillEntities.findByPk(skill_id);
        await skill.destroy();
        return res.status(200).json({ message: "Habilidade deletada!"});
    } catch(error){
        return res.status(404).json({ error: error.message });
    }
}
