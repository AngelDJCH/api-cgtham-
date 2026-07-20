const { check } = require('express-validator')

const validateResult = require('../helpers/validateResult')

const validateCreate = [
    check('titulo').exists().not().isEmpty(),
    check('descripcion').exists().not().isEmpty(),
    check('tipo').exists().not().isEmpty(),
    check('estado').exists().not().isEmpty(),
    check('id_organizacion').exists().not().isEmpty().isUUID(),
    check('fecha_inicio').exists().not().isEmpty().isDate(),
    check('fecha_final').exists().not().isEmpty().isDate(),
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
    check('titulo').exists().not().isEmpty(),
    check('descripcion').exists().not().isEmpty(),
    check('tipo').exists().not().isEmpty(),
    check('fecha_inicio').exists().not().isEmpty().isDate(),
    check('fecha_final').exists().not().isEmpty().isDate(),
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

const validateFindByIdOrganizacion = [
    check('id_organizacion').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate, validateDeleteById, validateFindById, validateUpdateById, validateFindByIdOrganizacion }