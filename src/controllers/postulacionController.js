const postulacionService = require('../services/postulacionService')

const create = async (req, res) => {
    try {
        const { stado, fecha_postulacion, id_oferta_laboral, id_usuario } = req.body
        const postulacion = await postulacionService.create(stado, fecha_postulacion, id_oferta_laboral, id_usuario)
        res.status(201).json(postulacion.toJSON())
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const findByIdUsuario = async (req, res) => {
    try {
        const id_usuario = req.params.id
        const postulaciones = await postulacionService.findByIdUsuario(id_usuario)
        res.status(200).json(postulaciones.map(postulcion => postulcion.toJSON()))
    } catch (error) {
        res.status(404).json(
            {
                message: error.message
            }
        )
    }
}

const findByIdOfertaLaboral = async (req, res) => {
    try {
        const id_oferta_laboral = req.params.id
        const postulaciones = await postulacionService.findByIdOfertaLaboral(id_oferta_laboral)
        res.status(200).json(postulaciones.map(postulcion => postulcion.toJSON()))
    } catch (error) {
        res.status(404).json(
            {
                message: error.message
            }
        )
    }
}

const updateEstadoById = async (req, res) => {
    try {
        const id = req.params.id
        const { estado, fecha_aprobacion } = req.body
        const postulacion = await postulacionService.updateEstadoById(id, estado, fecha_aprobacion)
        res.status(200).json(postulacion.toJSON())
    } catch (error) {
        res.status(404).json(
            {
                message: error.message
            }
        )
    }
}

const deleteById = async (req, res) => {
    try {
        const id = req.params.id
        const postulacion = await postulacionService.deleteById(id)
        res.status(204)
    } catch (error) {
        res.status(404).json(
            {
                message: error.message
            }
        )
    }
}

const experienciaByIdUsuario = async (req, res) => {
    try {
        const id_usuario = req.params.id_usuario
        const experiencias = await postulacionService.experienciaByIdUsuario(id_usuario)
        res.status(200).json(experiencias)
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}


module.exports = { create, findByIdUsuario, findByIdOfertaLaboral, updateEstadoById, deleteById, experienciaByIdUsuario }