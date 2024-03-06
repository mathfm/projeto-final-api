import { SkillService } from "../services/skill.service.js";

const skillService = new SkillService();

export const createSkill = async (req, res) => {

    const { skill_name, description } = req.body;
    const result = await skillService.createSkill(skill_name, description);

    if (typeof result !== "object" || !result) {
        return res.status(500).json({ error: result });
    }

    return res.status(201).json(result);

};

export const getSkill = async (req, res) => {
    
    const { skill_id } = req.params;
    const result = await skillService.getSkill(skill_id);
        
    if (typeof result !== "object" || !result) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(result);
        
}

export const getAllSkill = async (req, res) => { 

    const result = await skillService.getAllSkill();
        
    if (typeof result !== "object" || !result) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(result);
    
}

export const updateSkill = async (req, res) =>{
    
    const { skill_id } = req.params;
    const { skill_name, description } = req.body;
    const result = await skillService.updateSkill(skill_id, skill_name, description);
    
    if (typeof result!== "object" || !result) {
        return res.status(500).json({ error: error.message });
    }
    
    return res.status(201).json({ message: "Informações atualizada com sucesso!" });
    
};

export const deleteSkill = async (req, res)=>{

    const { skill_id } = req.params;
    const result = await skillService.deleteSkill(skill_id);
    
    if (typeof result !== "object" || !result) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(result);

}
