import { Router } from "express";
import { createSkill, getSkill, updateDescrible, updateSkillName, destroySkill } from "../controllers/Skill.controller.js";
import { skillMiddleware } from "../shared/middleware/Skill.middleware.js";

export const skillRouter = Router();

skillRouter.post("/register-skill", skillMiddleware, async (req, res) => {
    return await createSkill(req, res);
});

skillRouter.post("/skill/get", async (req, res) => {
    return getSkill(req, res);
});

skillRouter.post("/skill/update-name", async (req, res) => {
    return updateSkillName(req, res);
});

skillRouter.post("/skill/update-describle", async (req, res) => {
    return updateDescrible(req, res);
});

skillRouter.post("/skill/delete-me", async (req, res) => {
    return destroySkill(req, res);
});