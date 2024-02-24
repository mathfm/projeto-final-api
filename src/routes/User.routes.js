import { Router } from "express";
import { createUser, destroyUser, getUserData, updateEmail, updatePassword } from "../controllers/User.controller.js";
import { testSwapp } from "../tests/scrpit_mock.js";
import { userValidateCreate } from "../shared/middleware/UserValidarion.js";

const userRouter = Router();

userRouter.post("/register-user", userValidateCreate, async (req, res) => { 
    
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

userRouter.post("/user/delete-me", async (req, res) =>{
    const {id} = req.body;
    const result = await destroyUser(id);
    res.json(result);
})

userRouter.post("/user/get-data", async (req, res) =>{
    const {id} = req.body;
    const result = await getUserData(id);
    res.json(result);
})

export { userRouter };