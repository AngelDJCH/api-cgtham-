const inscripcionController = require('../controllers/inscripcionEventoController')
const express = require('express')
const inscripcionEventoRoutes = express.Router()
const { validateCreate, validateDeleteById, validateFindByIdAndEstado, validateUpdateEstadoById, validateFindOrganizacionesParticipantesByIdInscripcion, validateFindParticipantesPendientesByIdInscripcion, validateFindAllByIdOrganizacion } = require('../validator/inscripcionEventoValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')


// inscripcionRoutes.get('/evento/:id', inscripcionController.findInscripcionesByIdEvento)
inscripcionEventoRoutes.get('/participantes/:id_evento', validateFindOrganizacionesParticipantesByIdInscripcion, inscripcionController.findOrganizacionesParticipantesByIdInscripcion)
inscripcionEventoRoutes.get('/pendientes/:id_evento', auth, validateFindParticipantesPendientesByIdInscripcion, inscripcionController.findParticipantesPendientesByIdInscripcion)

// inscripcionRoutes.get('/estado/:id',auth, verifyRoles('USER'), validateFindByIdAndEstado,inscripcionController.findByIdAndEstado)
inscripcionEventoRoutes.get('/organizaciones/:id_organizacion', auth, validateFindAllByIdOrganizacion, inscripcionController.findAllByIdOrganizacion)
inscripcionEventoRoutes.post('/', auth, verifyRoles('ADMIN_ORG'), validateCreate, inscripcionController.create)
inscripcionEventoRoutes.put('/estado/:id', auth, verifyRoles('ADMIN_ORG'), validateUpdateEstadoById, inscripcionController.updateEstadoById)
inscripcionEventoRoutes.delete('/:id', auth, validateDeleteById, inscripcionController.deleteById)
// inscripcionEventoRoutes.get('/usuario/:id_usuario', auth, inscripcionController.findAllByIdUsuario)

module.exports = inscripcionEventoRoutes