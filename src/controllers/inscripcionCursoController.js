const inscripcionCursoService = require('../services/inscripcionCursoService')

const create = async (req, res) => {
    try {
        const {estado, id_curso, id_organizacion} = req.body
        const inscripcionCurso = await inscripcionCursoService.create(estado, id_curso, id_organizacion)
        res.status(201).json(inscripcionCurso)
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
}

module.exports = {create}