const { validationResult } = require('express-validator')

const validateResult = async (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (error) {
        const errors = error.array()
        console.log('Errores de validación:', errors)
        return res.status(400).json({
            message: errors[0]?.msg || 'Error de validación en los datos proporcionados',
            errors: errors
        })
    }
}

module.exports = validateResult
