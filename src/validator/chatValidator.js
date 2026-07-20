const validateResult = require('../helpers/validateResult')
const {check} = require('express-validator')

const validateCreate = [
    check('organizacion1').exists().notEmpty().isUUID().withMessage('El id de la organización es invalido'),
    check('organizacion2').exists().notEmpty().isUUID().withMessage('El id de la organización es invalido'),
    (req, res, next)=>{
        validateResult(req, res, next)
    }
]

const validateFindAllByOrganizaciones = [
    check('id_emisor').exists().notEmpty().isUUID().withMessage('El id de la organización es invalido'),
    check('id_receptor').exists().notEmpty().isUUID().withMessage('El id de la organización es invalido'),
    (req, res, next)=>{
        validateResult(req, res, next)
    }
]

module.exports = {validateCreate, validateFindAllByOrganizaciones}