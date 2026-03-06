import jwt from 'jsonwebtoken';

export const requireAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: 'You are not singned in, Please login',
                success: false,
            })
        }

        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    message: 'Invalid token & expired token',
                    success: false,
                })
            }

            req.userId = decoded.userId;
            next();
        })

    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}