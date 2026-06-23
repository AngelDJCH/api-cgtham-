const inscripcionRepository = require('../repository/inscripcionEventoRepository')
const CustomError = require('../midlewares/customError')

const create = async (estado, fecha, id_evento, id_organizacion) => {
    const existeInscripcion = await inscripcionRepository.existeInscripcion(id_evento,id_organizacion)
    if(existeInscripcion){
        throw new CustomError('YA EXISTE LA INSCRIPCION', 409)
    }
    const inscripcion = await inscripcionRepository.create(estado, fecha, id_evento, id_organizacion)
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

// const findByIdUsuario =  async (id_usuario) => {
//     const inscripciones = await inscripcionRepository.findByIdUsuario(id_usuario)
//     return inscripciones
// }

const findAllByIdOrganizacion = async (id_organizacion) => {
    const inscripciones = await inscripcionRepository.findAllByIdOrganizacion(id_organizacion)
    return inscripciones
}

const findOrganizacionesParticipantesByIdInscripcion = async (id_evento) => {
    const participantes = await inscripcionRepository.findOrganizacionesParticipantesByIdInscripcion(id_evento)
    return participantes
}

const findInscripcionesByIdEvento = async (id_evento) => {
    const inscripciones = await inscripcionRepository.findInscripcionesByIdEvento(id_evento)
    return inscripciones
}

const findOrganizacionesEventoInscripciones = async (id_evento) => {
    const inscripciones = await inscripcionRepository.findOrganizacionesEventoInscripciones(id_evento)
    return inscripciones
}

const findParticipantesPendientesByIdInscripcion = async (id_evento) => {
    const inscripciones = await inscripcionRepository.findParticipantesPendientesByIdInscripcion(id_evento)
    return inscripciones
}

//findByIdUsuario
module.exports = {findParticipantesPendientesByIdInscripcion, create, findByIdAndEstado, updateEstadoById, deleteById, findAllByIdOrganizacion, findOrganizacionesParticipantesByIdInscripcion,findInscripcionesByIdEvento}