const eventoRepository = require('../repository/eventoRepository')

const create = async (titulo, descripcion, tipo, estado, id_organizacion, fecha_inicio, fecha_final, limite_participantes = null, tipo_organizacion_permitida = 'TODAS', region_permitida = 'TODAS', modalidad = 'PRESENCIAL', sector_permitido = 'TODOS', giro_permitido = 'TODOS', hora_inicio = '09:00', hora_final = '18:00') => {
    const evento = await eventoRepository.create(titulo, descripcion, tipo, estado, id_organizacion, fecha_inicio, fecha_final, limite_participantes, tipo_organizacion_permitida, region_permitida, modalidad, sector_permitido, giro_permitido, hora_inicio, hora_final)
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

const updateById = async (id, titulo, descripcion, tipo, fecha_inicio, fecha_final, limite_participantes = null, tipo_organizacion_permitida = 'TODAS', region_permitida = 'TODAS', modalidad = 'PRESENCIAL', sector_permitido = 'TODOS', giro_permitido = 'TODOS', hora_inicio = '09:00', hora_final = '18:00') => {
    const evento = await eventoRepository.updateById(id, titulo, descripcion, tipo, fecha_inicio, fecha_final, limite_participantes, tipo_organizacion_permitida, region_permitida, modalidad, sector_permitido, giro_permitido, hora_inicio, hora_final)
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

const findAllByIdOrganizacion = async (id_organizacion) => {
    const eventos = await eventoRepository.findAllByIdOrganizacion(id_organizacion)
    return eventos
}

const dashEventosPorAño = async () => {
    const dash = await eventoRepository.dashEventosPorAño()
    return dash
}

module.exports = {dashEventosPorAño, create, findById, findAll, updateById, deleteById, countEventos, findAllByEstado, findAllEventos, findEventosByIdUsuario, findAllByIdOrganizacion}