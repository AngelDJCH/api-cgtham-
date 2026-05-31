const inscripcionController = require('../controllers/inscripcionController')
const express = require('express')
const inscripcionRoutes = express.Router()
const {validateCreate, validateDeleteById, validateFindByIdAndEstado, validateUpdateEstadoById} = require('../validator/inscripcionValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')


// inscripcionRoutes.get('/evento/:id', inscripcionController.findInscripcionesByIdEvento)
inscripcionRoutes.get('/participantes/:id_evento', auth, inscripcionController.findOrganizacionesParticipantesByIdInscripcion)
inscripcionRoutes.get('/pendientes/:id_evento', auth, inscripcionController.findParticipantesPendientesByIdInscripcion)

// inscripcionRoutes.get('/estado/:id',auth, verifyRoles('USER'), validateFindByIdAndEstado,inscripcionController.findByIdAndEstado)
inscripcionRoutes.get('/organizaciones/:id_organizacion', auth, inscripcionController.findAllByIdOrganizacion)
inscripcionRoutes.post('/',auth, verifyRoles('ADMIN_ORG'), validateCreate,inscripcionController.create)
inscripcionRoutes.put('/estado/:id',auth, verifyRoles('ADMIN_ORG', 'ADMIN_SYS'), validateUpdateEstadoById,inscripcionController.updateEstadoById)
inscripcionRoutes.delete('/:id',auth, validateDeleteById,inscripcionController.deleteById)
inscripcionRoutes.get('/usuario/:id_usuario', auth,inscripcionController.findAllByIdUsuario)

module.exports = inscripcionRoutes