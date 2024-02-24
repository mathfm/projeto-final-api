import { Router } from "express";
import { createUser } from "../controllers/User.controller.js";
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




export { userRouter };