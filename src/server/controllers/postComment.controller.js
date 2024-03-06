import { PostCommentSerivce } from "../services/postComment.service.js";

const postCommentSerivce = new PostCommentSerivce();
export const createPostComment = async (req, res) => {
    
    const { user_id, post_id } = req.params;
    const { comment } = req.body;
    const result = await postCommentSerivce.createPostComment(user_id, post_id, comment);

    if (typeof result !== "object" || !result) {
        return res.status(500).json({ error: result });
    }

    return res.status(201).json(result);
    
}

export const getAllPostComment = async (req, res) => {
    const { post_id } = req.params;
    const result = await postCommentSerivce.getAllPostComment(post_id);

    if (typeof result !== "object" || !result) {
        return res.status(500).json({ error: result})
    }

    return res.status(200).json(result);

};

export const getPostComment = async (req, res) => { 
    const { comment_id } = req.params;
    const result = await postCommentSerivce.getPostComment(comment_id);
    
    if (typeof result !== "object" || !result) {
        return res.status(500).json({ error: result})
    }

    return res.status(200).json(result);

}

export const updatePostComment = async (req, res) => { 
    const { comment_id } = req.params;
    const { comment } = req.body;
    
    const result = await postCommentSerivce.updatePostComment(comment_id, comment);

    if (typeof result !== "object" || !result) {
        return res.status(500).json({ error: result})
    }

    return res.status(201).json(result);

};

export const deletePostComment = async (req, res) => {
    const { comment_id } = req.params;
    const result = await postCommentSerivce.deletePostComment(comment_id);

    if (typeof result !== "object" || !result) {
        return res.status(500).json({ error: result})
    }

    return res.status(201).json(result);

};