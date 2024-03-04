import { postEntities } from "../../../entities/Post.entities.js";

export const deletePostMiddleware = async (req, res, next) => {
    const post_id = req.params.post_id;
    const author_id = req.params.user_id;

    const findPost = await postEntities.findOne({ post_id: post_id });
    

    if (author_id !== findPost.author_id) {
        return res.status(403).json({ error: "Você não tem autorização para deletar esse post." });
    }

    next();
}