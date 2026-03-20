
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const userAuth = async (req, res, next) => {
    try {
               const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized. Please login again.',
            });
        }

        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        
        const user = await userModel.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found. Please login again.',
            });
        }

        req.user = user; // Available in next middleware or route handler
        next(); // Proceed to protected route

    } catch (error) {
        console.error("Auth Middleware Error:", error.message);

        // Token expired or invalid
        return res.status(401).json({
            success: false,
            message: 'Not authorized. Token invalid or expired.',
        });
    }
};

export default userAuth;
