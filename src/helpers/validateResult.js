const { validationResult } = require('express-validator')

const validateResult = async (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (error) {

        console.log(error.array());

        res.status(403).json(
            {
                errors : error.array()
            }
        )
    }
}

module.exports = validateResult