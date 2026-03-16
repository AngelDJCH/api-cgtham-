const postulacionController = require('../controllers/postulacionController')
const express = require('express')
const postulacionRoutes = express.Router()
const { validateCreate, validateDeleteById, validateFindByIdOfertaLaboral, validateFindByIdUsuario, validateUpdateEstadoById } = require('../validator/postulacionValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

postulacionRoutes.post('/',auth, verifyRoles('USER'), validateCreate, postulacionController.create)
postulacionRoutes.get('/usuario/:id',auth, verifyRoles('USER'), validateFindByIdUsuario, postulacionController.findByIdUsuario)
postulacionRoutes.get('/ofertalaboral/:id',auth, validateFindByIdOfertaLaboral, postulacionController.findByIdOfertaLaboral)
postulacionRoutes.put('/:id',auth, verifyRoles('ADMIN_ORG'), validateUpdateEstadoById, postulacionController.updateEstadoById)
postulacionRoutes.delete('/:id',auth, verifyRoles('USER'), validateDeleteById, postulacionController.deleteById)

module.exports = postulacionRoutes;