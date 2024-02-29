import { userEntities } from "../../entities/User.entities.js";

export const verifiyInfoUserValidation = async (userObject) => {
    const atributes = Object.keys(userObject);
    for (const atribute of atributes) {
        const value = userObject[atribute];
        const findInfoExist = await userEntities.findOne({
            where: { [atribute]: value}
        })
       
        if (findInfoExist) {
            return false;
        }
    }

    return true;

}