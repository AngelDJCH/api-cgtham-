const fotoController = require('../controllers/fotoController')
const express = require('express')
const fotoRoutes = express.Router()
const { create, findByIdEvento, deleteById } = require('../validator/fotoValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

fotoRoutes.get('/:id_evento', findByIdEvento, fotoController.findByIdEvento)
fotoRoutes.post('/', auth,create, fotoController.create)
fotoRoutes.delete('/:id',auth, deleteById, fotoController.deleteById)

module.exports = fotoRoutes