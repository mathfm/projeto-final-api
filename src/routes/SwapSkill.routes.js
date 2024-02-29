import { Router } from "express";
import { createSwapSkill, deleteSwapSkill, getSwapSkills } from "../controllers/SwapSkill.controller.js";
import { swapSkillMiddleware } from "../shared/middleware/swapskill/SwapSkill.middleware.js";
import { verifyIdSwapSkillMiddleware } from "../shared/middleware/swapskill/IdSwapSkillVerify.middleware.js";
import { verifyIdUserMiddleware } from "../shared/middleware/user/UserVerifyID.middleware.js";

export const swapSkillRouter = Router();

swapSkillRouter.post("/:user_sender_id/invited/", swapSkillMiddleware, async (req, res) => {
    return createSwapSkill(req, res);
});

swapSkillRouter.get("/swap-skill/:user_id", verifyIdUserMiddleware, async (req, res) => {
    return getSwapSkills(req, res);
});

swapSkillRouter.delete("/swap-skill/:swap_skill_id/delete", verifyIdSwapSkillMiddleware, async (req, res) => {
    return deleteSwapSkill(req, res);
});

