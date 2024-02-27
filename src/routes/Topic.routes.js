import { Router } from "express";
import { topicMiddleware } from "../shared/middleware/Topic.middleware.js";
import { topicEntities } from "../entities/Topic.entities.js";


export const topicRouter = Router();

topicRouter.post("/:user_id/register-topic", topicMiddleware, async (req, res) => { 
    topicEntities.create({
        user_id_create_topic: req.params.user_id,
        title: req.body.title,
        description: req.body.description,
        skill_id_category: req.body.skill_id_category
    })

    return res.json({
        message: "Topic created"
    })
})