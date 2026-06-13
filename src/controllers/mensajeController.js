const mensajeService = require('../services/mensajeService')

const create = async (req, res) => {
    try {
        const {contenido, id_emisor, id_receptor, id_chat} = req.body;
        const mensaje = await mensajeService.create(contenido, id_emisor, id_receptor, id_chat)
        res.status(201).json(mensaje.toJSON())
    } catch (error) {
        res.status(400).json(
            {
                message : error.message
            }
        )
    }
}

const findAllByIdChat = async (req, res) => {
    try {
        const {id} = req.body
        const mensajes = await mensajeService.findAllByIdChat(id)
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

module.exports = {create, findAllByIdChat}