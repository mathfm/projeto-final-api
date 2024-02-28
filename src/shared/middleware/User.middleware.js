import { userEntity } from "../../entities/User.entities.js"
import { userSchema } from "../schemas.js";
import { fieldExist } from "../validation/FieldsValidation.js"
import { schemaValidation } from "../validation/SchemaValidator.js";



export const userMiddleware = async (req, res, next) => {
    const emailExist = await fieldExist(userEntity, "email", req.body.email);
    const usernameExist = await fieldExist(userEntity, "username", req.body.username);
    const errorFields = await schemaValidation(userSchema, req.body);

    if (!errorFields) {
        if (!usernameExist && !emailExist) {
            next();
        } else {
            res.status(400).json({ error: "Email ou username já esta registrado"});
        }
    } else {
        res.status(400).json({ errors: errorFields });
    }

}

const verifiyInfoUserValid = async (userObject) => {
    const atributes = Object.keys(userObject);
    for (const atribute of atributes) {
        const value = userObject[atribute];

        const findInfoExist = await userEntity.findOne({
            where: { [atribute]: value}
        })
       
        if (findInfoExist) {
            return false;
        }
    }

    return true;

}

export const userUpdateMiddleware = async (req, res, next) => { 
    const findUser = await userEntity.findByPk(req.params.user_id);
    if (!findUser) {
        return res.status(404).json({ error: "Id do usuario estar invalido, impossivel realizar a alteração." });
    }
    const name = (!req.body.name ? findUser.name : req.body.name);
    const username = req.body.username;
    const email = req.body.email;
    const password = (!req.body.password ? findUser.password : req.body.password);

    const errorFields = await schemaValidation(userSchema, { name, username, email, password });
    if (errorFields) {
        return res.status(400).json(errorFields);
    }

    const userValid = await verifiyInfoUserValid({ username, email });

    if (!userValid) {
        return res.status(404).json({ error: "Um dos dados que você digitou ja foram registrados" });
    } 

    next();

}