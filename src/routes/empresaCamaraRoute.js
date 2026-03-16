const empresaCamaraController = require('../controllers/empresaCamaraController')
const express = require('express')
const empresaCamaraRoutes = express.Router()
const { validateCreate, validateFindById, validateUpdateEstadoById, validateUpdateFechaVencimientoById } = require('../validator/empresaCamaraValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

empresaCamaraRoutes.get('/:id',auth, validateFindById, empresaCamaraController.findById)
empresaCamaraRoutes.get('/',auth, empresaCamaraController.findAll)
empresaCamaraRoutes.post('/',auth, verifyRoles('ADMIN_ORG', 'ADMIN_SYS'), validateCreate, empresaCamaraController.create)
empresaCamaraRoutes.put('/estado/:id',auth, verifyRoles('ADMIN_ORG', 'ADMIN_SYS'), validateUpdateEstadoById, empresaCamaraController.updateEstadoById)
empresaCamaraRoutes.put('/fecha_vencimiento/:id',auth, verifyRoles('ADMIN_ORG', 'ADMIN_SYS'), validateUpdateFechaVencimientoById, empresaCamaraController.updateFechaVencimientoById)

module.exports = empresaCamaraRoutes