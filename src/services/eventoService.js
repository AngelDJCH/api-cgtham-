const eventoRepository = require('../repository/eventoRepository')

const create = async (titulo, descripcion, tipo, estado, id_organizacion, fecha_inicio, fecha_final, fecha_publicacion) => {
    const evento = await eventoRepository.create(titulo, descripcion, tipo, estado, id_organizacion, fecha_inicio, fecha_final, fecha_publicacion)
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

const countEventos = async () => {
    const count_eventos = await eventoRepository.countEventos()
    return count_eventos
}

const findAllByEstado = async (estado, limite) => {
    const eventos = await eventoRepository.findAllByEstado(estado, limite)
    return eventos
}

const findAllEventos =  async (limit, offset) => {
    const eventos = await eventoRepository.findAllEventos(limit, offset)
    return eventos
}

const findEventosByIdUsuario = async (id_usuario) => {
    const eventos = await eventoRepository.findEventosByIdUsuario(id_usuario)
    return eventos
}

module.exports = { create, findById, findAll, updateById, deleteById, countEventos, findAllByEstado, findAllEventos, findEventosByIdUsuario}