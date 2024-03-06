import { postEntities } from "../entities/Post.entities.js";

export class PostSerivce {
    async createPost(title, description, author_id, skill_id) {
        try {
            const post = {
            title: title,
            description: description,
            author_id: author_id,
            skill_id: skill_id
            }
            await postEntities.create(post);
            const resultPost = await postEntities.findAll({ where: { author_id: post.author_id, skill_id: post.skill_id } });
            return { message: "Post criado com sucesso", post: resultPost };
        } catch (error) {
            return error.message;
        }
    }

    async updatePost(post_id, title, description, author_id, skill_id) {
        try {
            const post = {
            title: title,
            description: description,
            author_id: author_id,
            skill_id: skill_id
            }
            await postEntities.update(post, { where: { id: post_id } });
            const resultPost = await postEntities.findByPk(post_id);
            return { message: "Post atualizado com sucesso", post: resultPost };
        } catch (error) {
            return error.message;
        }
    }

    async getPost(post_id) {
        try {
            const post = await postEntities.findByPk(post_id);
            return { message: "Post encontrado com sucesso", post: post };
        } catch (error) {
            return error.message;
        }
    }

    async getAllPost() {
        try {
            const post = await postEntities.findAll();
            return { message: "Todos os post foram carregados com sucesso", post: post };
        } catch (error) {
            return error.message;
        }
    }

    async deletePost(post_id) {
        try {
            await postEntities.destroy({ where: { id: post_id } });
            return { message: "Post deletado com sucesso" };
        } catch (error) {
            return error.message;
        }
    }

}