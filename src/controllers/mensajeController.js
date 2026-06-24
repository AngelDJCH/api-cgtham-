const mensajeService = require('../services/mensajeService')

const create = async (req, res,next) => {
    try {
        const {contenido, id_emisor, id_receptor, id_chat} = req.body;
        const mensaje = await mensajeService.create(contenido, id_emisor, id_receptor, id_chat)
        res.status(201).json(mensaje.toJSON())
    } catch (error) {
        next(error)
    }
}

const findAllByIdChat = async (req, res,next) => {
    try {
        const {id} = req.body
        const mensajes = await mensajeService.findAllByIdChat(id)
        res.status(200).json(
            mensajes.map(
                mensaje => mensaje.toJSON()
            )
        )
    } catch (error) {
        next(error)
    }
}

module.exports = {create, findAllByIdChat}