const camaraService = require('../services/camaraService')

const create = async (req, res) => {
    try {
        const { id, nombre, presidente } = req.body;
        const camara = await camaraService.create(id, nombre, presidente);
        res.status(201).json(
            camara.toJSON()
        )
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
        const id = req.params.id;
        const camara = await camaraService.findById(id);
        res.status(200).json(
            camara.toJSON()
        )
    } catch (error) {
        res.status(401).json(
            {
                message: error.message
            }
        )
    }
}

const findAll = async (req, res) => {
    try {
        const camaras = await camaraService.findAll()
        res.status(200).json(
            camaras.map(
                camara.toJSON()
            )
        )
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const updateById = async (req, res) => {
    try {
        const id = req.params.id;
        const {nombre, presidente} = req.body;
        const camara = await camaraService.updateById(id, nombre, presidente)
        res.status(200).json(camara.toJSON())
    } catch (error) {
        res.status(404).json(
            {
                message: error.message
            }
        )
    }
}

const deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const camara = await camaraService.deleteById(id)
        res.status(204).json(
            {
                message : "Camara eliminada exitosamente"
            }
        )
    } catch (error) {
        res.status(404).json(
            {
                message: error.message
            }
        )
    }
}

module.exports = { create, findById, findAll, updateById, deleteById }