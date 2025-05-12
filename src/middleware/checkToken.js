import { validateToken } from "./token.js";
import User from "../model/user.model.js";

export async function checkAuth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]; // 'Bearer <token>'
    
    console.log("Authorization Header:", req.headers.authorization); // Log the header for debugging
    
    if (!token) {
        return res.status(401).send("Unauthorized: No token provided");
    }

    try {
        const userPayload = validateToken(token);  // Token validation
        req.user = userPayload;
        console.log(req.user)
        
        const { id } = req.user;
        
        const userData = await User.findById(id); // User lookup
        // console.log(userData)
        if (!userData || userData.token === null) {
            return res.status(401).send("Unauthorized: Invalid or expired token");
        }
        
        next();
    } catch (error) {
        console.error("Token validation error:", error);  // Log error details
        return res.status(500).send("Something Went Wrong");
    }
}

