const organizacionController = require('../controllers/organizacionController')
const { validateCreate, validateDeleteById, validateFindById, validateUpdateById } = require('../validator/organizacionValidator')

const express = require('express')
const organizacionRoutes = express.Router()
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

organizacionRoutes.get('/', organizacionController.findAll)
organizacionRoutes.get('/:id',auth, validateFindById, organizacionController.findById)
organizacionRoutes.post('/', validateCreate, organizacionController.create)
organizacionRoutes.put('/:id',auth, verifyRoles('ADMIN_ORG', 'ADMIN_SYS'), validateUpdateById, organizacionController.updateById)
organizacionRoutes.delete('/:id',auth, verifyRoles('ADMIN_ORG' , 'ADMIN_SYS'), validateDeleteById, organizacionController.deleteById)
organizacionRoutes.get('/count', organizacionController.countOrganizaciones)

module.exports = organizacionRoutes;