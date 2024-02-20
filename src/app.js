import express from "express";
import { userRouter } from "./routes/User.routes.js";


const app = express();
app.use(express.json());
app.use(userRouter);
const port = 3000;


app.listen(port, () => console.log("server rodando"));

