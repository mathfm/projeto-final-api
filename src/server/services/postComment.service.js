import { postCommentEntities } from "../entities/PostComment.entities.js";
import { userEntities } from "../entities/User.entities.js";

export class PostCommentSerivce {
    async createPostComment(user_id, post_id ,comment) {
        try {
            const postComment = {
                user_id: user_id,
                post_id: post_id,
                comment: comment
            }
            await postCommentEntities.create(postComment);
            const resultPostComment = await postCommentEntities.findOne({ where: { user_id: postComment.user_id, post_id: postComment.post_id } });
            return { message: "comentario feito com sucesso!", comment: resultPostComment };

        } catch (error) {
            return error.message;
        }

    }

    async getAllPostComment(post_id) {
        try {
            const resultPostComment = await postCommentEntities.findAll({
              where: { post_id: post_id },
              include: [
                {
                  model: userEntities,
                  attributes: ["username"],
                },
              ],
            });
            return { message: "comentarios do post encontrados com sucesso!", postComment: resultPostComment };
        }
        catch (error) {
            return error.message;
        }
    }

    async getPostComment(comment_id) {
        try {
            const resultPostComment = await postCommentEntities.findOne({ where: { comment_id: comment_id } });
            return { message: "comentario encontrado com sucesso!", postComment: resultPostComment };
        } catch (error) {
            return error.message;
        }
    }

    async updatePostComment(comment_id, comment) { 
        try {
            await postCommentEntities.update({ comment: comment }, { where: { id: comment_id } });
            const resultPostComment = await postCommentEntities.findOne({ where: { id: comment_id } });
            return { message: "comentario atualizado com sucesso!", comment: resultPostComment };
        } catch (error) {
            return error.message;
        }
    }

    async deletePostComment(comment_id) {
        try {
            await postCommentEntities.destroy({ where: { comment_id: comment_id } });
            return { message: "comentario excluido com sucesso!" };
        } catch (error) {
            return error.message;
        }
    }

} 