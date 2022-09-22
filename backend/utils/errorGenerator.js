export function throwError(type, message) {
    let err = new Error("message")
    err.name = type.name
    throw err
}