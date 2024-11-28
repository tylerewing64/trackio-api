"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware to verify the JWT
const authenticateJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', ''); // Extract token from the Authorization header
    if (!token) {
        return res.status(403).json({ message: 'Access denied, no token provided!' });
    }
    // Verify token
    jsonwebtoken_1.default.verify(token, 'test-for-now', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token!' });
        }
        // Attach the decoded payload (e.g., user data) to the request object
        req.user = decoded; // You can now access `req.user` in your routes
        next(); // Proceed to the next middleware or route handler
    });
};
exports.default = authenticateJWT;
