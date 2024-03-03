import { Router } from "express";
import { createPost, deletePost, getAllPost, getPost, updatePost } from "../controllers/post.controller.js";
import { verifyIdUserMiddleware } from "../shared/middleware/user/verifyIdUser.middleware.js";
import { createPostMiddleware } from "../shared/middleware/post/createPost.middleware.js";
import { verifyIdPostMiddleware } from "../shared/middleware/post/verifyIdPost.middleware.js";
import { deletePostMiddleware } from "../shared/middleware/post/deletePost.middleware.js";
import { updatePostMiddleware } from "../shared/middleware/post/updatePost.middleware.js";


export const postRouter = Router();

postRouter.post("/:user_id/create-post", verifyIdUserMiddleware, createPostMiddleware, async (req, res) => {
    return createPost(req, res);
});

postRouter.get("/post", async (req, res) => {
    return getAllPost(req, res);
});

postRouter.get("/post/:post_id", verifyIdPostMiddleware, async (req, res) => {
    return getPost(req, res);
});

postRouter.put("/:user_id/post/:post_id/edit-post", verifyIdUserMiddleware, verifyIdPostMiddleware, updatePostMiddleware, async (req, res) => {
    return updatePost(req, res);
});

postRouter.delete("/:user_id/post/:post_id/delete-post", verifyIdUserMiddleware, verifyIdPostMiddleware, deletePostMiddleware, async (req, res) => {
    return deletePost(req, res);
});


