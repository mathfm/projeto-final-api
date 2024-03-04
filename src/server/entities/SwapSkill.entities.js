import { database } from "../database/connection.js";
import { DataTypes, Sequelize } from "sequelize";
import { userEntities } from "./User.entities.js";
import { skillEntities } from "./Skill.entities.js";

export const swapSkillEntities = database.define("tb_swap_skill", {
    id: {
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    statusInvited: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
})

swapSkillEntities.belongsTo(userEntities, {
    foreignKey: 'user_sender_id',
    constraints: true,
});

swapSkillEntities.belongsTo(userEntities, {
    foreignKey: 'user_recipient_id',
    constraints: true,
});

swapSkillEntities.belongsTo(skillEntities, {
    foreignKey: 'skill_desired_id',
    constraints: true,
});

swapSkillEntities.belongsTo(skillEntities, {
    foreignKey: 'skill_offered_id',
    constraints: true,
});