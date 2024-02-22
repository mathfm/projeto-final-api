import { database } from "../database/connection.js";
import { DataTypes, Sequelize } from "sequelize";
import { userEntity } from "./User.entities.js";
import { topicEntities } from "./Topic.entities.js"

export const postEntities = database.define("tb_post", {
    id: {
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },

    content: {
        type: DataTypes.TEXT,
    },
})

postEntities.belongsTo(userEntity, {
    foreignKey: 'user_id_post',
    constraints: true,
});

postEntities.belongsTo(topicEntities, {
    foreignKey: 'topic_id_commented',
    constraints: true,
});