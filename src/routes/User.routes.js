import { Router } from "express";

const userRouter = Router();

userRouter.get('/user', (req, res) => { 
    res.send("hello, world!");
})


export { userRouter };