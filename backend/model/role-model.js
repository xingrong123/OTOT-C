import Sequelize from 'sequelize';
import { ROLE } from '../configs/role.js'


// Users can have multiple roles
let RoleModelSchema = {
    attributes: {
        role: {
            type: Sequelize.ENUM(...Object.values(ROLE)),
            primaryKey: true,
            validate: {
                isIn: {
                    args: [Object.values(ROLE)],
                    msg: "Wrong role"
                }
            }
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
        timestamps: false,
    }
}

export default RoleModelSchema;