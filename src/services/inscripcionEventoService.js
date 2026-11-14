const inscripcionRepository = require('../repository/inscripcionEventoRepository')
const eventoRepository = require('../repository/eventoRepository')
const pool = require('../config/postgres')
const CustomError = require('../midlewares/customError')

const create = async (estado, fecha, id_evento, id_organizacion) => {
    const existeInscripcion = await inscripcionRepository.existeInscripcion(id_evento,id_organizacion)
    if(existeInscripcion){
        throw new CustomError('YA EXISTE LA INSCRIPCION', 409)
    }
    const evento = await eventoRepository.findById(id_evento)
    if (evento) {
        // Validación de cupo máximo
        if (evento.limite_participantes !== null && evento.limite_participantes > 0) {
            const participantes = await inscripcionRepository.findOrganizacionesParticipantesByIdInscripcion(id_evento)
            if (participantes && participantes.length >= evento.limite_participantes) {
                throw new CustomError('EL EVENTO HA ALCANZADO EL CUPO MÁXIMO DE PARTICIPANTES', 400)
            }
        }
        // Validación jerárquica de perfil / tipo de organización, sector y giro permitidos
        const orgRes = await pool.query('SELECT tipo, sector, giro FROM organizaciones WHERE id = $1', [id_organizacion])
        if (orgRes.rowCount > 0) {
            const org = orgRes.rows[0]
            if (evento.tipo_organizacion_permitida && evento.tipo_organizacion_permitida !== 'TODAS') {
                if (org.tipo !== evento.tipo_organizacion_permitida) {
                    throw new CustomError(`Este evento está reservado exclusivamente para instituciones de tipo "${evento.tipo_organizacion_permitida}"`, 403)
                }
            }
            if (evento.sector_permitido && evento.sector_permitido !== 'TODOS') {
                if (org.sector !== evento.sector_permitido) {
                    throw new CustomError(`Este evento está reservado para el sector "${evento.sector_permitido}"`, 403)
                }
            }
            if (evento.giro_permitido && evento.giro_permitido !== 'TODOS') {
                if (org.giro !== evento.giro_permitido) {
                    throw new CustomError(`Este evento está reservado para el giro "${evento.giro_permitido}"`, 403)
                }
            }
        }
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

const findAllByIdOrganizacion = async (id_organizacion, limit, offset) => {
    const inscripciones = await inscripcionRepository.findAllByIdOrganizacion(id_organizacion, limit, offset)
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