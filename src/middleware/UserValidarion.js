export const bodyIsValid = (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name ||!email ||!password) {
        return res.status(400).json({ message: "Preencha todos os campos" });
    }
    next();
}