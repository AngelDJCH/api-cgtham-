const { check } = require('express-validator')
const validateResult = require('../helpers/validateResult')

const validateCreate = [
    check('id_organizacion').exists().not().isEmpty().isUUID(),
    check('razon_social').exists().not().isEmpty(),
    check('regimen_fiscal').exists().not().isEmpty(),
    check('direccion_fiscal').exists().not().isEmpty(),
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
    check('razon_social').exists().not().isEmpty(),
    check('regimen_fiscal').exists().not().isEmpty(),
    check('direccion_fiscal').exists().not().isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateDeleteById = [
    check('id_organizacion').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {validateCreate, validateDeleteById, validateFindById, validateUpdateById}