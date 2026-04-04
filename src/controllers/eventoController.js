const eventService = require('../services/eventoService')

const create = async (req, res) => {
    try {
        const { titulo, descripcion, tipo, estado, id_organizacion, fecha_inicio, fecha_final, fecha_publicacion } = req.body;
        const evento = await eventService.create(titulo, descripcion, tipo, estado, id_organizacion, fecha_inicio, fecha_final, fecha_publicacion)
        res.status(200).json(evento.toJSON())
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
        const evento = await eventService.findById(id)
        res.status(200).json(evento.toJSON())
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
        const eventos = await eventService.findAll()
        res.status(200).json(
            eventos.map(
                evento => evento.toJSON()
            )
        )
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
        const { titulo, descripcion, tipo, fecha_inicio, fecha_final } = req.body;
        const evento = await eventService.updateById(id, titulo, descripcion, tipo, fecha_inicio, fecha_final)
        res.status(200).json(evento.toJSON())
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
        const evento = await eventService.deleteById(id)
        res.status(204)
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const countEventos = async (req, res) => {
    try {
        const count_eventos = await eventService.countEventos()
        res.status(200).json(
            {
                eventos: count_eventos
            }
        )
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const findAllByEstado = async (req, res) => {
    try {
        const estado = req.params.estado
        const limite = req.params.limite
        const eventos = await eventService.findAllByEstado(estado, limite)
        res.status(200).json(eventos.map(
            evento => evento.toJSON()
        ))
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const findAllEventos = async (req, res) => {
    try {
        const limit = req.params.limit
        const offset = req.params.offset
        const eventos = await eventService.findAllEventos(limit, offset)
        res.status(200).json(eventos)
    } catch (error) {
        res.status(400).json(
            {
                message : error.message
            }
        )
    }
}

const findEventosByIdUsuario = async (req, res) => {
    try {
        const id = req.params.id
        const eventos = await eventService.findEventosByIdUsuario(id)
        res.status(200).json(
            eventos
        )        
    } catch (error) {
        res.status(400).json(
            {
                message : error.message
            }
        )
    }
}

module.exports = { create, findById, findAll, updateById, deleteById, countEventos, findAllByEstado, findAllEventos, findEventosByIdUsuario}