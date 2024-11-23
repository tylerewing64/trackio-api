import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Middleware to verify the JWT
const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from the Authorization header
    
    if (!token) {
        return res.status(403).json({ message: 'Access denied, no token provided!' });
    }

    // Verify token
    jwt.verify(token, 'test-for-now', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token!' });
        }
        
        // Attach the decoded payload (e.g., user data) to the request object
        req.user = decoded; // You can now access `req.user` in your routes

        next(); // Proceed to the next middleware or route handler
    });
};

export default authenticateJWT;
