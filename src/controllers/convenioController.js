const convenioService = require('../services/convenioService')

const create = async (req, res) => {
    try {
        const {titulo, descripcion, tipo, estado, fecha_registro, fecha_inicio, fecha_final} = req.body;
        const convenio = await convenioService.create(titulo, descripcion, tipo, estado, fecha_registro, fecha_inicio, fecha_final)
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
        res.status(200).json(convenios.map(
            convenio => convenio.toJSON()
        ))
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
        const {titulo, descripcion, tipo, fecha_inicio, fecha_final} = req.body
        const convenio = await convenioService.updateById(id,titulo, descripcion, tipo, fecha_inicio, fecha_final)
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
        res.status(204)
    } catch (error) {
        res.status(400).json(
            {
                messsage: error.messsage
            }
        )
    }
}

const countConvenios = async (req, res) => {
    try {
        const count_convenios = await convenioService.countConvenios()
        res.status(200).json(
            {
                convenios: countConvenios
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


module.exports = {create, findAll, findById, updateById, deleteById, countConvenios}