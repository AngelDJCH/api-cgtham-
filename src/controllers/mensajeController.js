const mensajeService = require('../services/mensajeService')

const create = async (req, res) => {
    try {
        const {contenido, id_emisor, id_receptor} = req.body;
        const mensaje = await mensajeService.create(contenido, id_emisor, id_receptor)
        res.status(201).json(mensaje.toJSON())
    } catch (error) {
        res.status(400).json(
            {
                message : error.message
            }
        )
    }
}

const findAllByIdEmisorAndIdReceptor = async (req, res) => {
    try {
        const {id_emisor, id_receptor} = req.body
        const mensajes = await mensajeService.findAllByIdEmisorAndIdReceptor(id_emisor, id_receptor)
        res.status(200).json(
            mensajes.map(
                mensaje => mensaje.toJSON()
            )
        )
    } catch (error) {
        res.status(404).json(
            {
                message : error.message
            }
        )
    }
}

module.exports = {create, findAllByIdEmisorAndIdReceptor}