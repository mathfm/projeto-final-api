import { database } from "../database/connection.js"
import { userEntities } from "../entities/User.entities.js";
import { userSkillEntities } from "../entities/UserSkill.entities.js";

export const createUser = async (req, res) => {
    try {
        await database.sync();
        const { name, username, email, password } = req.body; 
        await userEntities.create({ name, username, email, password });    
        const user = await userEntities.findOne({ where: { email: email } });
        return res.status(201).json({ sucess: "Cadastro feito com sucesso", user: user });;       
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export const getUser = async (req, res) => {
    await database.sync();
    const { user_id } = req.params;
    const user = await userEntities.findOne({ where: { id: user_id } });
    return res.status(200).json({ user: user });
}

export const updatePassword = async (req, res) => {
    try {
        await database.sync();
        const { user_id } = req.params;
        const { password } = req.body;
        await userEntities.update({ password: password }, { where: { id: user_id } });
        return res.status(200).json({ sucess: "Senha trocada com sucesso!" });        
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

export const updateEmail = async (req, res) => {
    try {
        await database.sync();
        const { user_id } = req.params;
        const { email } = req.body;
        await userEntities.update({ email: email }, { where: { id: user_id } });
        return res.status(200).json({ sucess: "Seu email foi alterado!" });
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        await database.sync();
        const { user_id } = req.params;
        userEntities.destroy({where: { id: user_id } });
        return res.status(200).json({ sucess: "Usuario deletado com sucesso!" });        
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

export const registerUserSkill = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { skill_id } = req.body;
        await userSkillEntities.create({ user_id, skill_id });
        return res.status(201).json({ message: "Sua skill adicionado com sucesso na conta!" });

    } catch (error) {
        return res.stauts(404).json({ error: error.message });
    }
    
}

export const updateProfile = async (req, res) => {
    try {
        const userInfoUpdate = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }

        await userEntities.update(userInfoUpdate, {
            where: {
                id: req.params.user_id
            }
        })

        return res.status(200).json({ message: "Perfil atualizado com sucesso!" });

    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

export const deleteUserSkill = async (req, res) => {
    try {
        const { user_skill_id } = req.params;
        await userSkillEntities.destroy({ where: { id: user_skill_id } });
        return res.status(200).json({ sucess: "Skill removida da sua conta com sucesso!" });        
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

export const getAllSkillUser = async (req, res) => { 
    try {
        const { user_id } = req.params;
        const skills_list = await userSkillEntities.findAll({ where: { user_id: user_id } });
        return res.status(200).json({ skills_list });
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}