import { userEntities } from "../../../entities/User.entities.js"
import { postEntities } from "../../../entities/Post.entities.js"

export const createCommentMiddleware = async (req, res, next) => {
    let errors = []
    if (!req.body.comment) errors.push("Não é possível enviar um comentário vazio")
    const user = await userEntities.findByPk(req.params.user_id)
    const post = await postEntities.findByPk(req.params.post_id)
    if(!user) errors.push("Usuário não encontrado!");
    if(!post) errors.push("Post não encontrado!")
    
    if(errors.length){
        return res.status(404).json({erros: errors})
    }
    next()
}