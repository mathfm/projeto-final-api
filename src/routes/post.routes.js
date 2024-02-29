import { Router } from "express";
import { createPost } from "../controllers/post.controller.js";


export const postRouter = Router();

postRouter.post("/:user_id/create-post", async (req, res) => {
    return createPost(req, res);
});