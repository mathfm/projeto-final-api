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

export const getSkill = async (req, res) => {
    try{
        await database.sync();
        const {id} = req.body;
        const skill = await skillEntities.findByPk(id);
        return skill;
    }catch(erro){
        return res.json({erro: erro.message})
    }
}

export const updateDescrible = async (req, res) =>{
    try{
        await database.sync();
        const {id, newDescrible} = req.body;
        const skill = await skillEntities.findByPk(id);
        await skill.update({describle:newDescrible});
        return  "Descrição atualizada com sucesso";
    }catch(erro){
        return res.json({erro: erro.message})
    }
};

export const updateSkillName = async (req, res) =>{
    try{
        await database.sync();
        const { id, newName } = req.body;
        const skill = await skillEntities.findByPk(id);
        await skill.update({skill_name:newName});
        return  "Nome atualizado com sucesso!";
    }catch(erro){
        return res.json({erro: erro.message})
    }
};

export const destroySkill = async (req, res)=>{
    try{
        await database.sync();
        const { id } = req.body
        const skill = await skillEntities.findByPk(id);
        await skill.destroy();
        return  "Habilidade deletada!";
    }catch(erro){
        return res.json({erro: erro.message})
    }
}