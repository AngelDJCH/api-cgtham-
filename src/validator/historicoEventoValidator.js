const { check } = require('express-validator')
const  validateResult  = require('../helpers/validateResult')

const validateCreate = [
    check('fecha').exists().not().isEmpty().isDate(),
    check('accion').exists().not().isEmpty(),
    check('id_evento').exists().not().isEmpty().isUUID(),
    check('id_usuario').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateFindByIdEvento = [
    check('id_evento').exists().not().isEmpty().isUUID(),
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

module.exports = {validateCreate, validateFindById, validateFindByIdEvento}