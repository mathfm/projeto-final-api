import { postCommentEntities } from "../../../entities/PostComment.entities.js";
import { postCommentSchema, schemaReduceGenerator } from "../../schemas.yup.js";
import { schemaValidation } from "../../validation/schema.validation.js";


export const updatePostCommentMiddleware = async (req, res, next) => {
    const { comment_id, user_id } = req.params;

    const postEdit = await postCommentEntities.findOne({ id: comment_id });

    if (postEdit.user_id !== user_id) {
        return res.status(403).json({ error: "Você não tem autorização para editar este comentário." });
    }

    const schemaComment = schemaReduceGenerator(postCommentSchema, ["comment"]);
    const { comment } = req.body;

    const errorsComment = await schemaValidation(schemaComment, { comment: comment });

    if (errorsComment) {
        return res.status(400).json({ error: errorsComment });
    } 

    next();
}