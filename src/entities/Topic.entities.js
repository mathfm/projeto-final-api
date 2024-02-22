import { database } from "../database/connection.js";
import { DataTypes, Sequelize } from "sequelize";
import { userEntity } from "./User.entities.js";

export const topicEntities = database.define("tb_topic", {
    id: {
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    
    describle: {
        type: DataTypes.TEXT,
    },

    title: {
        type: DataTypes.STRING(25),
    },
})

postEntities.belongsTo(userEntity, {
    foreignKey: 'user_id_create_topics',
    constraints: true,
});