import { Router } from "express";
import { createUser, destroyUser, getUserData, registerUserSkill, updateEmail, updatePassword, updateProfile } from "../controllers/User.controller.js";
import { testSwapp } from "../tests/scrpit_mock.js";
import { createSwapSkill } from "../controllers/SwapSkill.controller.js";
import { userMiddleware, userUpdateMiddleware } from "../shared/middleware/User.middleware.js";
import { userSkillMiddleare } from "../shared/middleware/UserSkill.middleware.js";
import { swapSkillMiddleware } from "../shared/middleware/SwapSkill.middleware.js";

const userRouter = Router();

userRouter.post("/register-user", userMiddleware, async (req, res) => { 
    
    const { name, username, email, password } = req.body;

    const resultado = await createUser(name, username, email, password);

    return res.json(resultado);

})

userRouter.patch("/user/:user_id/change-password", async (req, res) =>{
    const {id, newPassword} = req.body
    const result = await updatePassword(id, newPassword)
    res.json(result)
})

userRouter.patch("/user/:user_id/change-email", async (req, res) =>{
    const {id, newEmail} = req.body;
    const result = await updateEmail(id, newEmail);
    res.json(result);
})

userRouter.delete("/user/user_id:/delete", async (req, res) =>{
    const {id} = req.body;
    const result = await destroyUser(id);
    res.json(result);
})

userRouter.get("/user/:user_id", async (req, res) =>{
    const {id} = req.body;
    const result = await getUserData(id);
    res.json(result);
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