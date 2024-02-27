import { database } from "../database/connection.js";
import { skillEntities } from "../entities/Skill.entities.js";


export const createSkill = async (req, res) => {
    try {
        await database.sync();
        const { skill_name, describle } = req.body;
        await skillEntities.create({ skill_name, describle });
        return res.status(201).json({ message: "skill registrada com sucesso" });
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

export const getSkill = async (req, res) => {
    try{
        await database.sync();
        const {id} = req.body;
        const skill = await skillEntities.findByPk(id);
        return res.status(200).json({skill});
    } catch(error){
        return res.status(404).json({ error: error.message });
    }
}

export const updateDescrible = async (req, res) =>{
    try{
        await database.sync();
        const {id, newDescrible} = req.body;
        const skill = await skillEntities.findByPk(id);
        await skill.update({describle:newDescrible});
        return res.status(200).json({ message: "Descrição atualizada com sucesso" });
    } catch(error){
        return res.status(404).json({ error: error.message });
    }

};

export const updateSkillName = async (req, res) =>{
    try{
        await database.sync();
        const { id, newName } = req.body;
        const skill = await skillEntities.findByPk(id);
        await skill.update({skill_name:newName});
        return res.status(200).json({ message: "Nome atualizado com sucesso!"});
    } catch(error){
        return res.status(404).json({ error: error.message });
    }
};

export const destroySkill = async (req, res)=>{
    try{
        await database.sync();
        const { id } = req.body;
        const skill = await skillEntities.findByPk(id);
        await skill.destroy();
        return res.status(200).json({ message: "Habilidade deletada!"});
    } catch(error){
        return res.status(404).json({ error: error.message });
    }
}