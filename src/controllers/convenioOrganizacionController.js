const convenioorganizacionService = require('../services/convenioOrganizacionService')

const create = async (req, res, next) => {
    try {
        const { rol, id_convenio, id_organizacion } = req.body
        const convenioOrganizacion = await convenioorganizacionService.create(rol, id_convenio, id_organizacion)
        res.status(201).json(convenioOrganizacion.toJSON())
    } catch (error) {
        next(error)
    }
}

const findById = async (req, res, next) => {
    try {
        const id = req.params.id
        const convenioOrganizacion = await convenioorganizacionService.findById(id)
        res.status(200).json(convenioOrganizacion.toJSON())
    } catch (error) {
        next(error)
    }
}

const updateRolById = async (req, res, next) => {
    try {
        const id = req.params.id
        const { rol } = req.body
        const convenioOrganizacion = await convenioorganizacionService.updateRolById(id, rol)
        res.status(200).json(convenioOrganizacion.toJSON())
    } catch (error) {
        next(error)
    }
}

const updateEstadoById = async (req, res, next) => {
    try {
        const id = req.params.id
        const { estado } = req.body
        const convenio_organizacion = await convenioorganizacionService.updateEstadoById(id, estado)
        res.status(200).json(convenio_organizacion.toJSON())
    } catch (error) {
        next(error)
    }
}

const findAll = async (req, res, next) => {
    try {
        const convenioOrganizacion = await convenioorganizacionService.findAll()
        res.status(200).json(convenioOrganizacion)
    } catch (error) {
        next(error)
    }
}

const findAllParticipantesById = async (req, res, next) => {
    try {
        const id = req.params.id_convenio
        const participantes = await convenioorganizacionService.findAllParticipantesById(id)
        res.status(200).json(participantes)
    } catch (error) {
        next(error)
    }
}

const deleteById = async (req, res, next) => {
    try {
        const id = req.params.id
        const convenio_organizacion = await convenioorganizacionService.deleteById(id)
        res.status(204).json({ message: 'ELIMINADO' })
    } catch (error) {
        next(error)
    }
}

module.exports = { create, findById, updateRolById, findAll, findAllParticipantesById, deleteById, updateEstadoById }