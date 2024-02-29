import { postEntities } from "../entities/Post.entities.js";

export const createPost = async (req, res) => {
    const topic = {
        title: req.body.title,
        description: req.body.description,
        author_id: req.params.user_id,
        skill_id: req.body.skill_id
    }
    await postEntities.create(topic);
    return res.status(201).json({ message: "post criado com sucesso!" });
}

