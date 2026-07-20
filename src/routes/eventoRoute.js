const eventoController = require('../controllers/eventoController')
const express = require('express')
const eventoRoutes = express.Router()
const { validateCreate, validateDeleteById, validateFindById, validateUpdateById, validateFindByIdOrganizacion } = require('../validator/eventoValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

eventoRoutes.get('/dash', auth, verifyRoles('ADMIN_SYS'), eventoController.dashEventosPorAño)
eventoRoutes.get('/organizacion/:id_organizacion', auth, validateFindByIdOrganizacion, eventoController.findAllByIdOrganizacion)
// eventoRoutes.get('/usuario/:id', eventoController.findEventosByIdUsuario)
eventoRoutes.get('/count', eventoController.countEventos)
eventoRoutes.get('/organizacion/:limit/:offset', eventoController.findAllEventos)
eventoRoutes.get('/:estado/:limite', eventoController.findAllByEstado)
eventoRoutes.get('/:id', validateFindById, eventoController.findById)
eventoRoutes.post('/', auth, validateCreate, eventoController.create)
eventoRoutes.put('/:id', auth, validateUpdateById, eventoController.updateById)
eventoRoutes.delete('/:id', auth, validateDeleteById, eventoController.deleteById)

module.exports = eventoRoutes