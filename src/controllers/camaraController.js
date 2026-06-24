const camaraService = require('../services/camaraService')

const create = async (req, res,next) => {
    try {
        const { id, nombre, presidente } = req.body;
        const camara = await camaraService.create(id, nombre, presidente);
        res.status(201).json(
            camara.toJSON()
        )
    } catch (error) {
        next(error)
    }
}

const findById = async (req, res,next) => {
    try {
        const id = req.params.id;
        const camara = await camaraService.findById(id);
        res.status(200).json(
            camara.toJSON()
        )
    } catch (error) {
        next(error)
    }
}

const findAll = async (req, res,next) => {
    try {
        const camaras = await camaraService.findAll()
        res.status(200).json(
            camaras.map(
                camara.toJSON()
            )
        )
    } catch (error) {
        next(error)
    }
}

const updateById = async (req, res,next) => {
    try {
        const id = req.params.id;
        const {nombre, presidente} = req.body;
        const camara = await camaraService.updateById(id, nombre, presidente)
        res.status(200).json(camara.toJSON())
    } catch (error) {
        next(error)
    }
}

const deleteById = async (req, res,next) => {
    try {
        const id = req.params.id;
        const camara = await camaraService.deleteById(id)
        res.status(204).json(
            {
                message : "Camara eliminada exitosamente"
            }
        )
    } catch (error) {
        next(error)
    }
}

module.exports = { create, findById, findAll, updateById, deleteById }