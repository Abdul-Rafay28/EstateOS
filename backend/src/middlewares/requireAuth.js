import jwt from 'jsonwebtoken';
import userModel from '../modules/user/user.model.js';

export const requireAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: 'You are not singned in, Please login',
                type: 'Auth_Error',
                success: false,
            })
        }

        jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    message: 'Invalid token & expired token',
                    type: 'Auth_Error',
                    success: false,
                })
            }

            req.userId = decoded.userId;

            const user = await userModel.findById(req.userId);
            if (!user) {
                return res.status(401).json({
                    message: 'User not found',
                    type: 'Auth_Error',
                    success: false,
                })
            }

            req.user = user;

            next();
        })

    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}