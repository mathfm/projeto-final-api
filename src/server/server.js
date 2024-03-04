import express from "express";
import "./shared/translations.yup.js";
import { userRouter } from "./routes/user.routes.js";
import { skillRouter } from "./routes/skill.routes.js";
import { swapSkillRouter } from "./routes/swapSkill.routes.js";
import { postRouter } from "./routes/post.routes.js";
import { postCommentRouter } from "./routes/postComment.routes.js";
import cors from "cors";


const server = express();

server.use(cors());
server.use(express.json());
server.use(userRouter);
server.use(skillRouter);
server.use(postRouter);
server.use(swapSkillRouter);
server.use(postCommentRouter);



export { server };

