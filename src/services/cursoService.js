const cursoRepository = require('../repository/cursoRepository')

const create = async (titulo, descripcion, fecha_inicio, fecha_final, estado,  id_organizacion) => {
    const curso = await cursoRepository.create(titulo, descripcion, fecha_inicio, fecha_final, estado,  id_organizacion)
    return curso
}

const findAllToEmpresas = async () => {
    const cursos = await cursoRepository.findAllToEmpresas()
    return cursos
}

const findAllToEscuelas = async (id_organizacion) => {
    const cursos = await cursoRepository.findAllToEscuelas(id_organizacion)
    return cursos
}

const findById = async (id_curso) => {
    const curso = await cursoRepository.findById(id_curso)
    return curso
}

const updateById = async (titulo, descripcion, fecha_inicio, fecha_final, id_curso) => {
    const curso = await cursoRepository.updateById(titulo, descripcion, fecha_inicio, fecha_final, id_curso)
    return curso
}

const updateEstadoById = async (estado, id_curso) => {
    const curso = await cursoRepository.updateEstadoById(estado, id_curso)
    return curso
}

const solicitar = async (titulo, descripcion, estado, id_organizacion) => {
    const curso = await cursoRepository.solicitar(titulo, descripcion, estado, id_organizacion)
    return curso
}

const solicitudes = async (id_organizacion) => {
    const cursos = await cursoRepository.solicitudes(id_organizacion)
    return cursos
}

const updateByIdForPeticion = async (titulo, descripcion, fecha_inicio, fecha_final, id_curso) => {
    const curso = await cursoRepository.updateByIdForPeticion(titulo, descripcion, fecha_inicio, fecha_final, id_curso)
    return curso
}

module.exports = {create, findAllToEmpresas, findAllToEscuelas, findById, updateById, updateEstadoById, solicitar, solicitudes, updateByIdForPeticion}