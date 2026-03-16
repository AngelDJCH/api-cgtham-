const { verifyToken } = require('../helpers/jwtToken');

const auth = async (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header || !header.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }

        const token = header.split(' ')[1];
        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({ error: 'Token invalid' });
        }

        req.roles = decoded.data.rol; // buena práctica
        next();
    } catch (error) {
        return res.status(403).json({ error: error.message });
    }
};

module.exports = auth;

const rolUser = async (req, res, next) => {

}

const rolAdminOrg = async (req, res, next) => {

}

const rolAdminSys = async (req, res, next) => {

}


module.exports = auth