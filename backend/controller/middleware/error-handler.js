import { CLIENT_ERROR, SERVER_ERROR } from '../../configs/status-types.js'

// https://expressjs.com/en/guide/error-handling.html
export function errorHandler(err, req, res, next) {
    console.log("===========================================")
    console.log(err)
    if (typeof (err) === 'string' || err.name === CLIENT_ERROR.badRequest.name) {
        return res.status(CLIENT_ERROR.badRequest.code).json({ message: err });
    }

    switch (err.name) {
        case CLIENT_ERROR.badRequest.name:
            return res.status(CLIENT_ERROR.badRequest.code).json({ message: err.message });
        case CLIENT_ERROR.unauthenticated.name:
            return res.status(CLIENT_ERROR.unauthenticated.code).json({ message: err.message });
        case CLIENT_ERROR.unauthorized.name:
            return res.status(CLIENT_ERROR.unauthorized.code).json({ message: err.message });
        case CLIENT_ERROR.notFound.name:
            return res.status(CLIENT_ERROR.notFound.code).json({ message: err.message });
        case CLIENT_ERROR.conflict.name:
            return res.status(CLIENT_ERROR.conflict.code).json({ message: err.message });
        default:
            return res.status(SERVER_ERROR.internalServerError.code).json({ message: err.message });
    }
}