import express from "express";
import { userRouter } from "./routes/User.routes.js";
import { testConnection } from "./database/connection.js";
import { skillRouter } from "./routes/Skill.rotes.js";


const app = express();
const port = 8001;

app.use(express.json());
app.use(userRouter);
app.use(skillRouter);



app.listen(port, () => {
    testConnection();
    console.log("server rodando")
});


