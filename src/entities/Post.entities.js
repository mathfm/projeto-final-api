import { database } from "../database/connection.js";
import { DataTypes, Sequelize } from "sequelize";

export const skillEntities = database.define("tb_post", {
    id: {
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    date_post: {
        type: DataTypes.DATE,
    },
    content: {
        type: DataTypes.TEXT,
    },

    user_id_post: {
        type: DataTypes.STRING(50),
    },

    topic_id_commented: {
        type: DataTypes.STRING(50),
    }
})