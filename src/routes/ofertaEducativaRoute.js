const express = require('express')
const ofertaEducativaRoutes = express.Router()
const ofertaeducativaController = require('../controllers/ofertaEducativaController')

ofertaEducativaRoutes.get('/:id', ofertaeducativaController.findAllByIdEscuela)

module.exports = ofertaEducativaRoutes