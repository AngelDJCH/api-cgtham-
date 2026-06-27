const contactoService = require('../services/contactoUservice')

const create = async (req, res, next) => {
    try {
        const { correo, telefono } = req.body;
        const contacto = await contactoService.create(correo, telefono);
        res.status(201).json(contacto.toJSON())
    } catch (error) {
        next(error)
    }
}

const findById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const contacto = await contactoService.findById(id);
        res.status(200).json(contacto.toJSON())
    } catch (error) {
        next(error)
    }
}

const updateById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { correo, telefono } = req.body;
        const contacto = await contactoService.updateById(id, correo, telefono)
        res.status(200).json(contacto.toJSON())
    } catch (error) {
        next(error)
    }
}

const deleteById = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await contactoService.deleteById(id)
        res.status(204).json({eliminado : result})
    } catch (error) {
        next(error)
    }
}

module.exports = { create, findById, updateById, deleteById }