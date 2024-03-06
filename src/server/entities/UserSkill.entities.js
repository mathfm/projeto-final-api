import { database } from "../database/connection.js";
import { DataTypes, Sequelize } from "sequelize";
import { userEntities } from "./User.entities.js";
import { skillEntities } from "./Skill.entities.js";


export const userSkillEntities = database.define("tb_user_skill", {
    id: {
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
});



userSkillEntities.belongsTo(userEntities, {
    foreignKey: 'user_id',
    constraints: true,
    onDelete: 'CASCADE',
});

userSkillEntities.belongsTo(skillEntities, {
    foreignKey: 'skill_id',
    constraints: true,
    onDelete: 'RESTRICT',
});


