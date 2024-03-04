import { postEntities } from "../../../entities/Post.entities.js";

export const verifyIdPostMiddleware = async (req, res, next) => {
    const post_id = req.params.post_id;
    const findPost = await postEntities.findByPk(post_id);
    if (!findPost) {
        return res.status(404).json({ message: "post não encontrado!" });
    }
    next();
}