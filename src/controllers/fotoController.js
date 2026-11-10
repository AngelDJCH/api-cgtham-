const fotoService = require('../services/fotoService')

const create = async (req, res, next) => {
    try {
        const { url_imagen, id_evento } = req.body
        const foto = await fotoService.create(url_imagen, id_evento)
        res.status(201).json(foto.toJSON())
    } catch (error) {
        next(error)
    }
}

const findByIdEvento = async (req, res, next) => {
    try {
        const id_evento = req.params.id_evento
        const fotos = await fotoService.findByIdEvento(id_evento)
        res.status(200).json(fotos)
    } catch (error) {
        next(error)
    }
}

const deleteById = async (req, res, next) => {
    try {
        const id = req.params.id
        await fotoService.deleteById(id)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}

module.exports = { create, findByIdEvento, deleteById }
