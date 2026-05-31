const { check } = require('express-validator')
const validateResult = require('../helpers/validateResult')

const validateCreate = [
    check('rol').exists().not().isEmpty(),
    check('id_convenio').exists().not().isEmpty().isUUID(),
    check('id_organizacion').exists().not().isEmpty().isUUID(),
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
    check('rol').exists().not().isEmpty().isBoolean(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate, validateFindById, validateUpdateById }