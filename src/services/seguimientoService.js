const seguimientoRepository = require('../repository/seguimientoRepository')

const create = async (fecha, id_seguido, id_seguidor) => {
    const seguimiento = await seguimientoRepository.create(fecha, id_seguido, id_seguidor)
    return seguimiento;
}

const findAllSeguidosById = async (id_seguidor) => {
    const seguidos = await seguimientoRepository.findAllSeguidosById(id_seguidor)
    return seguidos;
}

const findAllSeguidoresById = async (id_seguido) => {
    const seguidores = await seguimientoRepository.findAllSeguidoresById(id_seguido)
    return seguidores;
}

const deleteSeguidorOrSeguido = async (id_seguido, id_seguidor) => {
    const eliminado = await seguimientoRepository.deleteSeguidorOrSeguido(id_seguido, id_seguidor)
    return eliminado;
}

module.exports = {create, findAllSeguidoresById, findAllSeguidosById, deleteSeguidorOrSeguido}