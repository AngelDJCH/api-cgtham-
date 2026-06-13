const inscripcionCursoRepository = require('../repository/inscripcionCursoRepository')
const CustomError = require('../midlewares/customError')

const create = async (id_curso, id_organizacion) => {
    const existeInscripcion = await inscripcionCursoRepository.existeInscripcionByIdCursoAndOrganizacion(id_curso, id_organizacion)
    if(existeInscripcion){
        throw new CustomError('INSCRIPCION YA REALIZADA', 409)
    }
    const inscripcionCurso = await inscripcionCursoRepository.create(id_curso, id_organizacion)
    return inscripcionCurso
}

const updateEstadoById = async (id, estado) => {
    const inscripcionCurso = await inscripcionCursoRepository.updateEstadoById(id, estado)
    return inscripcionCurso
}

const organizacioneParticipantes = async (id_curso) => {
    const organizaciones = await inscripcionCursoRepository.organizacioneParticipantes(id_curso)
    return organizaciones
}

const organizacionesPendientes = async (id_curso) => {
    const organizaciones =  await inscripcionCursoRepository.organizacionesPendientes(id_curso)
    return organizaciones
}

module.exports = {create, organizacioneParticipantes,organizacionesPendientes,updateEstadoById}