const { check } = require('express-validator')
const  validateResult = require('../helpers/validateResult')

const validateCreate = [
    check('correo').exists().not().isEmpty().isEmail(),
    check('telefono').exists().not().isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateFindById = [
    check('id').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateUpdateById = [
    check('id').exists().not().isEmpty().isUUID(),
    check('correo').exists().not().isEmpty().isEmail(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate, validateFindById, validateUpdateById }