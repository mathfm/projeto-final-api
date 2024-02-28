import { Router } from "express";
import { createUser, deleteUser, getUser, registerUserSkill, updateEmail, updatePassword, updateProfile } from "../controllers/User.controller.js";
import { createSwapSkill } from "../controllers/SwapSkill.controller.js";
import { deleteUserMiddleware, updateEmalMiddleware, updatePasswordMiddleware, userMiddleware, userUpdateMiddleware, verifyIdUserMiddleware } from "../shared/middleware/User.middleware.js";
import { userSkillMiddleare } from "../shared/middleware/UserSkill.middleware.js";
import { swapSkillMiddleware } from "../shared/middleware/SwapSkill.middleware.js";

const userRouter = Router();

userRouter.post("/register-user", userMiddleware, async (req, res) => { 
    return await createUser(req, res);
})

userRouter.patch("/user/:user_id/change-password", updatePasswordMiddleware, async (req, res) => {
    return await updatePassword(req, res);
})

userRouter.patch("/user/:user_id/change-email", updateEmalMiddleware, async (req, res) => {
    return await updateEmail(req, res);
})

userRouter.delete("/user/:user_id/delete-profile", deleteUserMiddleware, async (req, res) => {
    return await deleteUser(req, res);
})

userRouter.get("/user/:user_id/", verifyIdUserMiddleware, async (req, res) => {
    return await getUser(req, res);
})

userRouter.post("/user/:user_id/register-skill", userSkillMiddleare, async(req, res) => {
    return await registerUserSkill(req, res);
})

userRouter.post("/user/:user_sender_id/invited", swapSkillMiddleware, async (req, res) => {
    return await createSwapSkill(req, res)
})

userRouter.put("/user/:user_id/edit-profile", userUpdateMiddleware, async (req, res) => {
    return await updateProfile(req, res);
})

export { userRouter };