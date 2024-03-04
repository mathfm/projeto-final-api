import { database } from "../database/connection.js";
import { DataTypes, Sequelize } from "sequelize";
import { postEntities } from "./Post.entities.js"
import { userEntities } from "./User.entities.js";


export const postCommentEntities = database.define("tb_comment_post", {
    id: {
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },

    comment: {
        type: DataTypes.TEXT,
    },
})

postCommentEntities.belongsTo(userEntities, {
    foreignKey: 'user_id',
    constraints: true,
});

postCommentEntities.belongsTo(postEntities, {
    foreignKey: 'post_id',
    constraints: true,
});

