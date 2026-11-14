const { check } = require('express-validator')

const validateResult = require('../helpers/validateResult')

const validateCreate = [
    check('titulo').exists().not().isEmpty(),
    check('descripcion').exists().not().isEmpty(),
    check('tipo').exists().not().isEmpty(),
    check('estado').exists().not().isEmpty(),
    check('id_organizacion').exists().not().isEmpty().isUUID(),
    check('fecha_inicio').exists().not().isEmpty().isDate().custom((value) => {
        const hoy = new Date();
        const anio = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const dia = String(hoy.getDate()).padStart(2, '0');
        const fechaHoy = `${anio}-${mes}-${dia}`;
        if (value < fechaHoy) {
            throw new Error('La fecha de inicio no puede ser anterior a la fecha actual');
        }
        return true;
    }),
    check('fecha_final').exists().not().isEmpty().isDate().custom((value, { req }) => {
        if (value < req.body.fecha_inicio) {
            throw new Error('La fecha de finalización no puede ser anterior a la de inicio');
        }
        return true;
    }),
    check('limite_participantes').optional({ nullable: true, checkFalsy: true }).isInt({ min: 1 }).withMessage('El límite de participantes debe ser mayor a 0'),
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
    check('titulo').exists().not().isEmpty(),
    check('descripcion').exists().not().isEmpty(),
    check('tipo').exists().not().isEmpty(),
    check('fecha_inicio').exists().not().isEmpty().isDate(),
    check('fecha_final').exists().not().isEmpty().isDate(),
    check('limite_participantes').optional({ nullable: true, checkFalsy: true }).isInt({ min: 1 }).withMessage('El límite de participantes debe ser mayor a 0'),
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

const validateFindByIdOrganizacion = [
    check('id_organizacion').exists().not().isEmpty().isUUID(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate, validateDeleteById, validateFindById, validateUpdateById, validateFindByIdOrganizacion }