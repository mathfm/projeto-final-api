import { userEntity } from "../../../entities/User.entities.js";

export const verifyIdUserMiddleware = async (req, res, next) => {
    const user_id = req.params.user_id;
    const findUser = await userEntity.findByPk(user_id);
    if (!findUser) {
        return res.status(404).json({ error: "Id do usuario invalido ou não existe." });
    }
    next();
}