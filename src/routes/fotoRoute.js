const fotoController = require('../controllers/fotoController')
const express = require('express')
const fotoRoutes = express.Router()
const { create, findByIdEvento, deleteById } = require('../validator/fotoValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

fotoRoutes.get('/:id', findByIdEvento, fotoController.findByIdEvento)
fotoRoutes.post('/', auth, verifyRoles('ADMIN_ORG', 'ADMIN_SYS'),create, fotoController.create)
fotoRoutes.delete('/:id',auth, verifyRoles('ADMIN_ORG', 'ADMIN_SYS'), deleteById, fotoController.deleteById)

module.exports = fotoRoutes