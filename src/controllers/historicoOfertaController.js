const historicoOfertaService = require('../services/historicoOfertaService')

const create = async (req, res,next) => {
    try {
        const {fecha, accion, id_oferta, id_usuario} = req.body;
        const historicoOferta = await historicoOfertaService.create(fecha, accion, id_oferta, id_usuario)
        res.status(201).json(historicoOferta.toJSON())
    } catch (error) {
        next(error)
    }
}

const findById = async (req, res,next) => {
    try {
        const id = req.params.id
        const historicoOferta = await historicoOfertaService.findById(id)
        res.status(200).json(historicoOferta.toJSON())
    } catch (error) {
        next(error)
    }
}

const findByIdOferta = async (req, res,next) => {
    try {
        const id_oferta = req.params.id
        const historicoOferta = await historicoOfertaService.findByIdOferta(id_oferta)
        res.status(200).json(historicoOferta.map(
            h => h.toJSON()
        ))
    } catch (error) {
        next(error)
    }
}

const countHistoricosOfertas = async (req, res,next) => {
    try {
        const historicos = await historicoOfertaService.countHistoricosOfertas()
        res.status(200).json(historicos)
    } catch (error) {
        next(error)
    }
}

const findAll = async (req, res,next) => {
    try {
        const historicos = await historicoOfertaService.findAllHistoricos()
        res.status(200).json(historicos)
    } catch (error) {
        next(error)
    }
}

module.exports = {create, findById, findByIdOferta, countHistoricosOfertas, findAll}