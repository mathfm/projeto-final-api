import { userEntities } from "../entities/User.entities.js"
import { userSkillEntities } from "../entities/UserSkill.entities.js";

export class UserService {
    constructor() { };
    async createUser(name, username, email, password) {
        try {
            const newUserCreate = {
                name: name,
                username: username,
                email: email,
                password: password
            }            

            await userEntities.create(newUserCreate);

            const registerUser = await userEntities.findOne({ username: newUserCreate.username, email: newUserCreate.email });

            return { message: "Cadastro realizado com sucesso", user: registerUser };     
            
        } catch (error) {
            return error.message;
        }
    };

    async registerUserSkill(user_id, skill_id) {
        try {
            const newUserSkill = {
                user_id: user_id,
                skill_id: skill_id
            }
            await userSkillEntities.create(newUserSkill);
            const userSkill = await userSkillEntities.findOne(newUserSkill);
            return { message: "Sua skill foi adicionada com sucesso na conta!", userSkill: userSkill };
        } catch (error) {
            return error.message; 
        }
    }

    async getUser(user_id) {
        try {
            const result = await userEntities.findByPk(user_id);

            return { message: "Usuario encontrado com sucesso!", user: result };

        } catch (error) {
            return error.message;
        }
    };

    async getAllUserSkill(user_id) { 
        try {
            const result = await userSkillEntities.findAll({ where: { user_id: user_id } });
            return { message: "Lista de habilidades do usuario encontrada", users: result };
        } catch (error) {
            return error.message;
        }
    };

    async updateUserPassword(user_id, password) {
        try {
            await userEntities.update({ password: password }, { where: { id: user_id } });
            return { message: "Senha alterada com sucesso!" };
        } catch (error) {
            return error.message;
        }
    };

    async updateUserEmail(user_id, email) {
        try {
            await userEntities.update({ email: email }, { where: { id: user_id } });
            return { message: "Email alterada com sucesso!" };
        } catch (error) {
            return error.message;
        }
    };

    async updateUser(user_id, name, username, email, password) {
        try {
            const userUpdate = {
                name: name,
                username: username,
                email: email,
                password: password
            }
            await userEntities.update(userUpdate, { where: { id: user_id } });
            const user = await userEntities.findOne({ username: userUpdate.username });
            return { message: "Usuario alterado com sucesso!", user: user };
        } catch (error) {
            return error.message;
        }
    };

    async deleteUser(user_id) {
        try {
            await userEntities.destroy({ where: { id: user_id } });
            return { message: "Usuario removido com sucesso!" };
        } catch (error) {
            return error.message;
        }
    };

    async deleteUserSkill(user_skill_id) {
        try {
            await userSkillEntities.destroy({ where: { id: user_skill_id } });
            return { message: "Skill removida da sua conta com sucesso!" };
        } catch (error) {
            return error.message;
        }
    };
};