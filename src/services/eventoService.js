const eventoRepository = require('../repository/eventoRepository')

const create = async (titulo, descripcion, tipo, id_organizacion, fecha_inicio, fecha_final, fecha_publicacion) => {
    const evento = await eventoRepository.create(titulo, descripcion, tipo, id_organizacion, fecha_inicio, fecha_final, fecha_publicacion)
    return evento;
}

const findById = async (id) => {
    const evento = await eventoRepository.findById(id)
    return evento;
}

const findAll = async () => {
    const eventos = await eventoRepository.findAll()
    return eventos;
}

const updateById = async (id, titulo, descripcion, tipo, fecha_inicio, fecha_final) => {
    const evento = await eventoRepository.updateById(id, titulo, descripcion, tipo, fecha_inicio, fecha_final)
    return evento;
}

const deleteById = async (id) => {
    const evento = await eventoRepository.deleteById(id)
    return evento;
}

module.exports = { create, findById, findAll, updateById, deleteById }