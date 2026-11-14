const { verifyToken } = require('../helpers/jwtToken');
const eventService = require('../services/eventoService')
const historicoEvento = require('../services/historicoEventoService')


const create = async (req, res,next) => {
    try {
        const { titulo, descripcion, tipo, estado, id_organizacion, fecha_inicio, fecha_final, limite_participantes, tipo_organizacion_permitida, region_permitida, modalidad, sector_permitido, giro_permitido, hora_inicio, hora_final } = req.body;
        const limite = (limite_participantes !== undefined && limite_participantes !== '' && limite_participantes !== null) 
            ? parseInt(limite_participantes) 
            : null;
        const evento = await eventService.create(
            titulo, 
            descripcion, 
            tipo, 
            estado, 
            id_organizacion, 
            fecha_inicio, 
            fecha_final, 
            limite, 
            tipo_organizacion_permitida || 'TODAS', 
            region_permitida || 'TODAS', 
            modalidad || 'PRESENCIAL',
            sector_permitido || 'TODOS',
            giro_permitido || 'TODOS',
            hora_inicio || '09:00',
            hora_final || '18:00'
        )
        res.status(200).json(evento.toJSON())
    } catch (error) {
        next(error)
    }
}

const findById = async (req, res,next) => {
    try {
        const id = req.params.id
        const evento = await eventService.findById(id)
        res.status(200).json(evento.toJSON())
    } catch (error) {
        next(error)
    }
}

const findAll = async (req, res,next) => {
    try {
        const eventos = await eventService.findAll()
        res.status(200).json(
            eventos.map(
                evento => evento.toJSON()
            )
        )
    } catch (error) {
        next(error)
    }
}

const updateById = async (req, res,next) => {
    try {
        const id = req.params.id
        const { titulo, descripcion, tipo, fecha_inicio, fecha_final, limite_participantes, tipo_organizacion_permitida, region_permitida, modalidad, sector_permitido, giro_permitido, hora_inicio, hora_final } = req.body;
        const limite = (limite_participantes !== undefined && limite_participantes !== '' && limite_participantes !== null) 
            ? parseInt(limite_participantes) 
            : null;
        const evento = await eventService.updateById(
            id, 
            titulo, 
            descripcion, 
            tipo, 
            fecha_inicio, 
            fecha_final, 
            limite, 
            tipo_organizacion_permitida || 'TODAS', 
            region_permitida || 'TODAS', 
            modalidad || 'PRESENCIAL',
            sector_permitido || 'TODOS',
            giro_permitido || 'TODOS',
            hora_inicio || '09:00',
            hora_final || '18:00'
        )
        res.status(200).json(evento.toJSON())
    } catch (error) {
        next(error)
    }
}

const deleteById = async (req, res,next) => {
    try {
        const id = req.params.id
        const tk = req.cookies.tk
        const token = verifyToken(tk)
        const id_cuenta = token.data.id
        const historico = await historicoEvento.create('ELIMINADO', id, id_cuenta)
        const evento = await eventService.deleteById(id)
        res.status(204).json({
            message: 'ELIMINADO'
        })
    } catch (error) {
        next(error)
    }
}

const countEventos = async (req, res,next) => {
    try {
        const count_eventos = await eventService.countEventos()
        res.status(200).json(
            {
                eventos: count_eventos
            }
        )
    } catch (error) {
        next(error)
    }
}

const findAllByEstado = async (req, res,next) => {
    try {
        const estado = req.params.estado
        const limite = req.params.limite
        const eventos = await eventService.findAllByEstado(estado, limite)
        res.status(200).json(eventos.map(
            evento => evento.toJSON()
        ))
    } catch (error) {
        next(error)
    }
}

const findAllEventos = async (req, res,next) => {
    try {
        const limit = req.params.limit
        const offset = req.params.offset
        const eventos = await eventService.findAllEventos(limit, offset)
        res.status(200).json(eventos)
    } catch (error) {
        next(error)
    }
}

const findAllByIdOrganizacion = async (req, res,next) => {
    try {
        const id_organizacion = req.params.id_organizacion
        const eventos = await eventService.findAllByIdOrganizacion(id_organizacion)
        res.status(200).json(eventos.map(evento => evento.toJSON()))
    } catch (error) {
        next(error)
    }
}

const dashEventosPorAño = async (req, res,next) => {
    try {
        const dash = await eventService.dashEventosPorAño()
        res.status(200).json(dash)
    } catch (error) {
        next(error)
    }
}

module.exports = {dashEventosPorAño, create, findById, findAll, updateById, deleteById, countEventos, findAllByEstado, findAllEventos, findAllByIdOrganizacion }