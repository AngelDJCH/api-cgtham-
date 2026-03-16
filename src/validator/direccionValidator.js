const { check } = require('express-validator')
const validateResult = require('../helpers/validateResult')

const validateCreate = [
    check('calle').exists().not().isEmpty(),
    check('numero').exists().not().isEmpty(),
    check('codigo_postal').exists().not().isEmpty(),
    check('ciudad').exists().not().isEmpty(),
    check('estado').exists().not().isEmpty(),
    check('pais').exists().not().isEmpty(),
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
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {validateCreate, validateFindById, validateUpdateById}