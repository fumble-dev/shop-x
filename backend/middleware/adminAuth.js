import jwt from 'jsonwebtoken';

const jwt_secret = process.env.JWT_SECRET || 'iloveyou';

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized. Please login again."
            });
        }

        const tokenDecode = jwt.verify(token, jwt_secret);

        if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized."
            });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({
            success: false,
            message: "Admin Authentication Failed"
        });
    }
};

export default adminAuth;
