const { verifyToken } = require('../helpers/jwtToken');
const ofertaLaboralService = require('../services/ofertaLaboralService')
const historicoOferta = require('../services/historicoOfertaService')

const create = async (req, res, next) => {
    try {
        const { titulo, descripcion, salario, jornada, tipo_contrato, vacantes, beneficios,
            habilidades_tecnicas, habilidades_blandas, departamento_area, modalidad,
            experiencia, estado, id_empresa, documento } = req.body;
        const oferta_laboral = await ofertaLaboralService.create(titulo, descripcion, salario, jornada, tipo_contrato, vacantes, beneficios,
            habilidades_tecnicas, habilidades_blandas, departamento_area, modalidad,
            experiencia, estado, id_empresa, documento)
        res.status(201).json(oferta_laboral.toJSON())
    } catch (error) {
        next(error)
    }
}

const findById = async (req, res, next) => {
    try {
        const id = req.params.id
        const oferta_laboral = await ofertaLaboralService.findById(id)
        res.status(200).json(oferta_laboral.toJSON())
    } catch (error) {
        next(error)
    }
}

const findAll = async (req, res, next) => {
    try {
        const limit = req.params.limit
        const offset = req.params.offset
        const ofertas_laborales = await ofertaLaboralService.findAll(limit, offset)
        res.status(200).json(ofertas_laborales)
    } catch (error) {
        next(error)
    }
}


const findAllByIdOrganizacion = async (req, res, next) => {
    try {
        const limit = req.params.limit
        const offset = req.params.offset
        const id_organizacion = req.params.id_organizacion
        const ofertas_laborales = await ofertaLaboralService.findAllByIdOrganziacion(id_organizacion,limit, offset)
        res.status(200).json(ofertas_laborales)
    } catch (error) {
        next(error)
    }
}

const updateById = async (req, res, next) => {
    try {
        const id = req.params.id
        const { titulo, descripcion, salario, jornada, tipo_contrato, vacantes, beneficios,
            habilidades_tecnicas, habilidades_blandas, departamento_area, modalidad,
            experiencia, estado } = req.body
        const oferta_laboral = await ofertaLaboralService.updateById(id, titulo, descripcion, salario, jornada, tipo_contrato, vacantes, beneficios,
            habilidades_tecnicas, habilidades_blandas, departamento_area, modalidad,
            experiencia, estado)
        res.status(200).json(oferta_laboral.toJSON())
    } catch (error) {
        next(error)
    }
}

const deleteById = async (req, res, next) => {
    try {
        const id = req.params.id
        const tk = req.cookies.tk
        const token = verifyToken(tk)
        const id_cuenta = token.data.id
        const historico = await historicoOferta.create('ELIMINADO', id, id_cuenta)
        const oferta_laboral = await ofertaLaboralService.deletById(id)
        res.status(204).json({ message: 'ELIMINADO' })
    } catch (error) {
        next(error)
    }
}

const countOfertas = async (req, res, next) => {
    try {
        const countOfertas = await ofertaLaboralService.countOfertas()
        res.status(200).json(
            {
                empleos: countOfertas
            }
        )
    } catch (error) {
        next(error)
    }
}

module.exports = { create, findById, findAll, updateById, deleteById, countOfertas, findAllByIdOrganizacion }