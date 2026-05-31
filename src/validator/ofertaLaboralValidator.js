const { check } = require('express-validator')
const validateResult = require('../helpers/validateResult')

const validateCreate = [
    check('titulo').exists().not().isEmpty().isLength({ min: 1, max: 150 }),
    check('descripcion').exists().not().isEmpty().isLength({ min: 1 }),
    check('salario').isFloat({ min: 0 }).withMessage('El salario no puede ser negativo'),
    check('jornada').exists().not().isEmpty().isLength({ min: 1, max: 150 }),
    check('tipo_contrato').exists().not().isEmpty().isLength({ mix: 1, max: 150 }),
    check('vacantes').isInt({ min: 1 }),
    check('beneficios').exists().not().isEmpty().isLength({ min: 1 }),
    check('habilidades_tecnicas').exists().not().isEmpty().isLength({ min: 1 }),
    check('habilidades_blandas').exists().not().isEmpty().isLength({ min: 1 }),
    check('departamento_area').exists().not().isEmpty().isLength({ min: 1, max: 50 }),
    check('modalidad').exists().not().isEmpty().isLength({ min: 1, max: 150 }),
    check('estado').exists().not().isEmpty().isLength({ min: 1, max: 150 }),
    check('id_empresa').exists().not().isEmpty().isUUID(),
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
    check('id').exists().not().isEmpty().isUUID(),
    check('titulo').exists().not().isEmpty().isLength({ min: 1, max: 150 }),
    check('descripcion').exists().not().isEmpty().isLength({ min: 1 }),
    check('salario').isFloat({ min: 0 }).withMessage('El salario no puede ser negativo'),
    check('jornada').exists().not().isEmpty().isLength({ min: 1, max: 150 }),
    check('tipo_contrato').exists().not().isEmpty().isLength({ mix: 1, max: 150 }),
    check('vacantes').isInt({ min: 1 }),
    check('beneficios').exists().not().isEmpty().isLength({ min: 1 }),
    check('habilidades_tecnicas').exists().not().isEmpty().isLength({ min: 1 }),
    check('habilidades_blandas').exists().not().isEmpty().isLength({ min: 1 }),
    check('departamento_area').exists().not().isEmpty().isLength({ min: 1, max: 50 }),
    check('modalidad').exists().not().isEmpty().isLength({ min: 1, max: 150 }),
    check('estado').exists().not().isEmpty().isLength({ min: 1, max: 150 }),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateDeleteById = [
    check('id').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {validateCreate, validateDeleteById, validateFindById, validateUpdateById}