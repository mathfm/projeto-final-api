import { Router } from "express";
import { createSwapSkill, deleteSwapSkill, getSwapSkills } from "../controllers/swapSkill.controller.js";
import { createSwapSkillMiddleware } from "../shared/middleware/swapskill/createSwapSkill.middleware.js";
import { verifyIdUserMiddleware } from "../shared/middleware/user/verifyIdUser.middleware.js";
import { verifyIdSwapSkillMiddleware } from "../shared/middleware/swapskill/verifyIdSwapSkill.middleware.js";


export const swapSkillRouter = Router();

swapSkillRouter.post("/:user_id/invited/", verifyIdUserMiddleware, createSwapSkillMiddleware, async (req, res) => {
    return createSwapSkill(req, res);
});

swapSkillRouter.get("/swap-skill/:user_id", verifyIdUserMiddleware, async (req, res) => {
    return getSwapSkills(req, res);
});

swapSkillRouter.delete("/swap-skill/:swap_skill_id/delete", verifyIdSwapSkillMiddleware, async (req, res) => {
    return deleteSwapSkill(req, res);
});

