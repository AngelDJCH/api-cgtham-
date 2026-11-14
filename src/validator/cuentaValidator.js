const { check } = require('express-validator')
const validateResult = require('../helpers/validateResult')

const validateCreate = [
    check('correo').exists().not().isEmpty().isEmail(),
    check('contrasenia').exists().not().isEmpty(),
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

const validateContrasenia = [
    check('id').exists().not().isEmpty().isUUID(),
    check('contrasenia').exists().not().isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateUpdateCorreo = [
    check('id').exists().not().isEmpty().isUUID(),
    check('correo').exists().not().isEmpty().isEmail(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateSolicitarRecuperacion = [
    check('correo').exists().not().isEmpty().isEmail().withMessage('Debe proporcionar un correo válido'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateVerificarCodigo = [
    check('correo').exists().not().isEmpty().isEmail().withMessage('Debe proporcionar un correo válido'),
    check('codigo').exists().not().isEmpty().isLength({ min: 6, max: 6 }).withMessage('El código debe ser de 6 dígitos'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateRestablecerRecuperacion = [
    check('correo').exists().not().isEmpty().isEmail().withMessage('Debe proporcionar un correo válido'),
    check('contrasenia').exists().not().isEmpty().isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {
    validateCreate,
    validateFindById,
    validateUpdateById,
    validateLogin,
    validateUpdateCorreo,
    validateContrasenia,
    validateSolicitarRecuperacion,
    validateVerificarCodigo,
    validateRestablecerRecuperacion
}