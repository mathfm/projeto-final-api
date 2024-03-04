import { Router } from "express";

import { createSkillMiddleware } from "../shared/middleware/userskill/createUserSkill.middleware.js";
import { verifyIdUserSkillMiddleware } from "../shared/middleware/userskill/verifyIdUserSkill.middleware.js";
import { updateUserPasswordMiddleware } from "../shared/middleware/user/updateUserPassword.middleware.js";
import { updateEmailMiddleware } from "../shared/middleware/user/updateUserEmail.middleware.js";
import { verifyIdUserMiddleware } from "../shared/middleware/user/verifyIdUser.middleware.js";
import { updateUserMiddleware } from "../shared/middleware/user/updateUser.middleware.js";
import { createUserMiddleware } from "../shared/middleware/user/createUser.middleware.js";
import { createUser, updateEmail, deleteUser, getUser, registerUserSkill, updateProfile, updatePassword, deleteUserSkill, getAllSkillUser } from "../controllers/user.controller.js";


export const userRouter = Router();

userRouter.post("/register-user", createUserMiddleware, async (req, res) => { 
    return await createUser(req, res);
})

userRouter.patch("/user/:user_id/change-password", updateUserPasswordMiddleware, async (req, res) => {
    return await updatePassword(req, res);
})

userRouter.patch("/user/:user_id/change-email", updateEmailMiddleware, async (req, res) => {
    return await updateEmail(req, res);
})

userRouter.delete("/user/:user_id/delete-profile", verifyIdUserMiddleware, async (req, res) => {
    return await deleteUser(req, res);
})

userRouter.get("/user/:user_id/", verifyIdUserMiddleware, async (req, res) => {
    return await getUser(req, res);
})

userRouter.post("/user/:user_id/register-skill", verifyIdUserMiddleware, createSkillMiddleware, async(req, res) => {
    return await registerUserSkill(req, res);
})

userRouter.put("/user/:user_id/edit-profile", updateUserMiddleware, async (req, res) => {
    return await updateProfile(req, res);
})

userRouter.delete("/user/:user_skill_id/delete", verifyIdUserSkillMiddleware, async (req, res) => {
    return deleteUserSkill(req, res);
})

userRouter.get("/user/:user_id/skills", verifyIdUserMiddleware, async (req, res) => {
    return getAllSkillUser(req, res);
})

