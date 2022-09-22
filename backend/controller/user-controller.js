import { hashPassword, verifyPassword } from '../utils/passwordHasher.js'
import {
    ormSearchUser,
    ormCreateUser,
    ormCreateToken,
    ormDeleteToken,
} from '../model/user-orm.js'
import { generateJwt } from '../utils/jwtGenerator.js'
import { checkValidRoles } from '../configs/role.js'
import { CLIENT_ERROR } from '../configs/status-types.js';
import { throwError } from '../utils/errorGenerator.js'


export async function createUser(req, res, next) {
    try {
        let { username, password, roles } = req.body;
        if (!(username && password && roles)) {
            throwError(CLIENT_ERROR.badRequest, "missing username and/or password and/or roles!")
        }
        // check for valid username
        let userData = await ormSearchUser(username);
        if (userData) {
            throwError(CLIENT_ERROR.conflict, "Username already taken")
        }
        // check for valid roles
        if (typeof roles === "string") {
            roles = [roles]
        }
        let isValidRoles = checkValidRoles(roles)
        if (!isValidRoles) {
            throwError(CLIENT_ERROR.badRequest, "invalid role detected")
        }

        let hash = await hashPassword(password)
        await ormCreateUser(username, hash, roles)
        return res.status(201).json({ message: `Created new user ${username} successfully!` });
    } catch (err) {
        next(err)
    }
}

export async function loginUser(req, res, next) {
    try {
        let { username, password } = req.body;
        if (!(username && password)) {
            throwError(CLIENT_ERROR.badRequest, "Username and/or Password are missing!")
        }
        let userData = await ormSearchUser(username);
        if (typeof userData === "undefined") {
            throwError(CLIENT_ERROR.unauthenticated, "Invalid username")
        }
        let isCorrectPassword = await verifyPassword(password, userData.getDataValue("password"))
        if (!isCorrectPassword) {
            throwError(CLIENT_ERROR.unauthenticated, "Invalid password")
        }
        let token = generateJwt(username)
        await ormCreateToken(username, token)

        res.cookie("token", token, { httpOnly: true });
        return res.status(200).json({ message: `logged in successfully!` });
    } catch (err) {
        next(err)
    }
}

export async function logoutUser(req, res, next) {
    try {
        let username = req.username
        let token = req.cookies["token"];
        await ormDeleteToken(username, token)
        res.cookie("token", "", { httpOnly: true, maxAge: 0 })

        return res.status(200).json({ message: `logout successfully!` });
    } catch (err) {
        next(err)
    }
}

export async function getSecret(req, res, next) {
    return res.status(200).json({ message: `get secret!` });
}

export async function getTopSecret(req, res, next) {
    return res.status(200).json({ message: `get top secret!` });
}

