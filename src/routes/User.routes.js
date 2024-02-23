import { Router } from "express";
import { createUser, updateEmail, updatePassword } from "../controllers/User.controller.js";
import { bodyIsValid } from "../middleware/UserValidarion.js";
import { createSwapSkill } from "../controllers/SwapSkill.controller.js";
import { testSwapp } from "../tests/scrpit_mock.js";

const userRouter = Router();

userRouter.post("/register-user", bodyIsValid, async (req, res) => { 
    
    const { name, email, password } = req.body;

    const resultado = await createUser(name, email, password);

    return res.json(resultado);

})

userRouter.post("/user/register-swap", async (req, res) => {
   
    const resultado = await testSwapp();
    return res.json(resultado);

})

userRouter.post("/user/change-password", async (req, res) =>{
    const {id, newPassword} = req.body
    const result = await updatePassword(id, newPassword)
    res.json(result)
})

userRouter.post("/user/change-email", async (req, res) =>{
    const {id, newEmail} = req.body;
    const result = await updateEmail(id, newEmail);
    res.json(result);
})

export { userRouter };