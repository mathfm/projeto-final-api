import { postCommentEntities } from "../../../entities/PostComment.entities.js";

export const verifyIdPostCommentMiddleware = async (req, res, next) => {
    const { comment_id } = req.params;
    const findPostComment = await postCommentEntities.findByPk(comment_id);
    if (!findPostComment) {
        return res.status(404).json({ message: "Comentario não encontrado!" });
    }
    next();
}