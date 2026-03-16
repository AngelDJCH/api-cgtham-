const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateResult')

const validateCreate = [
    check('id_organizacion').exists().not().isEmpty().isUUID(),
    check('nombre').exists().not().isEmpty(),
    check('presidente').exists().not().isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateFindById = [
    check('id_organizacion').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateUpdateById = [
    check('id_organizacion').exists().not().isEmpty().isUUID(),
    check('nombre').exists().not().isEmpty(),
    check('presidente').exists().not().isEmpty(),
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