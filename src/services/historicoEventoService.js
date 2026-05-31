const historicoEventoRepository = require('../repository/historicoEventoRepository')

const create = async (accion, id_evento, id_usuario) => {
    const historicoEvento = await historicoEventoRepository.create(accion, id_evento, id_usuario)
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

const countHistoricosEventos = async () => {
    const historicosEventos = await historicoEventoRepository.countHistoricosEventos()
    return historicosEventos
}

const findAll = async () => {
    const historicos = await historicoEventoRepository.findAllHistoricos()
    return historicos
}

module.exports = { create, findByIdEvento, findById, countHistoricosEventos, findAll }