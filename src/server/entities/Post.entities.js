import { database } from "../database/connection.js";
import { DataTypes, Sequelize } from "sequelize";
import { userEntities } from "./User.entities.js";
import { skillEntities } from "./Skill.entities.js";

export const postEntities = database.define("tb_post", {
    id: {
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },

    title: {
        type: DataTypes.STRING(50),
    },    

    description: {
        type: DataTypes.TEXT,
    },

})

postEntities.belongsTo(userEntities, {
    foreignKey: 'author_id',
    constraints: true,
});

postEntities.belongsTo(skillEntities, {
    foreignKey: 'skill_id',
    constraints: true,
});

