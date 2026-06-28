const camaraController = require('../controllers/camaraController')

const express = require('express')
const camaraRoutes = express.Router()
const { validateCreate, validateDeleteById, validateFindById, validateUpdateById } = require('../validator/camaraValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

camaraRoutes.get('/',auth, camaraController.findAll)
camaraRoutes.get('/:id',auth, validateFindById, camaraController.findById)
camaraRoutes.post('/', validateCreate, camaraController.create)
camaraRoutes.put('/:id',auth, validateUpdateById, camaraController.updateById)
// camaraRoutes.delete('/:id',auth, verifyRoles('ADMIN_SYS'), validateDeleteById, camaraController.deleteById)

module.exports = camaraRoutes