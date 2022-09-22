import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../configs/config.js'

export function verifyJwt(token) {
    return jwt.verify(token, TOKEN_SECRET);
}