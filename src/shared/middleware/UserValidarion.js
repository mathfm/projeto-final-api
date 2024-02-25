import { object, string, ValidationError } from "yup";
import { userEntity } from "../../entities/User.entities.js";

const userSchema = object({
    name: string().required().min(3),
    email: string().email().required(),
    password: string().required().min(8)
})

export const userValidateCreate = async (req, res, next) => { 
    try {
        const emailExist = await userEntity.findOne({
            where: {
                email: req.body.email
            }
        })

        if (!emailExist) {
            await userSchema.validate(req.body, { abortEarly: false });
            return next();
        } else {
            res.status(400).json({
                errors: { error: "Email já cadastrado" }
            });
        }

    } catch (error) {
        const captureErros = [];
        if (error instanceof ValidationError) {
            error.inner.forEach(error => {
            error.message
            error.path
            captureErros.push({ error: error.message, path: error.path });
            })
            
            return res.status(400).json({
            errors: captureErros
        });
        } 
    }

}