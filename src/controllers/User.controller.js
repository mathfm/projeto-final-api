import { database } from "../database/connection.js"
import { userEntity } from "../entities/User.entities.js";

export const createUser = async (name, email, password) => {
    await database.sync();
    await userEntity.create({ name, email, password });    
    return userEntity.findAll();
}

export const updatePassword = async (id, newPassword)=>{
    await database.sync();
    const user = await userEntity.findByPk(id);
    await user.update({password:newPassword});
    return  "Senha atualizada com sucesso!";
}