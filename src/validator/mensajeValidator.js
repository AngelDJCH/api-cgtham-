const { check } = require('express-validator')
const validateResult = require('../helpers/validateResult')

const validateCreate = [
    check('contenido').exists().not().isEmpty().isLength({ min: 1 }),
    check('id_emisor').exists().not().isEmpty().isUUID(),
    check('id_receptor').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateFindAllByIdEmisorAndIdReceptor = [
    check('id').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {validateCreate, validateFindAllByIdEmisorAndIdReceptor}