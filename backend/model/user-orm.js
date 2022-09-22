import {
    findUser,
    createUser,
    createToken,
    findToken,
    deleteToken,
    findRoles
} from './repository.js';


export async function ormSearchUser(username) {
    return await findUser({ username })
}

export async function ormCreateUser(username, password, roles) {
    // users need to be created with at least one role
    let usernameRolesArray = roles.map((role) => { return { username, role } })
    await createUser({ username, password }, usernameRolesArray)
}

export async function ormCreateToken(username, token) {
    return createToken({ username, token })
}

export async function ormSearchToken(token) {
    return await findToken({ token })
}

export async function ormDeleteToken(username, token) {
    await deleteToken({ username, token })
}

export async function ormFindRoles(username) {
    return await findRoles({ username })
}