import { testConnection } from "./server/database/connection.js";
import { server } from "./server/server.js";

const port = process.env.PORT || 3000;

server.listen(port, () => {
    testConnection();
    console.log(`Server running ${port}`);
});