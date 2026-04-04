const fotoService = require('../services/fotoService')

const create = async (req, res) => {
    try {
        const {url_imagen, id_evento} = req.body
        const foto = await fotoService.create(url_imagen, id_evento)
        res.status(201).json(foto.toJSON())
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const findByIdEvento = async (req, res) => {
    try {
        const id_evento = req.params.id_evento
        const fotos = await fotoService.findByIdEvento(id_evento)
        res.status(200).json(fotos.map(foto => foto.toJSON()))
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const deleteById = async (req, res) => {
    try {
        const id = req.params.id
        const foto = await fotoService.deleteById(id)
        res.status(204)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = {create, findByIdEvento, deleteById}