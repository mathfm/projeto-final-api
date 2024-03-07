import { Router } from "express";
import { createSwapSkill, deleteSwapSkill, getSwapSkills, updateSwapSkill } from "../controllers/swapSkill.controller.js";
import { createSwapSkillMiddleware } from "../shared/middleware/swapskill/createSwapSkill.middleware.js";
import { verifyIdUserMiddleware } from "../shared/middleware/user/verifyIdUser.middleware.js";
import { verifyIdSwapSkillMiddleware } from "../shared/middleware/swapskill/verifyIdSwapSkill.middleware.js";
import { updateSwapSkillMiddleware } from "../shared/middleware/swapskill/updateSwapSkill.middleware.js";


export const swapSkillRouter = Router();

swapSkillRouter.post("/:user_id/invited/", verifyIdUserMiddleware, createSwapSkillMiddleware, async (req, res) => {
    return createSwapSkill(req, res);
});

swapSkillRouter.get("/swap-skill/:user_id", verifyIdUserMiddleware, async (req, res) => {
    return getSwapSkills(req, res);
});

swapSkillRouter.put("/:user_id/:swap_skill_id/update-invited", verifyIdUserMiddleware, updateSwapSkillMiddleware, async (req, res) => {
    return updateSwapSkill(req, res);
});

swapSkillRouter.delete("/swap-skill/:swap_skill_id/delete", verifyIdSwapSkillMiddleware, async (req, res) => {
    return deleteSwapSkill(req, res);
});

