const camaraController = require('../controllers/camaraController')

const express = require('express')
const camaraRoutes = express.Router()
const { validateCreate, validateDeleteById, validateFindById, validateUpdateById } = require('../validator/camaraValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

camaraRoutes.get('/',auth, verifyRoles('ADMIN_ORG','ADMIN_SYS'), camaraController.findAll)
camaraRoutes.get('/:id',auth, verifyRoles('ADMIN_ORG','ADMIN_SYS'), validateFindById, camaraController.findById)
camaraRoutes.post('/',auth, verifyRoles('ADMIN_ORG','ADMIN_SYS'), validateCreate, camaraController.create)
camaraRoutes.put('/:id',auth, verifyRoles('ADMIN_ORG','ADMIN_SYS'), validateUpdateById, camaraController.updateById)
camaraRoutes.delete('/:id',auth, verifyRoles('ADMIN_ORG','ADMIN_SYS'), validateDeleteById, camaraController.deleteById)

module.exports = camaraRoutes