const express = require('express')
const isncripcionCursoRoutes = express.Router()
const inscripcionCursoController = require('../controllers/inscripcionCursoController')

isncripcionCursoRoutes.post('/', inscripcionCursoController.create)
isncripcionCursoRoutes.get('/participantes/:id', inscripcionCursoController.organizacionesParticipantes)
isncripcionCursoRoutes.get('/pendientes/:id', inscripcionCursoController.organizacionesPendientes)
isncripcionCursoRoutes.put('/:id', inscripcionCursoController.updateEstadoById)

module.exports = isncripcionCursoRoutes