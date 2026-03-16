const { check } = require('express-validator')
const validateResult = require('../helpers/validateResult')

const validateCreate = [
    check('nombre').exists().not().isEmpty().isLength({ min: 3, max: 150 }),
    check('apellido_paterno').exists().not().isEmpty().isLength({ min: 3, max: 150 }),
    check('apellido_materno').exists().not().isEmpty().isLength({ min: 3, max: 150 }),
    check('rfc').exists().not().isEmpty().isLength({ min: 13, max: 13 }),
    check('foto').exists().not().isEmpty().isURL(),
    check('banner').exists().not().isEmpty().isURL(),
    check('estado').exists().not().isEmpty().isBoolean(),
    check('id_direccion').exists().not().isEmpty().isUUID(),
    check('id_contacto').exists().not().isEmpty().isUUID(),
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
    check('nombre').exists().not().isEmpty().isLength({ min: 3, max: 150 }),
    check('apellido_paterno').exists().not().isEmpty().isLength({ min: 3, max: 150 }),
    check('apellido_materno').exists().not().isEmpty().isLength({ min: 3, max: 150 }),
    check('rfc').exists().not().isEmpty().isLength({ min: 13, max: 13 }),
    check('foto').exists().not().isEmpty().isURL(),
    check('banner').exists().not().isEmpty().isURL(),
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

module.exports = { validateCreate, validateFindById, validateUpdateById, validateDeleteById}