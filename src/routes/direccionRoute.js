const direccionController = require("../controllers/direccionController")

const express = require('express')
const direccionRoutes = express.Router()
const { validateCreate, validateFindById, validateUpdateById } = require('../validator/direccionValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

direccionRoutes.get('/:id',auth,validateFindById, direccionController.findById);
direccionRoutes.post('/',validateCreate, direccionController.create);
direccionRoutes.put('/:id',auth,validateUpdateById, direccionController.updateById)
direccionRoutes.delete('/:id', direccionController.deleteById)

module.exports = direccionRoutes