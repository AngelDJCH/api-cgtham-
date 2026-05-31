const escuelaController = require('../controllers/escuelaController')
const express = require('express')
const escuelaRoutes = express.Router()
const { validateCreate, validateDeleteById, validateFindById, validateUpdateById } = require('../validator/escuelaValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

escuelaRoutes.get('/', auth, escuelaController.findAll)
escuelaRoutes.get('/:id', auth, validateFindById, escuelaController.findById)
escuelaRoutes.post('/', validateCreate, escuelaController.create)
escuelaRoutes.put('/:id', auth, validateUpdateById, escuelaController.updateById)
escuelaRoutes.delete('/:id', auth, verifyRoles('ADMIN_ORG', 'ADMIN_SYS'), validateDeleteById, escuelaController.deleteById)

module.exports = escuelaRoutes