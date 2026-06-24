const convenioService = require('../services/convenioService')
const convenioOrganizacionRepository = require('../repository/convenioOrganizacionRepository')

const create = async (req, res,next) => {
    try {
        const { titulo, descripcion, tipo, subtipo, estado, archivo,fecha_inicio, fecha_final } = req.body;
        const convenio = await convenioService.create(titulo, descripcion, tipo, subtipo, estado, archivo, fecha_inicio, fecha_final)
        res.status(201).json(convenio.toJSON())
    } catch (error) {
        next(error)
    }
}

const findById = async (req, res,next) => {
    try {
        const id = req.params.id
        const convenio = await convenioService.findById(id)
        res.status(200).json(convenio.toJSON())
    } catch (error) {
        rnext(error)
    }
}

const findAll = async (req, res,next) => {
    try {
        const convenios = await convenioService.findAll()
        res.status(200).json(convenios
        )
    } catch (error) {
        next(error)
    }
}

const updateById = async (req, res,next) => {
    try {
        const id = req.params.id
        const { titulo, descripcion, tipo, fecha_inicio, fecha_final } = req.body
        const convenio = await convenioService.updateById(id, titulo, descripcion, tipo, fecha_inicio, fecha_final)
        res.status(200).json(convenio.toJSON())
    } catch (error) {
        next(error)
    }
}

const deleteById = async (req, res,next) => {
    try {
        const id = req.params.id
        const convenio = await convenioService.deleteById(id)
        res.status(204).json({
            message: 'ELIMINADO'
        })
    } catch (error) {
        next(error)
    }
}

const countConvenios = async (req, res,next) => {
    try {
        const count_convenios = await convenioService.countConvenios()
        res.status(200).json(
            {
                convenios: count_convenios
            }
        )
    } catch (error) {
        next(error)
    }
}

const dashCantidadConveniosPorTipo = async (req, res,next) => {
    try {
        const dash = await convenioService.dashCantidadConveniosPorTipo()
        res.status(200).json(dash)
    } catch (error) {
        next(error)
    }
}


module.exports = { create, findAll, findById, updateById, deleteById, countConvenios,dashCantidadConveniosPorTipo }