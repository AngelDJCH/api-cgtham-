const express = require('express')
const isncripcionCursoRoutes = express.Router()
const inscripcionCursoController = require('../controllers/inscripcionCursoController')
const auth = require('../midlewares/auth')

const { valiteCreate, validateFindParticipantesById, validateFindPendientesById, validateUpdateEstadoById } = require('../validator/inscripcionCursoValidator')

isncripcionCursoRoutes.post('/', auth, valiteCreate, inscripcionCursoController.create)
isncripcionCursoRoutes.get('/participantes/:id', auth, validateFindParticipantesById, inscripcionCursoController.organizacionesParticipantes)
isncripcionCursoRoutes.get('/pendientes/:id', auth, validateFindPendientesById, inscripcionCursoController.organizacionesPendientes)
isncripcionCursoRoutes.put('/:id', auth, validateUpdateEstadoById, inscripcionCursoController.updateEstadoById)

module.exports = isncripcionCursoRoutes