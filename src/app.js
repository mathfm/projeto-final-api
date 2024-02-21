import express from "express";
import { userRouter } from "./routes/User.routes.js";
import { testConnection } from "./database/connection.js";


const app = express();
const port = 3000;

app.use(express.json());
app.use(userRouter);



app.listen(port, () => {
    testConnection();
    console.log("server rodando")
});


