const chatService = require('../services/chatService')

const create = async (req, res, next) => {
    try {
        const { organizacion1, organizacion2 } = req.body
        const chat = await chatService.create(organizacion1, organizacion2)
        res.status(201).json(chat)
    } catch (error) {
        next(error)
    }
}

const findOrganizacionChat = async (req, res, next) => {
    try {
        const { id_emisor, id_receptor } = req.body
        const chat = await chatService.findOrganizacionChat(id_emisor, id_receptor)
        res.status(200).json({ chat: chat })
    } catch (error) {
        next(error)
    }
}

module.exports = { create, findOrganizacionChat }