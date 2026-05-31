const { check, param } = require('express-validator')
const validateResult = require('../helpers/validateResult')

const validateCreate = [
    check('contenido').exists().not().isEmpty(),
    check('estado').exists().not().isEmpty(),
    check('id_usuario').exists().not().isEmpty().isUUID(),
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

const validateFindAllByIdUsuario = [
    param('id_organizacion').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateUpdateContenidoById = [
    check('id').exists().not().isEmpty().isUUID(),
    check('contenido').exists().not().isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateUpdateEstadoById = [
    check('id').exists().not().isEmpty().isUUID(),
    check('estado').exists().not().isEmpty(),
    check('id_administrador').exists().not().isEmpty().isUUID(),
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

module.exports = {validateCreate, validateDeleteById, validateFindAllByIdUsuario, validateFindById, validateUpdateContenidoById, validateUpdateEstadoById}