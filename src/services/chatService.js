const chatRepository = require('../repository/chatRepository')

const create = async (organizacion1, organizacion2) => {
    const chat = await chatRepository.create(organizacion1, organizacion2)
    return chat
}

const findOrganizacionChat = async (id_emisor, id_receptor) => {
    const chat = await chatRepository.findOrganizacionChat(id_emisor, id_receptor)
    return chat
}

module.exports = {create, findOrganizacionChat}