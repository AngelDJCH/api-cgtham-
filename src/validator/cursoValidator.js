const validateResult = require('../helpers/validateResult.js')
const {check} = require('express-validator')

const validateCreate = [
    check('titulo').exists().not().isEmpty(),
    check('descripcion').exists().not().isEmpty(),
    check('fecha_inicio').exists().not().isEmpty().isDate(),
    check('fecha_fin').exists().not().isEmpty().isDate(),
    check('estado').exists().not().isEmpty(),
    check('id_organizacion').exists().not().isEmpty().isUUID(),
    (req,res,next)=>{
        validateResult(req,res,next)
    }
]

const validateSolicitar = [
    check('titulo').exists().not().isEmpty(),
    check('descripcion').exists().not().isEmpty(),
    check('estado').exists().not().isEmpty(),
    check('id_organizacion').exists().not().isEmpty().isUUID(),
    (req,res,next) =>{
        validateResult(req,res,next)
    }
]

const validateFindAllEscuelas = [
    check('id_organizacion').exists().not().isEmpty().isUUID(),
    (req,res,next)=>{
        validateResult(req,res,next)
    }
]

const validateFindById = [
    check('id_curso').exists().not().isEmpty().isUUID(),
    (req,res,next)=>{
        validateResult(req,res,next)
    }
]

const validateSolicitudes = [
    check('id_organizacion').exists().not().isEmpty().isUUID(),
    (req,res,next)=>{
        validateResult(req,res,next)
    }
]

const validateUpdateById = [
    check('id_curso').exists().not().isEmpty(),
    check('titulo').exists().not().isEmpty(),
    check('descripcion').exists().not().isEmpty(),
    check('inicio').exists().not().isEmpty(),
    check('final').exists().not().isEmpty(),
    (req,res,next) =>{
        validateResult(req,res,next)
    }
]

const validateUpdateEstadoById = [
    check('id_curso').exists().not().isEmpty(),
    (req,res,next)=>{
        valdiateResult(req,res,next)
    }
]

const validateUpdateByIdForPeticion = [
    check('id_curso').exists().not().isEmpty(),
    check('titulo').exists().not().isEmpty(),
    check('descripcion').exists().not().isEmpty(),
    check('fecha_inicio').exists().not().isEmpty(),
    check('fecha_final').exists().not().isEmpty(),
    (req,res,next)=>{
        valdiateResult(req,res,next)
    }
]

module.exports = {validateCreate, validateSolicitar, validateFindAllEscuelas, validateFindById, validateSolicitudes, validateUpdateById, validateUpdateEstadoById, validateUpdateByIdForPeticion}