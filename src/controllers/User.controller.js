import { database } from "../database/connection.js"
import { userEntity } from "../entities/User.entities.js";
import { userSkillEntity } from "../entities/UserSkill.entities.js";

export const createUser = async (name, username, email, password) => {
    await database.sync();
    await userEntity.create({ name, username, email, password });    
    return await userEntity.findAll();
}

export const getUserData = async (id) => {
    await database.sync();
    const user = await userEntity.findByPk(id);
    return user;
}

export const updatePassword = async (id, newPassword)=>{
    await database.sync();
    const user = await userEntity.findByPk(id);
    await user.update({password:newPassword});
    return  "Senha atualizada com sucesso!";
}

export const updateEmail = async (id, newEmail)=>{
    await database.sync();
    const user = await userEntity.findByPk(id);
    await user.update({email:newEmail});
    return  "Email atualizado com sucesso!";
}

export const destroyUser = async (id)=>{
    await database.sync();
    const user = await userEntity.findByPk(id);
    await user.destroy();
    return  "Usuario deletado!";
}

export const registerUserSkill = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { skill_id } = req.body;
        await userSkillEntity.create({ user_id, skill_id });
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

        await userEntity.update(userInfoUpdate, {
            where: {
                id: req.params.user_id
            }
        })

        return res.status(200).json({ message: "Perfil atualizado com sucesso!" });

    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}