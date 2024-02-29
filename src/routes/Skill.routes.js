import { Router } from "express";
import { createSkill, getSkill, deleteSkill, updateSkill, getAllSkill } from "../controllers/Skill.controller.js";
import { createSkillMiddleware } from "../shared/middleware/skill/createSkill.middleware.js";
import { verifyIdSkillMiddleware } from "../shared/middleware/skill/verifyIdSkill.middleware.js";
import { updateSkillMiddleware } from "../shared/middleware/skill/updateSkill.middleware.js";
import { deleteSkillMiddleware } from "../shared/middleware/skill/deleteSkill.middleware.js";

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

skillRouter.put("/skill/:skill_id/update", verifyIdSkillMiddleware, updateSkillMiddleware, async (req, res) => {
    return await updateSkill(req, res);
});


skillRouter.delete("/skill/:skill_id/delete-skill", verifyIdSkillMiddleware, deleteSkillMiddleware, async (req, res) => {
    return deleteSkill(req, res);
});