import { Router } from "express";

import { skillCreateValidator } from "../shared/middleware/SkillValidator.js";
import { createSkill, getSkill, updateDescrible, updateSkillName, destroySkill } from "../controllers/Skill.controller.js";

export const skillRouter = Router();

skillRouter.post("/register-skill", skillCreateValidator, async (req, res) => {
    return await createSkill(req, res);
});

skillRouter.post("/skill/get", async (req, res) => {
    const {id} = req.body;
    const result = await getSkill(id);
    res.json(result);
});

skillRouter.post("/skill/update-name", async (req, res) => {
    const {id, newName} = req.body;
    const result = await updateSkillName(id, newName);
    res.json(result);
});

skillRouter.post("/skill/update-describle", async (req, res) => {
    const {id, newDescrible} = req.body;
    const result = await updateDescrible(id, newDescrible);
    res.json(result);
});

skillRouter.post("/skill/delete-me", async (req, res) => {
    const {id} = req.body;
    const result = await destroySkill(id);
    res.json(result);
});