const validateResult = require('../helpers/validateResult')
const { check } = require('express-validator')

const validateCreate = [
    check('id_escuela').exists().not().isEmpty().isUUID(),
    check('id_empresa').exists().not().isEmpty().isUUID(),
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

const validateFindByIdEmpresa = [
    check('id_empresa').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateFindByIdEscuela = [
    check('id_escuela').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateUpdateEstadoRechazadaById = [
    check('id').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateUpdateById = [
    check('id').exists().not().isEmpty().isUUID(),
    check('fecha_visita').exists().not().isEmpty().isDate(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateDeleteByIdForEscuelas = [
    check('id').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {
    validateCreate,
    validateFindById,
    validateFindByIdEmpresa,
    validateFindByIdEscuela,
    validateUpdateEstadoRechazadaById,
    validateUpdateById,
    validateDeleteByIdForEscuelas
}