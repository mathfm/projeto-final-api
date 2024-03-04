
import { schemaValidation } from "../../validation/schema.validation.js"
import { postCommentSchema } from "../../schemas.yup.js"

export const createPostCommentMiddleware = async (req, res, next) => {

    const postComment = {
        comment: req.body.comment,
        user_id: req.params.user_id,
        post_id: req.params.post_id
    }

    const postErros = await schemaValidation(postCommentSchema, postComment);

    if (postErros) {
        return res.status(400).json({ error: postErros });
    }

    next()
}