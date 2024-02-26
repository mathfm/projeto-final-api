import { Router } from "express";

import { skillCreateValidator } from "../shared/middleware/SkillValidator.js";
import { createSkill, getSkill, updateDescrible, updateSkillName, destroySkill } from "../controllers/Skill.controller.js";

export const skillRouter = Router();

skillRouter.post("/register-skill", skillCreateValidator, async (req, res) => {
    return await createSkill(req, res);
});

skillRouter.post("/skill/get", async (req, res) => {
    return await getSkill(req, res);
})

skillRouter.post("/skill/update-name", async (req, res) => {
    return await updateSkillName(req, res);
})

skillRouter.post("/skill/update-describle", async (req, res) => {
    return await updateDescrible(req, res);
})

skillRouter.post("/skill/delete-me", async (req, res) => {
    return await destroySkill(req, res);
})