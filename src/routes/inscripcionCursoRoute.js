const express = require('express')
const isncripcionCursoRoutes = express.Router()
const inscripcionCursoController = require('../controllers/inscripcionCursoController')
const auth = require('../midlewares/auth')

isncripcionCursoRoutes.post('/', auth, inscripcionCursoController.create)
isncripcionCursoRoutes.get('/participantes/:id', auth, inscripcionCursoController.organizacionesParticipantes)
isncripcionCursoRoutes.get('/pendientes/:id', auth, inscripcionCursoController.organizacionesPendientes)
isncripcionCursoRoutes.put('/:id',auth, inscripcionCursoController.updateEstadoById)

module.exports = isncripcionCursoRoutes