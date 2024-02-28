import { Router } from "express";
import { createSkill } from "../controllers/Skill.controller.js";
import { skillMiddleware } from "../shared/middleware/Skill.middleware.js";

export const skillRouter = Router();

skillRouter.post("/register-skill", skillMiddleware, async (req, res) => {
    return await createSkill(req, res);
});

