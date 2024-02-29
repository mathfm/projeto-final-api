import express from "express";
import { userRouter } from "./routes/User.routes.js";
import { testConnection } from "./database/connection.js";
import { skillRouter } from "./routes/skill.routes.js";
import { topicRouter } from "./routes/topic.routes.js";
import { swapSkillRouter } from "./routes/swapSkill.routes.js";


const app = express();
const port = 3000 || 3306;

app.use(express.json());
app.use(userRouter);
app.use(skillRouter);
app.use(topicRouter);
app.use(swapSkillRouter);




app.listen(port, () => {
    testConnection();
    console.log(`Server rodando na porta ${port}`);
});


