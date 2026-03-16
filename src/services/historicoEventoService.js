const historicoEventoRepository = require('../repository/historicoEventoRepository')

const create = async (fecha, accion, id_evento, id_usuario) => {
    const historicoEvento = await historicoEventoRepository.create(fecha, accion, id_evento, id_usuario)
    return historicoEvento;
}

const findByIdEvento = async (id_evento) => {
    const historicoEvento = await historicoEventoRepository.findByIdEvento(id_evento)
    return historicoEvento;
}

const findById = async (id) => {
    const historicoEvento = await historicoEventoRepository.findById(id)
    return historicoEvento;
}

module.exports = {create, findByIdEvento, findById}