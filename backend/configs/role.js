export const ROLE = {
    user: "user",
    admin: "admin"
}

export function checkValidRoles(roles) {
    let isValidRoles = true
    roles.forEach((role) => {
        let isValidRole = Object.values(ROLE).includes(role)
        if (!isValidRole) {
            isValidRoles = false
        }
    })
    return isValidRoles
}