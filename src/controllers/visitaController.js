const visitaService = require('../services/visitaService')

const create = async (req, res) => {
    try {
        const { id_escuela, id_empresa } = req.body
        const visita = await visitaService.create(id_escuela, id_empresa)
        res.status(201).json(visita)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const findByIdEmpresa = async (req, res) => {
    try {
        const id_empresa = req.params.id_empresa
        const visitas = await visitaService.findByIdEmpresa(id_empresa)
        res.status(200).json(visitas)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const findByIdEscuela = async (req, res) => {
    try {
        const id_escuela = req.params.id_escuela
        const visitas = await visitaService.findByIdEscuela(id_escuela)
        res.status(200).json(visitas)
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

const updateEstadoRechazadaById = async (req, res) => {
    try {
        const id = req.params.id
        const visita = await visitaService.updateEstadoRechazadaById(id)
        res.status(200).json(visita)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const findById = async (req, res) => {
    try {
        const id = req.params.id
        const visita = await visitaService.findById(id)
        res.status(200).json(visita)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const updateById = async (req, res) => {
    try {
        const id = req.params.id
        const { fecha_visita } = req.body
        const visita = await visitaService.updateById(fecha_visita, id)
        res.status(200).json(visita)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const deleteByIdForEscuelas = async (req, res) => {
    try {
        const id = req.params.id
        const visita = await visitaService.deleteByIdForEscuelas(id)
        res.status(204).json(visita)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

module.exports = { create, findByIdEmpresa, updateEstadoRechazadaById, findById, updateById,findByIdEscuela, deleteByIdForEscuelas }