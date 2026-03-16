const { check } = require('express-validator')
const validateResult = require('../helpers/validateResult')

const validateCreate = [
    check('fecha').exists().not().isEmpty().isDate(),
    check('id_seguido').exists().not().isEmpty().isUUID(),
    check('id_seguidor').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateFindAllSeguidosById = [
    check('id_seguidor').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateFindAllSeguidoresById = [
    check('id_seguido').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateDeleteSeguidorOrSeguido = [
    check('id_seguido').exists().not().isEmpty().isUUID(),
    check('id_seguidor').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {validateCreate, validateDeleteSeguidorOrSeguido, validateFindAllSeguidoresById, validateFindAllSeguidosById}