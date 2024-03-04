import { testConnection } from "./server/database/connection.js";
import { server } from "./server/server.js";

const port = 3000 || 3306;

server.listen(port, () => {
    testConnection();
    console.log(`Server running`);
});