import { Router } from "express";

import { skillCreateValidator } from "../shared/middleware/SkillValidator.js";
import { createSkill } from "../controllers/Skill.controller.js";

export const skillRouter = Router();

skillRouter.post("/register-skill", skillCreateValidator, async (req, res) => {
    return await createSkill(req, res);
});

