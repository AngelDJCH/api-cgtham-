const visitaService = require('../services/visitaService')

const create = async (req, res, next) => {
    try {
        const { id_escuela, id_empresa } = req.body
        const visita = await visitaService.create(id_escuela, id_empresa)
        res.status(201).json(visita)
    } catch (error) {
        next(error)
    }
}

const findByIdEmpresa = async (req, res, next) => {
    try {
        const limit = req.params.limit
        const offset = req.params.offset
        const id_empresa = req.params.id_empresa
        const visitas = await visitaService.findByIdEmpresa(id_empresa, limit, offset)
        res.status(200).json(visitas)
    } catch (error) {
        next(error)
    }
}

const findByIdEscuela = async (req, res, next) => {
    try {
        const limit = req.params.limit
        const offset = req.params.offset
        const id_escuela = req.params.id_escuela
        const visitas = await visitaService.findByIdEscuela(id_escuela, limit, offset)
        res.status(200).json(visitas)
    } catch (error) {
        next(error)
    }
}

const updateEstadoRechazadaById = async (req, res, next) => {
    try {
        const id = req.params.id
        const visita = await visitaService.updateEstadoRechazadaById(id)
        res.status(200).json(visita)
    } catch (error) {
        next(error)
    }
}

const findById = async (req, res, next) => {
    try {
        const id = req.params.id
        const visita = await visitaService.findById(id)
        res.status(200).json(visita)
    } catch (error) {
        next(error)
    }
}

const updateById = async (req, res, next) => {
    try {
        const id = req.params.id
        const { fecha_visita } = req.body
        const visita = await visitaService.updateById(fecha_visita, id)
        res.status(200).json(visita)
    } catch (error) {
        next(error)
    }
}

const deleteByIdForEscuelas = async (req, res, next) => {
    try {
        const id = req.params.id
        const visita = await visitaService.deleteByIdForEscuelas(id)
        res.status(204).json(visita)
    } catch (error) {
        next(error)
    }
}

const findAllForAdministrador = async (req, res, next) => {
    try {
        const limit = req.params.limit
        const offset = req.params.offset
        const visitas = await visitaService.findAllForAdministrador(limit, offset)
        res.status(200).json(visitas)
    } catch (error) {
        next(error)
    }
}

module.exports = { findAllForAdministrador, create, findByIdEmpresa, updateEstadoRechazadaById, findById, updateById, findByIdEscuela, deleteByIdForEscuelas }