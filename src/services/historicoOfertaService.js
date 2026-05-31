const historicoOfertaRepository = require('../repository/historicoOfertaRepository')

const create = async (accion, id_oferta, id_usuario) => {
    const historicoOferta = await historicoOfertaRepository.create( accion, id_oferta, id_usuario)
    return historicoOferta;
}

const findById = async (id) => {
    const historicoOferta = await historicoOfertaRepository.findById(id)
    return historicoOferta;
}

const findByIdOferta = async (id_oferta) => {
    const historicoOferta = await historicoOfertaRepository.findByIdOferta(id_oferta)
    return historicoOferta;
}

const countHistoricosOfertas = async () => {
    const historicosOfertas = await historicoOfertaRepository.countHistoricosOfertas()
    return historicosOfertas
}

const findAllHistoricos = async () => {
    const historicosOfertas = await historicoOfertaRepository.findAllHistoricos()
    return historicosOfertas
}

module.exports = { create, findById, findByIdOferta, countHistoricosOfertas, findAllHistoricos }