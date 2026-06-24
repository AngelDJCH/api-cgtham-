const escuelaService = require('../services/escuelaService')

const create = async (req, res,next) => {
    try {
        const { id_organizacion, tipo_institucion, url_sitio } = req.body;
        const escuela = await escuelaService.create(id_organizacion, tipo_institucion, url_sitio);
        res.status(201).json(escuela.toJSON())
    } catch (error) {
        next(error)
    }
}

const findById = async (req, res,next) => {
    try {
        const id = req.params.id;
        const escuela = await escuelaService.findById(id);
        res.status(200).json(escuela.toJSON())
    } catch (error) {
        next(error)
    }
}

const findAll = async (req, res,next) => {
    try {
        const escuelas = await escuelaService.findAll();
        res.status(200).json(
            escuelas.map(
                escuela => escuela.toJSON()
            )
        )
    } catch (error) {
        next(error)
    }
}

const updateById = async (req, res,next) => {
    try {
        const id = req.params.id;
        const { tipo_institucion, url_sitio } = req.body;
        const escuela = await escuelaService.updateById(id, tipo_institucion, url_sitio);
        res.status(200).json(escuela.toJSON())
    } catch (error) {
        next(error)
    }
}

const deleteById = async (req, res,next) => {
    try {
        const id = req.params.id;
        const escuela = await escuelaService.deleteById(id);
        res.status(204).json(
            {
                message : "Escuela eliminada exitosamente"
            }
        )
    } catch (error) {
        next(error)
    }
}

module.exports = { create, findById, findAll, updateById, deleteById }