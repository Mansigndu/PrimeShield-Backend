import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const secret = process.env.secret
console.log(secret)

export function createToken(admin){
    const payload ={
        id:admin._id,
        name:admin.full_name,
        email:admin.email,
        authType:admin.userType
    }
    const token = JWT.sign(payload,secret,{expiresIn:"1d"})
    return token
}
export function validateToken(token) {
    try {
        return JWT.verify(token, secret);
    } catch (error) {
        console.error("JWT verification failed:", error);
        throw new Error("Invalid Token");  // You can throw a custom error
    }
}
