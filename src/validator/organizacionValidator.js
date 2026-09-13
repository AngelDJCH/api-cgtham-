const { check } = require('express-validator');
const validateResult = require('../helpers/validateResult');

const validateCreate = [
    check('nombre_comercial').exists().not().isEmpty().isLength({ min: 5, max: 254 }),
    check('descripcion').exists().not().isEmpty(),
    check('tipo').exists().not().isEmpty().isLength({ min: 5, max: 30 }),
    check('sector').exists().not().isEmpty().isLength({ min: 5, max: 150 }),
    check('tamaño').isInt({ min: 1 }).withMessage('El tamaño no puede ser menor a 1'),
    check('giro').exists().not().isEmpty(),
    check('rfc').exists().not().isEmpty().isLength({ min: 12, max: 13 }),
    check('logo').exists().not().isEmpty().isURL(),
    check('banner').exists().not().isEmpty().isURL(),
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
    check('nombre_comercial').exists().not().isEmpty().isLength({ min: 5, ma: 254 }),
    check('descripcion').exists().not().isEmpty(),
    check('tipo').exists().not().isEmpty().isLength({ min: 5, max: 30 }),
    check('sector').exists().not().isEmpty().isLength({ min: 5, max: 150 }),
    check('tamaño').isInt({ min: 1 }).withMessage('El tamaño no puede ser menor a 1'),
    check('giro').exists().not().isEmpty(),
    check('rfc').exists().not().isEmpty().isLength({ min: 12, max: 13 }),
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

const validateFindByIdFast = [
    check('id_organizacion').exists().not().isEmpty().isUUID(),
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

module.exports = {validateUpdateEstadoById, validateFindByIdFast, validateCreate, validateDeleteById, validateFindById, validateUpdateById }