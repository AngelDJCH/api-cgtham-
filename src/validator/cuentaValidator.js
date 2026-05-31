const { check } = require('express-validator')
const validateResult = require('../helpers/validateResult')

const validateCreate = [
    check('correo').exists().not().isEmpty().isEmail(),
    check('contrasenia').exists().not().isEmpty(),
    check('roles').exists().not().isEmpty().isArray(),
    check('id_organizacion').not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateFindById = [
    check('id_usuario').not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateUpdateById = [
    check('id_usuario').exists().not().isEmpty().isUUID(),
    check('roles').exists().not().isEmpty().isArray(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateLogin = [
    check('correo').exists().not().isEmpty().isEmail(),
    check('contrasenia').exists().not().isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate, validateFindById, validateUpdateById, validateLogin }