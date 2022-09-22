import Sequelize from 'sequelize';


let UserModelSchema = {
    attributes: {
        username: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    options: {
        timestamps: false,
    }
}

export default UserModelSchema;