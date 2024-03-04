import { Router } from "express";
import { createPostComment, deletePostComment, getAllPostComment, getPostComment, updatePostComment } from "../controllers/postComment.controller.js";
import { createPostCommentMiddleware } from "../shared/middleware/postcomment/createPostComment.middleware.js";
import { verifyIdPostMiddleware } from "../shared/middleware/post/verifyIdPost.middleware.js";
import { verifyIdUserMiddleware } from "../shared/middleware/user/verifyIdUser.middleware.js";
import { verifyIdPostCommentMiddleware } from "../shared/middleware/postcomment/verifyIdPostComment.middleware.js";
import { updatePostCommentMiddleware } from "../shared/middleware/postcomment/updatePostComment.middleware.js";
import { deletePostCommentMiddleware } from "../shared/middleware/postcomment/deletePostComment.middleware.js";

export const postCommentRouter = Router();

postCommentRouter.post("/:user_id/:post_id/create-comment", verifyIdUserMiddleware, verifyIdPostMiddleware, createPostCommentMiddleware, async (req, res) => {
    return createPostComment(req, res);
});

postCommentRouter.get("/:post_id/comment", verifyIdPostMiddleware, async (req, res) => {
    return getAllPostComment(req, res);
});

postCommentRouter.get("/post/:comment_id/comment", verifyIdPostCommentMiddleware, async (req, res) => {
    return getPostComment(req, res);
});

postCommentRouter.put("/:user_id/:comment_id/update-comment", verifyIdUserMiddleware, updatePostCommentMiddleware, async (req, res) => {
    return updatePostComment(req, res);
});

postCommentRouter.delete("/:user_id/:comment_id/delete-comment", verifyIdUserMiddleware, verifyIdPostCommentMiddleware, deletePostCommentMiddleware,  async (req, res) => { 
    return deletePostComment(req, res);
});