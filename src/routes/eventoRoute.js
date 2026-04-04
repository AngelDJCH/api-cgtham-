const eventoController = require('../controllers/eventoController')
const express = require('express')
const eventoRoutes = express.Router()
const {validateCreate, validateDeleteById, validateFindById, validateUpdateById} = require('../validator/eventoValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

eventoRoutes.get('/usuario/:id', eventoController.findEventosByIdUsuario)
eventoRoutes.get('/count', eventoController.countEventos)
eventoRoutes.get('/:limit/:offset', eventoController.findAllEventos)
eventoRoutes.get('/:estado/:limite', eventoController.findAllByEstado)
eventoRoutes.get('/:id',validateFindById, eventoController.findById)
eventoRoutes.post('/',auth, verifyRoles('ADMIN_USER','ADMIN_SYS'),validateCreate,  eventoController.create)
eventoRoutes.put('/:id',auth, verifyRoles('ADMIN_USER','ADMIN_SYS'),validateUpdateById, eventoController.updateById)
eventoRoutes.delete('/:id',auth, verifyRoles('ADMIN_USER','ADMIN_SYS'),validateDeleteById, eventoController.deleteById)

module.exports = eventoRoutes