import { object, string, ValidationError } from "yup";

const userSchema = object({
    name: string().required().min(3),
    username: string().required().min(5),
    email: string().email().required(),
    password: string().required().min(8)
})

export const userValidateCreate = async (req, res, next) => { 
    try {
        await userSchema.validate(req.body, { abortEarly: false });
        next();
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