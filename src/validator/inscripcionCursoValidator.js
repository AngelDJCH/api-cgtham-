const validateResult = require('../helpers/validateResult')
const { check } = require('express-validator')

const valiteCreate = [
    check('id_curso').exists().not().isEmpty().isUUID(),
    check('id_organizacion').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateFindParticipantesById = [
    check('id').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateFindPendientesById = [
    check('id').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateUpdateEstadoById = [
    check('id').exists().not().isEmpty().isUUID(),
    check('estado').exists().not().isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { valiteCreate, validateFindParticipantesById, validateFindPendientesById, validateUpdateEstadoById }