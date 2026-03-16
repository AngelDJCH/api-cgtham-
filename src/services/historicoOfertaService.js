const historicoOfertaRepository = require('../repository/historicoOfertaRepository')

const create = async (fecha, accion, id_oferta, id_usuario) => {
    const historicoOferta = await historicoOfertaRepository.create(fecha, accion, id_oferta, id_usuario)
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

module.exports = {create, findById, findByIdOferta}