import { database } from "../database/connection.js";
import { DataTypes, Sequelize } from "sequelize";
import { userEntity } from "./User.entities.js";
import { skillEntities } from "./Skill.entities.js";

export const swapSkillEntity = database.define("tb_swap_skill", {
    id: {
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
})

swapSkillEntity.belongsTo(userEntity, {
    foreignKey: 'username_sender_id',
    constraints: true,
});

swapSkillEntity.belongsTo(userEntity, {
    foreignKey: 'username_recipient_id',
    constraints: true,
});

swapSkillEntity.belongsTo(skillEntities, {
    foreignKey: 'skill_desired_id',
    constraints: true,
});

swapSkillEntity.belongsTo(skillEntities, {
    foreignKey: 'skill_offered_id',
    constraints: true,
});