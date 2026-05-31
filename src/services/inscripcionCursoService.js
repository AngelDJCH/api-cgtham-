const inscripcionCursoRepository = require('../repository/inscripcionCursoRepository')

const create = async (estado, id_curso, id_organizacion) => {
    const inscripcionCurso = await inscripcionCursoRepository.create(estado, id_curso, id_organizacion)
    return inscripcionCurso
}

const updateEstadoById = async (id, estado) => {
    
}

module.exports = {create}