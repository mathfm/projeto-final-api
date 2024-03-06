import { PostSerivce } from "../services/post.service.js";

const postSerivce = new PostSerivce(); 
export const createPost = async (req, res) => {
    
    const { user_id } = req.params;
    const { title, description, skill_id } = req.body;
    const result = await postSerivce.createPost(title, description, user_id, skill_id);

    if (typeof result !== "object" || !result) {
        return res.status(500).json({ error: result });
    }

    return res.status(201).json(result);

}

export const updatePost = async (req, res) => { 

    const { post_id, user_id } = req.params;
    const { title, description, skill_id } = req.body
    const result = await postSerivce.updatePost(post_id, title, description, user_id, skill_id);

    if (typeof result !== "object" || !result) {
        return res.status(500).json({ error: result });
    }

    return res.status(200).json(result);

}

export const getPost = async (req, res) => {

    const { post_id } = req.params;
    const result = await postSerivce.getPost(post_id);

    if (typeof result !== "object" || !result) {
        return res.status(500).json({ error: result });
    }

    return res.status(200).json(result);

}

export const getAllPost = async (req, res) => {

    const result = await postSerivce.getAllPost();

    if (typeof result!== "object" ||!result) {
        return res.status(500).json({ error: result });
    }

    return res.status(200).json(result);

}

export const deletePost = async (req, res) => { 
    
    const { post_id } = req.params;
    const result = await postSerivce.deletePost(post_id);

    if (typeof result!== "object" ||!result) {
        return res.status(500).json({ error: result });
    }

    return res.status(200).json(result);

}