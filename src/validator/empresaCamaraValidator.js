const { check } = require('express-validator')
const validateResult = require('../helpers/validateResult')

const validateCreate = [
    check('estado').exists().not().isEmpty(),
    check('fecha_afiliacion').exists().not().isEmpty().isDate(),
    check('fecha_vencimiento').exists().not().isEmpty().isDate(),
    check('id_empresa').exists().not().isEmpty().isUUID(),
    check('id_camara').exists().not().isEmpty().isUUID(),
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

const validateUpdateEstadoById = [
    check('id').exists().not().isEmpty().isUUID(),
    check('estado').exists().not().isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateUpdateFechaVencimientoById = [
    check('id').exists().not().isEmpty().isUUID(),
    check('fecha_vencimiento').exists().not().isEmpty().isDate(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate, validateFindById, validateUpdateEstadoById, validateUpdateFechaVencimientoById }