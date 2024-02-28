import { userEntity } from "../../entities/User.entities.js"
import { userSchema } from "../schemas.js";
import { fieldExist } from "../validation/FieldsValidation.js"
import { schemaReduceGenerator } from "../schemas.js";
import { schemaValidation } from "../validation/SchemaValidation.js";
import { verifiyInfoUserValidation } from "../validation/UserInfoValidation.js";



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



export const userUpdateMiddleware = async (req, res, next) => { 
    const findUser = await userEntity.findByPk(req.params.user_id);
    if (!findUser) {
        return res.status(404).json({ error: "Id do usuario é invalido, impossivel realizar a alteração." });
    }
    const name = (!req.body.name ? findUser.name : req.body.name);
    const username = req.body.username;
    const email = req.body.email;
    const password = (!req.body.password ? findUser.password : req.body.password);

    const errorFields = await schemaValidation(userSchema, { name, username, email, password });
    if (errorFields) {
        return res.status(400).json(errorFields);
    }

    const userValid = await verifiyInfoUserValidation({ username, email });

    if (!userValid) {
        return res.status(404).json({ error: "Um dos dados que você digitou ja foram registrados" });
    } 

    next();

}

export const updatePasswordMiddleware = async (req, res, next) => { 

    const user_id = req.params.user_id;
    const password = req.body.password;
    const userInfo = await userEntity.findByPk(user_id);

    if (!userInfo) {
        return res.status(404).json({ error: "Id não encontrado" });
    }

    if (password === userInfo.password) {
        return res.status(400).json({ error: "Senha igual a anterior" });
    }
    
    const schemaPassword = schemaReduceGenerator(userSchema, ["password"]);
    const errorsPassword = await schemaValidation(schemaPassword, { password });

    if (errorsPassword) {
        return res.status(400).json({ error: errorsPassword});
    }
    
    next();

};

export const updateEmalMiddleware = async (req, res, next) => {
    const user_id = req.params.user_id;
    const email = req.body.email;
    const findUser = await userEntity.findByPk(user_id);

    if (!findUser) {
        return res.status(404).json({ error: "Id do usuario não foi encontrado!" });
    }

    if (await fieldExist(userEntity, "email", email)) {
        return res.status(400).json({ error: "Esse email ja estar registrado." });
    }

    const schemaEmail = schemaReduceGenerator(userSchema, ["email"]);
    const errorsEmail = await schemaValidation(schemaEmail, { email });

    if (errorsEmail) {
        return res.status(400).json({ error: errorsEmail });
    }

    next();
    
};

export const updateUsernameMiddleware = async (req, res, next) => {
    const user_id = req.params.user_id;
    const username = req.body.username;
    const findUser = await userEntity.findByPk(user_id);
    if (!findUser) {
        return res.status(404).json({ error: "Id não localizado" });
    }
    if (await fieldExist(userEntity, "username", username)) {
        return res.status(400).json({ error: "Esse username ja estar registrado." });
    }
    next();
};

export const deleteUserMiddleware = async (req, res, next) => {
    const user_id = req.params.user_id;
    const findUser = await userEntity.findByPk(user_id);
    if (!findUser) {
        return res.status(404).json({ error: "Id do usuario não foi localizado." });
    }
    next();
}

export const verifyIdUserMiddleware = async (req, res, next) => {
    const user_id = req.params.user_id;
    const findUser = await userEntity.findByPk(user_id);
    if (!findUser) {
        return res.status(404).json({ error: "Id do usuario não foi localizado." });
    }
    next();
}