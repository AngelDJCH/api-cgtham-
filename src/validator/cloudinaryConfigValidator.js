const { check } = require('express-validator')
const validateResult = require('../helpers/validateResult')

const create = [
    check('nombre').exists().not().isEmpty(),
    check('clave').exists().not().isEmpty(),
    check('clave_secreta').exists().not().isEmpty(),
    check('id_organizacion').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const findByIdOrganizacion = [
    check('id_organizacion').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const updateByIdOrganizacion = [
    check('nombre').exists().not().isEmpty(),
    check('clave').exists().not().isEmpty(),
    check('clave_secreta').exists().not().isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {create, findByIdOrganizacion, updateByIdOrganizacion}