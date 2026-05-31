const historicoOfertaService = require('../services/historicoOfertaService')

const create = async (req, res) => {
    try {
        const {fecha, accion, id_oferta, id_usuario} = req.body;
        const historicoOferta = await historicoOfertaService.create(fecha, accion, id_oferta, id_usuario)
        res.status(201).json(historicoOferta.toJSON())
    } catch (error) {
        res.status(400).json(
            {
                message : error.message
            }
        )
    }
}

const findById = async (req, res) => {
    try {
        const id = req.params.id
        const historicoOferta = await historicoOfertaService.findById(id)
        res.status(200).json(historicoOferta.toJSON())
    } catch (error) {
        res.status(404).json(
            {
                message : error.message
            }
        )
    }
}

const findByIdOferta = async (req, res) => {
    try {
        const id_oferta = req.params.id
        const historicoOferta = await historicoOfertaService.findByIdOferta(id_oferta)
        res.status(200).json(historicoOferta.map(
            h => h.toJSON()
        ))
    } catch (error) {
        res.status(404).json(
            {
                message : error.message
            }
        )
    }
}

const countHistoricosOfertas = async (req, res) => {
    try {
        const historicos = await historicoOfertaService.countHistoricosOfertas()
        res.status(200).json(historicos)
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
}

const findAll = async (req, res) => {
    try {
        const historicos = await historicoOfertaService.findAllHistoricos()
        res.status(200).json(historicos)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {create, findById, findByIdOferta, countHistoricosOfertas, findAll}