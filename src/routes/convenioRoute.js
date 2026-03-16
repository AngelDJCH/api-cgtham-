const convenioController = require('../controllers/convenioController')
const express = require('express')
const convenioRoutes = express.Router()
const  {validateCreate, validateDeleteById, validateFindById, validateUpdateById} = require('../validator/convenioValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

convenioRoutes.get('/:id',auth,validateFindById, convenioController.findById)
convenioRoutes.get('/',auth, convenioController.findAll)
convenioRoutes.post('/',auth, verifyRoles('ADMIN_ORG', 'ADMIN_SYS'),validateCreate, convenioController.create)
convenioRoutes.put('/:id',auth,validateUpdateById, convenioController.updateById)
convenioRoutes.delete('/:id',auth, verifyRoles('ADMIN_ORG', 'ADMIN_SYS'),validateDeleteById, convenioController.deleteById)

module.exports = convenioRoutes;