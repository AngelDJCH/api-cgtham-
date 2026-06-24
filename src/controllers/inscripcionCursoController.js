const inscripcionCursoService = require('../services/inscripcionCursoService')

const create = async (req, res, next) => {
    try {
        const {id_curso, id_organizacion} = req.body
        const inscripcionCurso = await inscripcionCursoService.create(id_curso, id_organizacion)
        res.status(201).json(inscripcionCurso)
    } catch (error) {
        next(error)
    }
}

const organizacionesParticipantes = async (req, res,next) => {
    try {
        const id = req.params.id
        const organizaciones = await inscripcionCursoService.organizacioneParticipantes(id)
        res.status(200).json(organizaciones)
    } catch (error) {
        next(error)
    }
}

const organizacionesPendientes = async (req, res,next) => {
    try {
        const id = req.params.id
        const organizaciones = await inscripcionCursoService.organizacionesPendientes(id)
        res.status(200).json(organizaciones)
    } catch (error) {
        next(error)
    }
}

const updateEstadoById = async (req, res,next) => {
    try {
        const id = req.params.id
        const {estado} = req.body
        const inscripcionCurso = await inscripcionCursoService.updateEstadoById(id,estado)
        res.status(200).json(inscripcionCurso)
    } catch (error) {
        next(error)
    }
}

module.exports = {create,organizacionesParticipantes,organizacionesPendientes,updateEstadoById}