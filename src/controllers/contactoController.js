const contactoService = require('../services/contactoUservice')

const create = async (req, res) => {
    try {
        const {correo, telefono} = req.body;
        const contacto = await contactoService.create(correo, telefono);
        res.status(201).json(contacto.toJSON())
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
}

const findById = async (req, res) => {
    try {
        const id = req.params.id;
        const contacto = await contactoService.findById(id);
        res.status(200).json(contacto.toJSON())
    } catch (error) {
        res.status(404).json({
            message : error.message
        })
    }
}

const updateById = async (req, res) => {
    try {
        const id =  req.params.id;
        const {correo, telefono} = req.body;
        const contacto = await contactoService.updateById(id, correo, telefono)
        res.status(200).json(contacto.toJSON())
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
}

module.exports = {create, findById, updateById}