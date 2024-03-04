import { skillEntities } from "../../../entities/Skill.entities.js";
import { postSchema } from "../../schemas.yup.js"
import { schemaValidation } from "../../validation/schema.validation.js"

export const createPostMiddleware = async (req, res, next) => {
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

    const skillExist = await skillEntities.findByPk(post.skill_id);

    if (!skillExist) {
        return res.status(404).json({ errors: "Skill não encontrada." });
    }

    next();

}