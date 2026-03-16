const { check } = require('express-validator')
const validateResult = require('../helpers/validateResult')

const create = [
    check('url_imagen').exists().not().isEmpty().isURL(),
    check('id_evento').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const findByIdEvento = [
    check('id_evento').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const deleteById = [
    check('id').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { create, findByIdEvento, deleteById }