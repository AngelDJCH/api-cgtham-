const contactoController = require('../controllers/contactoController')

const express = require('express')
const contactosRoutes = express.Router()
const { validateCreate, validateFindById, validateUpdateById, validateDeleteById } = require('../validator/contactoValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

contactosRoutes.get('/:id',auth, validateFindById, contactoController.findById);
contactosRoutes.post('/', validateCreate, contactoController.create);
contactosRoutes.put('/:id',auth, validateUpdateById, contactoController.updateById)
contactosRoutes.delete('/:id',validateDeleteById, contactoController.deleteById)

module.exports = contactosRoutes