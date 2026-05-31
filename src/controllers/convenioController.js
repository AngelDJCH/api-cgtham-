const convenioService = require('../services/convenioService')
const convenioOrganizacionRepository = require('../repository/convenioOrganizacionRepository')

const create = async (req, res) => {
    try {
        const { titulo, descripcion, tipo, subtipo, estado, archivo,fecha_inicio, fecha_final } = req.body;
        const convenio = await convenioService.create(titulo, descripcion, tipo, subtipo, estado, archivo, fecha_inicio, fecha_final)
        res.status(201).json(convenio.toJSON())
    } catch (error) {
        res.status(400).json(
            {
                messsage: error.messsage
            }
        )
    }
}

const findById = async (req, res) => {
    try {
        const id = req.params.id
        const convenio = await convenioService.findById(id)
        res.status(200).json(convenio.toJSON())
    } catch (error) {
        res.status(404).json(
            {
                messsage: error.messsage
            }
        )
    }
}

const findAll = async (req, res) => {
    try {
        const convenios = await convenioService.findAll()
        res.status(200).json(convenios
        )
    } catch (error) {
        res.status(400).json(
            {
                messsage: error.messsage
            }
        )
    }
}

const updateById = async (req, res) => {
    try {
        const id = req.params.id
        const { titulo, descripcion, tipo, fecha_inicio, fecha_final } = req.body
        const convenio = await convenioService.updateById(id, titulo, descripcion, tipo, fecha_inicio, fecha_final)
        res.status(200).json(convenio.toJSON())
    } catch (error) {
        res.status(400).json(
            {
                messsage: error.messsage
            }
        )
    }
}

const deleteById = async (req, res) => {
    try {
        const id = req.params.id
        const convenio = await convenioService.deleteById(id)
        res.status(204).json({
            message: 'ELIMINADO'
        })
    } catch (error) {
        res.status(400).json(
            {
                messsage: error.message
            }
        )
    }
}

const countConvenios = async (req, res) => {
    try {
        const count_convenios = await convenioService.countConvenios()
        res.status(200).json(
            {
                convenios: count_convenios
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

const dashCantidadConveniosPorTipo = async (req, res) => {
    try {
        const dash = await convenioService.dashCantidadConveniosPorTipo()
        res.status(200).json(dash)
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
}


module.exports = { create, findAll, findById, updateById, deleteById, countConvenios,dashCantidadConveniosPorTipo }