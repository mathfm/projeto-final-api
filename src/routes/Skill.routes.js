import { Router } from "express";
import { createSkill, getSkill, deleteSkill, updateSkill, getAllSkill } from "../controllers/Skill.controller.js";
import { createSkillMiddleware } from "../shared/middleware/skill/Create.middleware.js";
import { verifyIdSkillMiddleware } from "../shared/middleware/skill/SkillVerifyID.middleware.js";
import { skillUpdateMiddleware } from "../shared/middleware/skill/Update.middleware.js";

export const skillRouter = Router();

skillRouter.post("/register-skill", createSkillMiddleware, async (req, res) => {
    return await createSkill(req, res);
});

skillRouter.get("/skill/:skill_id", verifyIdSkillMiddleware, async (req, res) => {
    return getSkill(req, res);
});

skillRouter.get("/skill/", (req, res) => { 
    return getAllSkill(req, res);
})

skillRouter.put("/skill/:skill_id/update", verifyIdSkillMiddleware, skillUpdateMiddleware, async (req, res) => {
    return await updateSkill(req, res);
});


skillRouter.delete("/skill/:skill_id/delete-skill", verifyIdSkillMiddleware, async (req, res) => {
    return deleteSkill(req, res);
});