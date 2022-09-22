import { verifyJwt } from '../../utils/jwtVerifier.js'
import { ormSearchToken, ormFindRoles } from '../../model/user-orm.js'
import { CLIENT_ERROR } from '../../configs/status-types.js'
import { throwError } from '../../utils/errorGenerator.js';

export async function authenticate(req, res, next) {
    try {
        let token = req.cookies["token"];
        try {
            var { username } = verifyJwt(token)
        } catch (err) {
            throwError(CLIENT_ERROR.unauthenticated, err.message)
        }
        let tokenData = await ormSearchToken(token);
        if (typeof tokenData === "undefined") {
            throwError(CLIENT_ERROR.unauthenticated, "invalid token")
        }
        let rolesData = await ormFindRoles(username)
        req.username = username
        req.roles = rolesData.map((roleData) => {
            return roleData.getDataValue("role")
        })
        res.cookie("token", token, { httpOnly: true });
        next();
    } catch (err) {
        next(err)
    }
}

export function authorize(roles = []) {
    return [
        async (req, res, next) => {
            try {
                if (roles.length && req.roles.every((role) => !roles.includes(role))) {
                    throwError(CLIENT_ERROR.unauthorized, "invalid role")
                }
                // authentication and authorization successful
                next();
            } catch (err) {
                next(err)
            }
        }
    ];
}