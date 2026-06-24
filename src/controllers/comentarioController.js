const comentarioService = require('../services/comentarioService')

const create = async (req, res, next) => {
    try {
        const { contenido, estado, id_usuario } = req.body
        const comentario = await comentarioService.create(contenido, estado, id_usuario)
        res.status(201).json(comentario.toJSON())
    } catch (error) {
        next(error)
    }
}

const findById = async (req, res, next) => {
    try {
        const id = req.params.id
        const comentario = await comentarioService.findById(id)
        res.status(200).json(comentario.toJSON())
    } catch (error) {
        next(error)
    }
}

const findAllByIdUsuario = async (req, res, next) => {
    try {
        const id_organizacion = req.params.id_organizacion
        const comentarios = await comentarioService.findAllByIdUsuario(id_organizacion)
        res.status(200).json(comentarios.map(comentario => comentario.toJSON()))
    } catch (error) {
        next(error)
    }
}

const findAll = async (req, res, next) => {
    try {
        const estado = req.params.estado
        const limite = req.params.limite
        const comentarios = await comentarioService.findAll(estado, limite)
        res.status(200).json(comentarios.map(comentario => comentario.toJSON()))
    } catch (error) {
        next(error)
    }
}

const updateContenidoById = async (req, res, next) => {
    try {
        const id = req.params.id
        const { contenido } = req.body
        const comentario = await comentarioService.updateContenidoById(id, contenido)
        res.status(200).json(comentario.toJSON())
    } catch (error) {
        next(error)
    }
}

const updateEstadoById = async (req, res, next) => {
    try {
        const id = req.params.id
        const { estado, id_administrador } = req.body
        const comentario = await comentarioService.updateEstadoById(id, estado, id_administrador)
        res.status(200).json(comentario.toJSON())
    } catch (error) {
        next(error)
    }
}

const deleteById = async (req, res, next) => {
    try {
        const id = req.params.id
        const comentario = await comentarioService.deleteById(id)
        res.status(204).json(comentario.toJSON())
    } catch (error) {
        next(error)
    }
}

const findAllComentariosByAdministrador = async (req, res, next) => {
    try {
        const comentarios = await comentarioService.findAllComentariosByAdministrador()
        res.status(200).json(comentarios)
    } catch (error) {
        next(error)
    }
}

const findAllComentarios = async (req, res, next) => {
    try {
        const comentarios = await comentarioService.findAllComentarios()
        res.status(200).json(comentarios)
    } catch (error) {
        next(error)
    }
}

module.exports = { create, findById, findAllByIdUsuario, findAll, updateContenidoById, updateEstadoById, deleteById, findAllComentarios, findAllComentariosByAdministrador }