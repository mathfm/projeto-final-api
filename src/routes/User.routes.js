import { Router } from "express";
import { createUser, deleteUser, deleteUserSkill, getAllSkillUser, getUser, registerUserSkill, updateEmail, updatePassword, updateProfile } from "../controllers/User.controller.js";
import { userSkillMiddleare } from "../shared/middleware/userskill/UserSkill.middleware.js";
import { verifyIdUserSkillMiddleware } from "../shared/middleware/userskill/verifyIDUserSkill.middleware.js";
import { userMiddleware } from "../shared/middleware/user/Create.middleware.js";
import { updatePasswordMiddleware } from "../shared/middleware/user/PasswordUpdate.middleware.js";
import { updateEmalMiddleware } from "../shared/middleware/user/EmailUpdate.middleware.js";
import { verifyIdUserMiddleware } from "../shared/middleware/user/UserVerifyID.middleware.js";
import { userUpdateMiddleware } from "../shared/middleware/user/UserUpdate.middleware.js";


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

userRouter.delete("/user/:user_id/delete-profile", verifyIdUserMiddleware, async (req, res) => {
    return await deleteUser(req, res);
})

userRouter.get("/user/:user_id/", verifyIdUserMiddleware, async (req, res) => {
    return await getUser(req, res);
})

userRouter.post("/user/:user_id/register-skill", userSkillMiddleare, async(req, res) => {
    return await registerUserSkill(req, res);
})

userRouter.put("/user/:user_id/edit-profile", userUpdateMiddleware, async (req, res) => {
    return await updateProfile(req, res);
})

userRouter.delete("/user/:user_skill_id/delete", verifyIdUserSkillMiddleware, async (req, res) => {
    return deleteUserSkill(req, res);
})

userRouter.get("/user/:user_id/skills", verifyIdUserMiddleware, async (req, res) => {
    return getAllSkillUser(req, res);
})

export { userRouter };