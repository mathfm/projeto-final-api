import { Router } from "express";
import { createPostComment, deletePostComment, getAllPostComment, getPostComment, updatePostComment } from "../controllers/postComment.controller.js";

export const postCommentRouter = Router();

postCommentRouter.post("/:user_id/:post_id/create-comment", async (req, res) => {
    return createPostComment(req, res);
});

postCommentRouter.get("/:post_id/comment", async (req, res) => {
    return getAllPostComment(req, res);
});

postCommentRouter.get("/post/:comment_id/comment", async (req, res) => {
    return getPostComment(req, res);
});

postCommentRouter.put("/:comment_id/update-comment", async (req, res) => {
    return updatePostComment(req, res);
});

postCommentRouter.delete("/:comment_id/delete", async (req, res) => { 
    return deletePostComment(req, res);
});