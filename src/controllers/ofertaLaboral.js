const { verifyToken } = require('../helpers/jwtToken');
const ofertaLaboralService = require('../services/ofertaLaboralService')
const historicoOferta = require('../services/historicoOfertaService')

const create = async (req, res) => {
    try {
        const { titulo, descripcion, salario, jornada, tipo_contrato, vacantes, beneficios,
            habilidades_tecnicas, habilidades_blandas, departamento_area, modalidad,
            experiencia, estado, id_empresa, documento } = req.body;
        const oferta_laboral = await ofertaLaboralService.create(titulo, descripcion, salario, jornada, tipo_contrato, vacantes, beneficios,
            habilidades_tecnicas, habilidades_blandas, departamento_area, modalidad,
            experiencia, estado, id_empresa, documento)
        res.status(201).json(oferta_laboral.toJSON())
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const findById = async (req, res) => {
    try {
        const id = req.params.id
        const oferta_laboral = await ofertaLaboralService.findById(id)
        res.status(200).json(oferta_laboral.toJSON())
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const findAll = async (req, res) => {
    try {
        const ofertas_laborales = await ofertaLaboralService.findAll()
        res.status(200).json(ofertas_laborales)
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}


const findAllByIdOrganizacion = async (req, res) => {
    try {
        const id_organizacion = req.params.id_organizacion
        const ofertas_laborales = await ofertaLaboralService.findAllByIdOrganziacion(id_organizacion)
        res.status(200).json(ofertas_laborales)
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const updateById = async (req, res) => {
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
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const deleteById = async (req, res) => {
    try {
        const id = req.params.id
        const tk = req.cookies.tk
        const token = verifyToken(tk)
        const id_cuenta = token.data.id
        const historico = await historicoOferta.create('ELIMINADO', id, id_cuenta)
        const oferta_laboral = await ofertaLaboralService.deletById(id)
        res.status(204).json({message : 'ELIMINADO'})
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const countOfertas = async (req, res) => {
    try {
        const countOfertas = await ofertaLaboralService.countOfertas()
        res.status(200).json(
            {
                empleos : countOfertas
            }
        )
    } catch (error) {
        res.status(400).json(
            {
                error : error.message
            }
        )
    }
}

module.exports = {create, findById, findAll, updateById, deleteById, countOfertas, findAllByIdOrganizacion}