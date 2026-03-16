const { check } = require('express-validator')
const validateResult = require('../helpers/validateResult')

const validateCreate = [
    check('estado').exists().not().isEmpty(),
    check('fecha').exists().not().isEmpty().isDate(),
    check('id_evento').exists().not().isEmpty().isUUID(),
    check('id_usuario').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateFindByIdAndEstado = [
    check('id').exists().not().isEmpty().isUUID(),
    check('estado').exists().not().isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateUpdateEstadoById = [
    check('id').exists().not().isEmpty().isUUID(),
    check('estado').exists().not().isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateDeleteById = [
    check('id').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {validateCreate, validateDeleteById, validateFindByIdAndEstado, validateUpdateEstadoById}