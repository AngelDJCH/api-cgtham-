const inscripcionService = require('../services/inscripcionEventoService')

const create = async (req, res, next) => {
    try {
        const { estado, fecha, id_evento, id_organizacion } = req.body;
        const inscripcion = await inscripcionService.create(estado, fecha, id_evento, id_organizacion)
        res.status(201).json(inscripcion.toJSON())
    } catch (error) {
        next(error)
    }
}

const findByIdAndEstado = async (req, res, next) => {
    try {
        const id = req.params.id
        const { estado } = req.body
        const inscripcion = await inscripcionService.findByIdAndEstado(id, estado)
        res.status(200).json(inscripcion.toJSON())
    } catch (error) {
        next(error)
    }
}

const findAllByIdOrganizacion = async (req, res, next) => {
    try {
        const id_organizacion = req.params.id_organizacion
        const inscripciones = await inscripcionService.findAllByIdOrganizacion(id_organizacion)
        res.status(200).json(inscripciones)
    } catch (error) {
        next(error)
    }
}


const findAllByIdUsuario = async (req, res, next) => {
    try {
        const id_usuario = req.params.id_usuario
        const inscripciones = await inscripcionService.findByIdUsuario(id_usuario)
        res.status(200).json(inscripciones)
    } catch (error) {
        next(error)
    }
}

const updateEstadoById = async (req, res, next) => {
    try {
        const id = req.params.id
        const { estado } = req.body
        const inscripcion = await inscripcionService.updateEstadoById(id, estado)
        res.status(200).json(inscripcion.toJSON())
    } catch (error) {
        next(error)
    }
}

const deleteById = async (req, res, next) => {
    try {
        const id = req.params.id
        const inscripcion = await inscripcionService.deleteById(id)
        res.status(204).json({
            message: 'ELIMINADA'
        })
    } catch (error) {
        next(error)
    }
}

const findOrganizacionesParticipantesByIdInscripcion = async (req, res, next) => {
    try {
        const id_evento = req.params.id_evento
        const participantes = await inscripcionService.findOrganizacionesParticipantesByIdInscripcion(id_evento)
        res.status(200).json(participantes)
    } catch (error) {
        next(error)
    }
}

const findInscripcionesByIdEvento = async (req, res, next) => {
    try {
        const id = req.params.id
        const inscripciones = await inscripcionService.findInscripcionesByIdEvento(id)
        res.status(200).json(inscripciones)
    } catch (error) {
        next(error)
    }
}

const findParticipantesPendientesByIdInscripcion = async (req, res, next) => {
    try {
        const id_evento = req.params.id_evento
        const inscripciones = await inscripcionService.findParticipantesPendientesByIdInscripcion(id_evento)
        res.status(200).json(inscripciones)
    } catch (error) {
        next(error)
    }
}

module.exports = { findParticipantesPendientesByIdInscripcion, create, findByIdAndEstado, updateEstadoById, deleteById, findAllByIdOrganizacion, findAllByIdUsuario, findOrganizacionesParticipantesByIdInscripcion, findInscripcionesByIdEvento }