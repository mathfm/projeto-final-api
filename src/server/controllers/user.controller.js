import { UserService } from "../services/user.service.js";

const userService = new UserService();

export const createUser = async (req, res) => {

    const { name, username, email, password } = req.body;
    const result = await userService.createUser(name, username, email, password);

    if (typeof result !== "object" || !result) {
        return res.status(404).json({ error: result });;
    }

    return res.status(201).json(result);
};

export const registerUserSkill = async (req, res) => {

    const { user_id } = req.params;
    const { skill_id } = req.body;
    const result = await userService.registerUserSkill(user_id, skill_id);

    if (typeof result !== "object" || !result) {
        return res.status(500).json({ error: result });;
    }
    
    return res.status(201).json(result);
};


export const getUser = async (req, res) => {

    const { user_id } = req.params;
    const result = await userService.getUser(user_id);

    if (typeof result !== "object" || !result) {
        return res.status(500).json({ error: result });;
    }

    return res.status(200).json(result);
};

export const getAllSkillUser = async (req, res) => {
    
    const { user_id } = req.params;
    const result = await userService.getAllUserSkill(user_id);
    
    if (typeof result !== "object" || !result) {
        return res.status(500).json({ error: result });;
    }
    
    return res.status(200).json(result);
    
};

export const updatePassword = async (req, res) => {
    
    const { user_id } = req.params;
    const { password } = req.body;
    const result = await userService.updateUserPassword(user_id, password);
    
    if (typeof result !== "object" || !result) {
        return res.status(500).json({ error: result });;
    }

    return res.status(201).json(result);

};

export const updateEmail = async (req, res) => {

    const { user_id } = req.params;
    const { email } = req.body;
    const result = await userService.updateUserEmail(user_id, email);
    
    if (typeof result !== "object" || !result) {
        return res.status(500).json({ error: result });;
    }

    return res.status(201).json(result);

};

export const updateProfile = async (req, res) => {

    const { name, username, email, password } = req.body;
    const { user_id } = req.params;
    const result = await userService.updateUser(user_id, name, username, email, password);
    
    if (typeof result !== "object" || !result) {
        return res.status(500).json({ error: result });;
    }
    
    return res.status(201).json(result);

};

export const deleteUser = async (req, res) => {
    
    const { user_id } = req.params;
    const result = await userService.deleteUser(user_id);

    if (typeof result !== "object" || !result) {
        return res.status(500).json({ error: result });;
    }
    
    return res.status(200).json(result);

};

export const deleteUserSkill = async (req, res) => {

    const { user_skill_id } = req.params;
    const result = await userService.deleteUserSkill(user_skill_id);
    
    if (typeof result !== "object" || !result) {
        return res.status(500).json({ error: result });;
    }
    
    return res.status(200).json(result);
    
};


