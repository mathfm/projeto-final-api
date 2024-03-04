import { postEntities } from "../../../entities/Post.entities.js";
import { skillEntities } from "../../../entities/Skill.entities.js";
import { postSchema } from "../../schemas.yup.js";
import { schemaValidation } from "../../validation/schema.validation.js";
export const updatePostMiddleware = async (req, res, next) => {

    const findPost = await postEntities.findOne({ id: req.params.post_id });

    const post = {
        title: req.body.title,
        description: req.body.description,
        author_id: req.params.user_id,
        skill_id: req.body.skill_id
    }    
    const postErros = await schemaValidation(postSchema, post);

    if (postErros) {
        return res.status(400).json({ errors: postErros });
    }   

    if (post.author_id !== findPost.author_id) {
        return res.status(403).json({ error: "Você não tem autorização para editar os dados desse post." });
    }

    if (!await skillEntities.findByPk(post.skill_id)) {
        return res.status(404).json({ error: "Essa skill não esta registrada."});
    } 


    next();
    

}