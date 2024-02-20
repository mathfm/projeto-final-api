import { DataTypes, Sequelize } from "sequelize";

const database = new Sequelize("db_forum", "root", "", {
    host: "localhost",
    dialect: "mysql"
}) 

const tb_user = database.define("tb_user", {
    id: {
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false

    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8]
            },
            msg: "A senha deve ter no minimo 8 caracteres."            
        }
    }
})

