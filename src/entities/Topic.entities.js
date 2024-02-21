import { database } from "../database/connection.js";
import { DataTypes, Sequelize } from "sequelize";

export const topicEntities = database.define("tb_topic", {
    id: {
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },

    date_create: {
        type: DataTypes.DATE,
    },
    
    describle: {
        type: DataTypes.TEXT,
    },

    user_id_create_topics: {
        type: DataTypes.STRING(50),
    },

    title: {
        type: DataTypes.STRING(25),
    },
})