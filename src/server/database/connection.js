import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();
export const database = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
  },
});

export async function testConnection() {
    try {
        database.sync();
        await database.authenticate();
        console.log("conexão com o banco estabelecida");
    } catch (error) {
        console.log("conexão não realizada");
    }
}

