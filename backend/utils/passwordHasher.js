import bcrypt from 'bcrypt';

export async function hashPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash
}

export async function verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
}