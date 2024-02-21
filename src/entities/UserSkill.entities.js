import { database } from "../database/connection.js";
import { DataTypes } from "sequelize";

const userSkillEntity = database.define("tb_user_skill", {
    id: {
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
            isUUID: {
                args: 4,
                msg: "O usuário deve ser um UUID válido."
            }
        }
    },
    skill_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
            isUUID: {
                args: 4,
                msg: "A skill deve ser um UUID válido."
            }
        }
    }
})

export { userSkillEntity };

