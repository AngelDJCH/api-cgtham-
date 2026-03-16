const mensajeRepository = require('../repository/mensajeRepository')

const create = async (contenido, id_emisor, id_receptor) => {
    const mensaje = await mensajeRepository.create(contenido, id_emisor, id_receptor)
    return mensaje;
}

const findAllByIdEmisorAndIdReceptor = async (id_emisor, id_receptor) => {
    const mensajes = await mensajeRepository.findAllByIdEmisorAndIdReceptor(id_emisor, id_receptor)
    return mensajes;
}

module.exports = {create, findAllByIdEmisorAndIdReceptor}