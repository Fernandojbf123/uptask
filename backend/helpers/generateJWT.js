import jwt from "jsonwebtoken"

export function generateJWT () {
    return jwt.sign({ name})
}