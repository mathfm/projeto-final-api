import { database } from "../database/connection.js"
import { userEntity } from "../entities/User.entities.js";



export const createUser = async (name, email, password) => {
    await database.sync();
    await userEntity.create({ name, email, password });    
    return userEntity.findAll();
}