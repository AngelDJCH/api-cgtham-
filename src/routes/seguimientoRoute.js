const seguimientoController = require('../controllers/seguimientoController')
const express = require('express')
const seguimientoRoutes = express.Router()
const { validateCreate, validateDeleteSeguidorOrSeguido, validateFindAllSeguidoresById, validateFindAllSeguidosById } = require('../validator/seguimientoValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

seguimientoRoutes.post('/',auth, verifyRoles('USER'), validateCreate, seguimientoController.create)
seguimientoRoutes.get('/seguidores/:id_seguido',auth, verifyRoles('USER'), validateFindAllSeguidoresById, seguimientoController.findAllSeguidoresById)
seguimientoRoutes.get('/seguidos/:id_seguidor',auth, verifyRoles('USER'), validateFindAllSeguidosById, seguimientoController.findAllSeguidosById)
seguimientoRoutes.delete('/',auth, verifyRoles('USER'), validateDeleteSeguidorOrSeguido, seguimientoController.deleteSeguidorOrSeguido)

module.exports = seguimientoRoutes