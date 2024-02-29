import { database } from "../database/connection.js";
import { DataTypes, Sequelize } from "sequelize";
import { userEntity } from "./User.entities.js";
import { postEntities } from "./Post.entities.js"


export const postCommentEntities = database.define("tb_comment_post", {
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

postCommentEntities.belongsTo(userEntity, {
    foreignKey: 'user_id_post',
    constraints: true,
});

postCommentEntities.belongsTo(postEntities, {
    foreignKey: 'post_id_commented',
    constraints: true,
});

