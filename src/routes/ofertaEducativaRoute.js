const express = require('express')
const ofertaEducativaRoutes = express.Router()
const ofertaeducativaController = require('../controllers/ofertaEducativaController')
const auth = require('../midlewares/auth')

ofertaEducativaRoutes.get('/:id', auth, ofertaeducativaController.findAllByIdEscuela)
ofertaEducativaRoutes.post('/', auth, ofertaeducativaController.create)

module.exports = ofertaEducativaRoutes