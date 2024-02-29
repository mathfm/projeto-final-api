import { database } from "../database/connection.js";
import { DataTypes, Sequelize } from "sequelize";
import { userEntities } from "./User.entities.js";
import { skillEntities } from "./Skill.entities.js";

export const topicEntities = database.define("tb_topic", {
    id: {
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },

    title: {
        type: DataTypes.STRING(25),
    },    

    description: {
        type: DataTypes.TEXT,
    },

})

topicEntities.belongsTo(userEntities, {
    foreignKey: 'user_id_create_topic',
    constraints: true,
});

topicEntities.belongsTo(skillEntities, {
    foreignKey: 'skill_id_category',
    constraints: true,
});