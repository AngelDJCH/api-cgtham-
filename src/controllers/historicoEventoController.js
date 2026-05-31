const historicoEventoService = require('../services/historicoEventoService')

const create = async (req, res) => {
    try {
        const {fecha, accion, id_evento, id_usuario} = req.body
        const historicoEvento = await historicoEventoService.create(fecha, accion, id_evento, id_usuario)
        res.status(201).json(historicoEvento.toJSON())
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
        const historicoEvento = await historicoEventoService.findById(id)
        res.status(201).json(historicoEvento.toJSON())
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const findByIdEvento = async (req, res) => {
    try {
        const id_evento = req.params.id
        const historicoEvento = await historicoEventoService.findByIdEvento(id_evento)
        res.status(201).json(historicoEvento.map(h => h.toJSON()))
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const countHistoricosEventos = async (req, res) => {
    try {
        const historicos = await historicoEventoService.countHistoricosEventos()
        res.status(200).json(historicos)
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
}

const findAll = async (req, res) => {
    try {
        const historicos = await historicoEventoService.findAll()
        res.status(200).json(
            historicos
        )
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
}

module.exports = {create, findById, findByIdEvento, countHistoricosEventos, findAll}