const organizacionController = require('../controllers/organizacionController')
const { validateCreate, validateDeleteById, validateFindById, validateUpdateById } = require('../validator/organizacionValidator')

const express = require('express')
const organizacionRoutes = express.Router()
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

organizacionRoutes.get('/count', organizacionController.countOrganizaciones)
organizacionRoutes.get('/', organizacionController.findAll)
organizacionRoutes.get('/pendientes/', organizacionController.findAllNoAprobadas)
organizacionRoutes.get('/:id', validateFindById, organizacionController.findById)
organizacionRoutes.get('/fast/:id_organizacion', organizacionController.findByIdFast)
organizacionRoutes.post('/', validateCreate, organizacionController.create)
organizacionRoutes.put('/:id',auth,  validateUpdateById, organizacionController.updateById)
organizacionRoutes.delete('/:id',auth, verifyRoles('ADMIN_ORG' , 'ADMIN_SYS'), validateDeleteById, organizacionController.deleteById)

module.exports = organizacionRoutes;