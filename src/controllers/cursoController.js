const cursoService = require('../services/cursoService')

const create = async (req, res, next) => {
    try {
        const { titulo, descripcion, fecha_inicio, fecha_final, estado, id_organizacion } = req.body
        const curso = await cursoService.create(titulo, descripcion, fecha_inicio, fecha_final, estado, id_organizacion)
        res.status(201).json(
            curso.toJSON()
        )
    } catch (error) {
        next(error)
    }
}

const findAllToEmpresas = async (req, res, next) => {
    try {
        const cursos = await cursoService.findAllToEmpresas()
        res.status(200).json(cursos)
    } catch (error) {
        next(error)
    }
}

const findAllToEscuelas = async (req, res, next) => {
    try {
        const id_organizacion = req.params.id_organizacion
        const cursos = await cursoService.findAllToEscuelas(id_organizacion)
        res.status(200).json(cursos)
    } catch (error) {
        next(error)
    }
}

const findById = async (req, res, next) => {
    try {
        const id_curso = req.params.id_curso
        const curso = await cursoService.findById(id_curso)
        res.status(200).json(curso)
    } catch (error) {
        next(error)
    }
}

const updateById = async (req, res, next) => {
    try {
        const id_curso = req.params.id_curso
        const { titulo, descripcion, inicio, final } = req.body
        const curso = await cursoService.updateById(titulo, descripcion, inicio, final, id_curso)
        res.status(200).json(curso)
    } catch (error) {
        next(error)
    }
}

const updateEstadoById = async (req, res, next) => {
    try {
        const id_curso = req.params.id_curso
        const curso = await cursoService.updateEstadoById('ELIMINADO', id_curso)
        res.status(200).json(curso)
    } catch (error) {
        next(error)
    }
}

const solicitar = async (req, res, next) => {
    try {
        const { titulo, descripcion, estado, id_organizacion } = req.body
        const curso = await cursoService.solicitar(titulo, descripcion, estado, id_organizacion)
        res.status(201).json(curso)
    } catch (error) {
        next(error)
    }
}

const solicitudes = async (req, res, next) => {
    try {
        const id_organizacion = req.params.id_organizacion
        const cursos = await cursoService.solicitudes(id_organizacion)
        res.status(200).json(cursos)
    } catch (error) {
        next(error)
    }
}

const updateByIdForPeticion = async (req, res, next) => {
    try {
        const id_curso = req.params.id_curso
        const { titulo, descripcion, fecha_inicio, fecha_final } = req.body
        const curso = await cursoService.updateByIdForPeticion(titulo, descripcion, fecha_inicio, fecha_final, id_curso)
        res.status(200).json(curso)
    } catch (error) {
        next(error)
    }
}

module.exports = { create, findAllToEmpresas, findAllToEscuelas, findById, updateById, updateEstadoById, solicitar, solicitudes, updateByIdForPeticion }