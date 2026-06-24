const historicoEventoService = require('../services/historicoEventoService')

const create = async (req, res,next) => {
    try {
        const {fecha, accion, id_evento, id_usuario} = req.body
        const historicoEvento = await historicoEventoService.create(fecha, accion, id_evento, id_usuario)
        res.status(201).json(historicoEvento.toJSON())
    } catch (error) {
        next(error)
    }
}

const findById = async (req, res,next) => {
    try {
        const id = req.params.id
        const historicoEvento = await historicoEventoService.findById(id)
        res.status(201).json(historicoEvento.toJSON())
    } catch (error) {
        next(error)
    }
}

const findByIdEvento = async (req, res,next) => {
    try {
        const id_evento = req.params.id
        const historicoEvento = await historicoEventoService.findByIdEvento(id_evento)
        res.status(201).json(historicoEvento.map(h => h.toJSON()))
    } catch (error) {
        next(error)
    }
}

const countHistoricosEventos = async (req, res,next) => {
    try {
        const historicos = await historicoEventoService.countHistoricosEventos()
        res.status(200).json(historicos)
    } catch (error) {
        next(error)
    }
}

const findAll = async (req, res,next) => {
    try {
        const historicos = await historicoEventoService.findAll()
        res.status(200).json(
            historicos
        )
    } catch (error) {
        next(error)
    }
}

module.exports = {create, findById, findByIdEvento, countHistoricosEventos, findAll}