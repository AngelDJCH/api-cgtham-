const inscripcionRepository = require('../repository/inscripcionRepository')

const create = async (estado, fecha, id_evento, id_usuario) => {
    const inscripcion = await inscripcionRepository.create(estado, fecha, id_evento, id_usuario)
    return inscripcion;
}

const findByIdAndEstado = async (id, estado) => {
    const inscripcion = await inscripcionRepository.findByIdAndEstado(id, estado)
    return inscripcion;
}

const updateEstadoById = async (id, estado) => {
    const inscripcion = await inscripcionRepository.updateEstadoById(id, estado)
    return inscripcion;
}

const deleteById = async (id) => {
    const inscripcion = await inscripcionRepository.deleteById(id)
    return inscripcion;
}

const findByIdUsuario =  async (id_usuario) => {
    
}

const findAllByIdOrganizacion = async (id_organizacion) => {
    const inscripciones = await inscripcionRepository.findAllByIdOrganizacion(id_organizacion)
    return inscripciones
}

module.exports = { create, findByIdAndEstado, updateEstadoById, deleteById, findAllByIdOrganizacion }