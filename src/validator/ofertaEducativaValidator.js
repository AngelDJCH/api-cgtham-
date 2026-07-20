const validateResult = require('../helpers/validateResult')
const { check } = require('express-validator')

const validateCreate = [
    check('nombre').exists().not().isEmpty(),
    check('descripcion').exists().not().isEmpty(),
    check('duracion').exists().not().isEmpty().isFloat(
        { min: 0.0, max: 20.0 }
    ),
    check('perfil').exists().not().isEmpty(),
    check('id_escuela').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateFindAllByIdEscuela = [
    check('id').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {
    validateCreate, validateFindAllByIdEscuela
}