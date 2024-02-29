import { skillEntities } from "../../../entities/Skill.entities.js";
import { topicEntities } from "../../../entities/Topic.entities.js"
import { userEntities } from "../../../entities/User.entities.js";
import { topicSchema } from "../../schemas.js";
import { schemaValidation } from "../../validation/schema.validation.js"


export const topicMiddleware = async (req, res, next) => {
    const infoBody = {
        title: req.body.title,
        description: req.body.description,
        user_id_create_topic: req.params.user_id,
        skill_id_category: req.body.skill_id_category
    }
    const topicErros = await schemaValidation(topicSchema, infoBody);
    if (topicErros) {
        return res.status(400).json({ errors: topicErros });
    }

    const [userExist, skillExist] = await Promise.all([
        userEntities.findByPk(infoBody.user_id_create_topic),
        skillEntities.findByPk(infoBody.skill_id_category)
    ])

    
    if (!userExist) {
        return res.status(400).json({ error: "Usuário não encontrado não foi possivel fazer a postagem" });
    }

    if (!skillExist) {
        return res.status(400).json({ error: "Essa skill não esta registrada" });
    }

    const topicIsValid = await topicEntities.findAll({
        where: {
            title: infoBody.title,
            user_id_create_topic: infoBody.user_id_create_topic,
            skill_id_category: infoBody.skill_id_category
        }
    });

    if (topicIsValid.length > 0) {
        return res.status(400).
            json({ error: "Você ja criou um topico semelhante anteriormente" });
    }

    next();

}