import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../configs/config.js'

export function generateJwt(username) {
    return jwt.sign({ username }, TOKEN_SECRET, { algorithm: 'HS256', expiresIn: "1h" });
}