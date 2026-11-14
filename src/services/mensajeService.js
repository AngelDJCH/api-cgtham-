const mensajeRepository = require('../repository/mensajeRepository')

const create = async (contenido, id_emisor, id_receptor, id_chat) => {
    const mensaje = await mensajeRepository.create(contenido, id_emisor, id_receptor, id_chat)
    return mensaje;
}

const findAllByIdChat = async (id) => {
    const mensajes = await mensajeRepository.findAllByIdChat(id)
    return mensajes;
}

const findUltimosMensajesPorOrganizacion = async (id_organizacion) => {
    const mensajes = await mensajeRepository.findUltimosMensajesPorOrganizacion(id_organizacion)
    return mensajes;
}

module.exports = {create, findAllByIdChat, findUltimosMensajesPorOrganizacion}