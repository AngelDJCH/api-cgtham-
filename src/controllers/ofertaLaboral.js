const ofertaLaboralService = require('../services/ofertaLaboralService')

const create = async (req, res) => {
    try {
        const { titulo, descripcion, salario, jornada, tipo_contrato, vacantes, beneficios,
            habilidades_tecnicas, habilidades_blandas, departamento_area, modalidad,
            experiencia, estado, fecha_publicacion, id_empresa } = req.body;
        const oferta_laboral = await ofertaLaboralService.create(titulo, descripcion, salario, jornada, tipo_contrato, vacantes, beneficios,
            habilidades_tecnicas, habilidades_blandas, departamento_area, modalidad,
            experiencia, estado, fecha_publicacion, id_empresa)
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
        res.status(200).json(ofertas_laborales.map(
            oferta_laboral => oferta_laboral.toJSON()
        ))
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
        const oferta_laboral = await ofertaLaboralService.deletById(id)
        res.status(204)
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

module.exports = {create, findById, findAll, updateById, deleteById}