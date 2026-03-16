const { check } = require('express-validator')
const validateResult  = require('../helpers/validateResult')

const validateCreate = [
    check('id_organizacion').exists().not().isEmpty().isUUID(),
    check('tipo_institucion').exists().not().isEmpty(),
    check('url_sitio').exists().not().isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateFindById = [
    check('id_organizacion').exists().not().isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateUpdateById = [
    check('id_organizacion').exists().not().isEmpty().isUUID(),
    check('tipo_institucion').exists().not().isEmpty(),
    check('url_sitio').exists().not().isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateDeleteById = [
    check('id_organizacion').exists().not().isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {validateCreate, validateDeleteById, validateFindById, validateUpdateById}