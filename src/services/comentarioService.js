const comentarioRepository = require('../repository/comentarioRepository')

const create = async (contenido, estado, id_usuario) => {
    const comentario = await comentarioRepository.create(contenido, estado, id_usuario)
    return comentario;
}

const findById = async (id) => {
    const comentario = await comentarioRepository.findById(id)
    return comentario;
}

const findAllByIdUsuario = async (id_organizacion) => {
    const comentarios = await comentarioRepository.findAllByIdUsuario(id_organizacion)
    return comentarios;
}

const findAll = async (estado, limite) => {
    const comentarios = await comentarioRepository.findAll(estado, limite)
    return comentarios;
}

const updateContenidoById = async (id, contenido) => {
    const comentario = await comentarioRepository.updateContenidoById(id, contenido)
    return comentario;
}

const updateEstadoById = async (id, estado, id_administrador) => {
    const comentario = await comentarioRepository.updateEstadoById(id, estado, id_administrador)
    return comentario;
}

const deleteById = async (id) => {
    if (!id) throw new Error('ID invalido')
    const comentario = await comentarioRepository.deleteById(id)
    return comentario;
}

const findAllComentariosByAdministrador = async () => {
    const comentarios = await comentarioRepository.findAllComentariosByAdministrador()
    return comentarios
}

const findAllComentarios = async () => {
    const comentarios = await comentarioRepository.findAllComentarios()
    return comentarios
}

module.exports = { create, findById, findAll, findAllByIdUsuario, updateContenidoById, updateEstadoById, deleteById, findAllComentariosByAdministrador, findAllComentarios}