const express = require('express')
const ofertaEducativaRoutes = express.Router()
const ofertaeducativaController = require('../controllers/ofertaEducativaController')

ofertaEducativaRoutes.get('/:id', ofertaeducativaController.findAllByIdEscuela)
ofertaEducativaRoutes.post('/', ofertaeducativaController.create)

module.exports = ofertaEducativaRoutes