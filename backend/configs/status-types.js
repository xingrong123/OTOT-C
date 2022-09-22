export const SUCCESS_RES = {
    ok: {
        name: "OK",
        code: 200
    },
    created: {
        name: "created",
        code: 201
    }
}

export const CLIENT_ERROR = {
    badRequest: {
        name: "Bad request",
        code: 400
    },
    unauthenticated: {
        name: "Unauthorized",
        code: 401
    },
    unauthorized: {
        name: "Forbidden",
        code: 403
    },
    notFound: {
        name: "Not Found",
        code: 404
    },
    conflict: {
        name: "Conflict",
        code: 409
    },
}


export const SERVER_ERROR = {
    internalServerError: {
        name: "Internal Server Error",
        code: 500
    },
}