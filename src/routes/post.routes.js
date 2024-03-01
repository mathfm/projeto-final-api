import { Router } from "express";
import { createPost, deletePost, getAllPost, getPost, updatePost } from "../controllers/post.controller.js";


export const postRouter = Router();

postRouter.post("/:user_id/create-post", async (req, res) => {
    return createPost(req, res);
});

postRouter.get("/post", async (req, res) => {
    return getAllPost(req, res);
});

postRouter.get("/post/:post_id", async (req, res) => {
    return getPost(req, res);
});

postRouter.put("/:user_id/post/:post_id/edit-post", async (req, res) => {
    return updatePost(req, res);
});

postRouter.delete("/:user_id/post/:post_id/delete-post", async (req, res) => {
    return deletePost(req, res);
});


