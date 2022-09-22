import Sequelize from 'sequelize';

// Users can have multiple tokens so that they can log in from multiple devices
let TokenModelSchema = {
    attributes: {
        token: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        username: {
            type: Sequelize.STRING,
            references: { 
                model: 'users',
                key: 'username',
            },
            primaryKey: true,
            onDelete: 'CASCADE',
            // not allowed to update username
            onUpdate: 'RESTRICT',
        }
    },
    options: {
        timestamps: false
    }
}

export default TokenModelSchema;