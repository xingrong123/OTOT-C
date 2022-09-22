import UserModel from './user-model.js';
import TokenModel from './token-model.js';
import RoleModel from './role-model.js'
import Sequelize from 'sequelize';

const sequelize = new Sequelize.Sequelize('sqlite::memory:')

const User = sequelize.define("users", UserModel.attributes, UserModel.options);
const Token = sequelize.define("tokens", TokenModel.attributes, TokenModel.options);
const Role = sequelize.define("roles", RoleModel.attributes, RoleModel.options);

await User.sync();
await Token.sync();
await Role.sync();

export async function findUser(params) {
    return await User.findOne({ where: params })
}

export async function createUser(userParams, roleParamsArray) {
    await User.create(userParams);
    roleParamsArray.forEach(async (roleParams) => {
        console.log(roleParams)
        await Role.create(roleParams)
    })
    sequelize.query('SELECT * FROM roles').then(function(rows) {
        console.log(JSON.stringify(rows));
    });
    

}

export async function createToken(params) {
    await Token.create(params);
}

export async function findToken(params) {
    return await Token.findOne({ where: params })
}

export async function deleteToken(params) {
    return await Token.destroy({ where: params })
}

export async function findRoles(params) {
    return await Role.findAll({ where: params })
}