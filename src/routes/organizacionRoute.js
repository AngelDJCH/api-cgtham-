const organizacionController = require('../controllers/organizacionController')
const {validateFindByIdFast, validateCreate, validateDeleteById, validateFindById, validateUpdateById, validateUpdateEstadoById } = require('../validator/organizacionValidator')

const express = require('express')
const organizacionRoutes = express.Router()
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

organizacionRoutes.get('/count', organizacionController.countOrganizaciones)
organizacionRoutes.get('/', organizacionController.findAll)
organizacionRoutes.get('/pendientes/', auth, verifyRoles('ADMIN_SYS'), organizacionController.findAllNoAprobadas)
organizacionRoutes.get('/:id', auth, validateFindById, organizacionController.findById)
organizacionRoutes.get('/fast/:id_organizacion', auth, validateFindByIdFast, organizacionController.findByIdFast)
organizacionRoutes.get('/logo/:id', auth, validateFindById, organizacionController.findLogoByIdOrganizacion)
organizacionRoutes.post('/', validateCreate, organizacionController.create)
organizacionRoutes.put('/:id', auth, validateUpdateById, organizacionController.updateById)
organizacionRoutes.put('/estado/:id', auth, verifyRoles('ADMIN_SYS'), validateUpdateEstadoById, organizacionController.updateEstadoById)
organizacionRoutes.delete('/:id', organizacionController.deleteById)

module.exports = organizacionRoutes;