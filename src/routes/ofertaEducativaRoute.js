const express = require('express')
const ofertaEducativaRoutes = express.Router()
const ofertaeducativaController = require('../controllers/ofertaEducativaController')
const auth = require('../midlewares/auth')
const { validateCreate, validateFindAllByIdEscuela } = require('../validator/ofertaEducativaValidator')

ofertaEducativaRoutes.get('/:id', auth, validateFindAllByIdEscuela, ofertaeducativaController.findAllByIdEscuela)
ofertaEducativaRoutes.post('/', auth, validateCreate, ofertaeducativaController.create)

module.exports = ofertaEducativaRoutes