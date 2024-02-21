import { database } from "../database/connection.js";
import { DataTypes, Sequelize } from "sequelize";

const userEntity = database.define("tb_user", {
    id: {
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(20),
        allowNull: false,
    }
})

export { userEntity };