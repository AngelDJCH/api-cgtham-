const { check } = require('express-validator')
const validationResult = require('../helpers/validateResult')

const validateCreate = [
    check('fecha').exists().not().isEmpty().isDate(),
    check('accion').exists().not().isEmpty(),
    check('id_oferta').exists().not().isEmpty().isUUID(),
    check('id_usuario').exists().not().isEmpty().isUUID(),
    (req,res,next)=>{
        validationResult(req,res,next)
    }
]

const validateFindById = [
    check('id').exists().not().isEmpty().isUUID(),
        (req,res,next)=>{
        validationResult(req,res,next)
    }
]

const validateFindByIdOferta = [
    check('id_oferta').exists().not().isEmpty().isUUID(),
        (req,res,next)=>{
        validationResult(req,res,next)
    }
]

module.exports = {validateCreate, validateFindById, validateFindByIdOferta}