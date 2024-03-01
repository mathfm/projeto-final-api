import { Sequelize } from "sequelize";

const database = new Sequelize("db_forum", "root", "", {
    host: "localhost",
    dialect: "mysql"
}) 

export async function testConnection() {
    try {
        database.sync();
        await database.authenticate();
        console.log("conexão com o banco estabelecida");
    } catch (error) {
        console.log("conexão não realizada");
    }
}

export { database };