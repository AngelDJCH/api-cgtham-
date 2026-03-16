const empresaController = require('../controllers/empresaController')
const express = require('express')
const empresaRoutes = express.Router()
const {validateCreate, validateDeleteById, validateFindById, validateUpdateById} = require('../validator/empresaValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

empresaRoutes.get('/',auth, empresaController.findAll);
empresaRoutes.get('/:id',auth, validateFindById, empresaController.findById);
empresaRoutes.post('/', validateCreate, empresaController.create);
empresaRoutes.put('/:id',auth, verifyRoles('ADMIN_ORG', 'ADMIN_SYS'), validateUpdateById, empresaController.updateById);
empresaRoutes.delete('/:id',auth, verifyRoles('ADMIN_ORG', 'ADMIN_SYS'),validateDeleteById, empresaController.deleteById);

module.exports = empresaRoutes