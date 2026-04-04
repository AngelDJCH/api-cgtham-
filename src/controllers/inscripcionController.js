const inscripcionService = require('../services/inscripcionService')

const create = async (req, res) => {
    try {
        const {estado, fecha, id_evento, id_usuario} = req.body;
        const inscripcion = await inscripcionService.create(estado, fecha, id_evento, id_usuario)
        res.status(201).json(inscripcion.toJSON())
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const findByIdAndEstado = async (req, res) => {
    try {
        const id = req.params.id
        const {estado} = req.body
        const inscripcion = await inscripcionService.findByIdAndEstado(id, estado)
        res.status(200).json(inscripcion.toJSON())
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const findAllByIdOrganizacion =  async (req, res) => {
    try {
        const id_organizacion = req.params.id_organizacion
        const inscripciones = await inscripcionService.findAllByIdOrganizacion(id_organizacion)
        res.status(200).json(inscripciones)        
    } catch (error) {
        res.status(400).json(
            {
                message : error.message
            }
        )
    }
}

const updateEstadoById = async (req, res) => {
    try {
        const id = req.params.id
        const {estado} = req.body
        const inscripcion =  await inscripcionService.updateEstadoById(id, estado)
        res.status(200).json(inscripcion.toJSON())
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
        const inscripcion = await inscripcionService.deleteById(id)
        res.status(204)
    } catch (error) {
        res.status(404).json(
            {
                messsage : error.message
            }
        )
    }
}

module.exports = {create, findByIdAndEstado, updateEstadoById, deleteById,findAllByIdOrganizacion}