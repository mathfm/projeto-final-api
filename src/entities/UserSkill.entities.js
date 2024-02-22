import { database } from "../database/connection.js";
import { DataTypes, Sequelize } from "sequelize";
import { userEntity } from "./User.entities.js";
import { skillEntities } from "./Skill.entities.js";


const userSkillEntity = database.define("tb_user_skill", {
    id: {
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
})

userSkillEntity.belongsTo(userEntity, {
    foreignKey: 'user_id',
    constraints: true,
})

userSkillEntity.belongsTo(skillEntities, {
    foreignKey: 'skill_id',
    constraints: true,
})


export { userSkillEntity };
