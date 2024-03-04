import { postCommentEntities } from "../entities/PostComment.entities.js";

export const createPostComment = async (req, res) => {
    const post = {
        user_id: req.params.user_id,
        post_id: req.params.post_id,
        comment: req.body.comment
    }
    await postCommentEntities.create(post);

    const postComment = await postCommentEntities.findOne({ where: { user_id: post.user_id, post_id: post.post_id } });
    
    return res.status(201).json({ message: "Comentario registrado", postComment: postComment });

}

export const getAllPostComment = async (req, res) => {
    const { post_id } = req.params;
    const postComments = await postCommentEntities.findAll({ where: { post_id: post_id } });
    return res.status(200).json({ postComments });
};

export const getPostComment = async (req, res) => { 
    const { comment_id } = req.params;
    const postComment = await postCommentEntities.findOne({ where: { id: comment_id } });
    return res.status(200).json({ postComment });
}

export const updatePostComment = async (req, res) => { 
    const { comment_id } = req.params;
    const { comment } = req.body;
    await postCommentEntities.update({ comment: comment }, { where: { id: comment_id } });
    const postComment = await postCommentEntities.findOne({ where: { id: comment_id } });
    return res.status(201).json({ postComment });
};

export const deletePostComment = async (req, res) => {
    const { comment_id } = req.params;
    await postCommentEntities.destroy({ where: { id: comment_id } });
    return res.status(200).json({ sucess: "Comentario deletado com sucesso!" });

};