const postulacionRepository = require('../repository/postulacionRepository')

const create = async (estado, fecha_postulacion, id_oferta_laboral, id_usuario) => {
    const postulacion = await postulacionRepository.create(estado, fecha_postulacion, id_oferta_laboral, id_usuario)
    return postulacion;
}

const findByIdUsuario = async (id_usuario) => {
    const postulacion = await postulacionRepository.findByIdUsuario(id_usuario)
    return postulacion;
}

const findByIdOfertaLaboral = async (id_oferta_laboral) => {
    const postulacion = await postulacionRepository.findByIdOfertaLaboral(id_oferta_laboral)
    return postulacion;
}

const updateEstadoById = async (id, estado, fecha_aprobacion) => {
    const postulacion = await postulacionRepository.updateEstadoById(id, estado,fecha_aprobacion)
    return postulacion;
}

const deleteById = async (id) => {
    const postulacion = await postulacionRepository.deleteById(id)
    return postulacion
}

const experienciaByIdUsuario = async (id_usuario) => {
    const experiencias = await postulacionRepository.experienciaByIdUsuario(id_usuario)
    return experiencias
}

module.exports = { create, findByIdUsuario, findByIdOfertaLaboral, updateEstadoById, deleteById, experienciaByIdUsuario }