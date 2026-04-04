const comentarioService = require('../services/comentarioService')

const create = async (req, res) => {
    try {
        const { contenido, estado, id_administrador, id_usuario, fecha } = req.body
        const comentario = await comentarioService.create(contenido, estado, id_administrador, id_usuario, fecha)
        res.status(201).json(comentario.toJSON())
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const findById = async (req, res) => {
    try {
        const id = req.params.id
        const comentario = await comentarioService.findById(id)
        res.status(200).json(comentario.toJSON())
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const findAllByIdUsuario = async (req, res) => {
    try {
        const id_usuario = req.params.id
        const comentarios = await comentarioService.findAllByIdUsuario(id_usuario)
        res.status(200).json(comentarios.map(comentario=>comentario.toJSON()))
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const findAll = async (req, res) => {
    try {
        const estado = req.params.estado
        const limite = req.params.limite
        const comentarios = await comentarioService.findAll(estado, limite)
        res.status(200).json(comentarios.map(comentario=>comentario.toJSON()))
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const updateContenidoById = async (req, res) => {
    try {
        const id = req.params.id
        const {contenido} = req.body
        const comentario = await comentarioService.updateContenidoById(id, contenido)
        res.status(200).json(comentario.toJSON())
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const updateEstadoById = async (req, res) => {
    try {
        const id = req.params.id
        const {estado, id_administrador} = req.body
        const comentario = await comentarioService.updateEstadoById(id, estado, id_administrador)
        res.status(200).json(comentario.toJSON())
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const deleteById = async (req, res) => {
    try {
        const id = req.params.id
        const comentario = await comentarioService.deleteById(id)
        res.status(200).json(comentario.toJSON())
        res.status(204)
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const findAllComentariosByAdministrador = async (req, res) => {
    try {
        const comentarios = await comentarioService.findAllComentariosByAdministrador()
        res.status(200).json(comentarios)
    } catch (error) {
        res.status(400).json(
            {
                message : error.message
            }
        )
    }
}

const findAllComentarios = async (req, res) => {
    try {
        const comentarios = await comentarioService.findAllComentarios()
        res.status(200).json(comentarios)
    } catch (error) {
        res.status(400).json(
            {
                message : error.message
            }
        )
    }
}

module.exports = {create, findById, findAllByIdUsuario, findAll, updateContenidoById, updateEstadoById, deleteById,findAllComentarios, findAllComentariosByAdministrador}