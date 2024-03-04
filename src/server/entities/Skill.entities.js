import { database } from "../database/connection.js";
import { DataTypes, Sequelize } from "sequelize";

export const skillEntities = database.define("tb_skill", {
    id: {
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    skill_name: {
        type: DataTypes.STRING(30),
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})



