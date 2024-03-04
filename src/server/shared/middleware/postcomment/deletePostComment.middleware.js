import { postEntities } from "../../../entities/Post.entities.js";
import { postCommentEntities } from "../../../entities/PostComment.entities.js";

export const deletePostCommentMiddleware = async (req, res, next) => {
    const user_id = req.params.user_id;
    const comment_id = req.params.comment_id;

    const commentUser = await postCommentEntities.findOne({ id: comment_id });

    const postAuthor = await postEntities.findOne({ id: commentUser.post_id });

    if (!commentUser.user_id === user_id || postAuthor.author_id !== user_id) {
        return res.status(400).json({ error: "Você não tem autorização para deletar esse comentario." });
    }

    next();
}