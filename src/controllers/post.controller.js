import { postEntities } from "../entities/Post.entities.js";

export const createPost = async (req, res) => {
    const post = {
        title: req.body.title,
        description: req.body.description,
        author_id: req.params.user_id,
        skill_id: req.body.skill_id
    }
    await postEntities.create(post);
    return res.status(201).json({ message: "post criado com sucesso!", post: await postEntities.findAll() });
}

export const updatePost = async (req, res) => { 
    const { post_id } = req.params;
    const post = {
        title: req.body.title,
        description: req.body.description,
        author_id: req.params.user_id,
        skill_id: req.body.skill_id
    }
    await postEntities.update(post, { where: { id: req.params.post_id } });
    return res.status(201).json({ message: "post atualizado com sucesso!", post: await postEntities.findByPk(post_id) });
}

export const getPost = async (req, res) => {
    const { post_id } = req.params;
    const post = await postEntities.findByPk(post_id);
    return res.status(201).json({ message: "post encontrado com sucesso!", post });
}

export const getAllPost = async (req, res) => {
    const post = await postEntities.findAll();
    return res.status(201).json({ message: "Todos os post foram carregados com sucesso!", post: post });
}

export const deletePost = async (req, res) => { 
    const { post_id } = req.params;
    await postEntities.destroy({ where: { id: post_id} });
    return res.status(201).json({ message: "post deletado com sucesso!", post: await postEntities.findAll() });
}