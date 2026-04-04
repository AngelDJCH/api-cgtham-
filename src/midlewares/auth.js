const { verifyToken } = require('../helpers/jwtToken');

const auth = async (req, res, next) => {
    try {
        // const token = req.headers.authorization;
        const token = req.cookies.tk
        if (!token || token === undefined) throw new Error('Not Token')

        console.log('El token es: ', token)
        // if (!header || !header.startsWith('Bearer ')) {
        //     return res.status(401).json({ error: 'Authorization header missing' });
        // }

        // const token = header.split(' ')[1];
        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({ error: 'Token invalid' });
        }

        req.roles = decoded.data.rol;
        next();
    } catch (error) {
        return res.status(403).json({ error: error.message });
    }
};

module.exports = auth;
