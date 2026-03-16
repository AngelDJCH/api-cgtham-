const escuelaService = require('../services/escuelaService')

const create = async (req, res) => {
    try {
        const { id_organizacion, tipo_institucion, url_sitio } = req.body;
        const escuela = await escuelaService.create(id_organizacion, tipo_institucion, url_sitio);
        res.status(201).json(escuela.toJSON())
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
        const escuela = await escuelaService.findById(id);
        res.status(200).json(escuela.toJSON())
    } catch (error) {
        res.status(404).json(
            {
                message: error.message
            }
        )
    }
}

const findAll = async (req, res) => {
    try {
        const escuelas = await escuelaService.findAll();
        res.status(200).json(
            escuelas.map(
                escuela => escuela.toJSON()
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
        const { tipo_institucion, url_sitio } = req.body;
        const escuela = await escuelaService.updateById(id, tipo_institucion, url_sitio);
        res.status(200).json(escuela.toJSON())
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
        const escuela = await escuelaService.deleteById(id);
        res.status(204).json(
            {
                message : "Escuela eliminada exitosamente"
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