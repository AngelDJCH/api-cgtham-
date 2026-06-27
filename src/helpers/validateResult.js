const { validationResult } = require('express-validator')

const validateResult = async (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (error) {

        console.log(error.array());

        next(error.array())
    }
}

module.exports = validateResult