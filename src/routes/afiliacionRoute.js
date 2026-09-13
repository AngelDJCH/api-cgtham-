const afiliacionController = require('../controllers/afiliacionController')
const auth = require('../midlewares/auth')

const express = require('express')
const afiliacionRoutes = express.Router()

afiliacionRoutes.post('/', auth, afiliacionController.create)
afiliacionRoutes.get('/:id_empresa', auth, afiliacionController.findByIdEmpresa)

module.exports = afiliacionRoutes