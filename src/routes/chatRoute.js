const express = require('express')
const chatController = require('../controllers/chatController')
const auth = require('../midlewares/auth')
const { validateCreate, validateFindAllByOrganizaciones } = require('../validator/chatValidator')
const chatRoutes = express.Router()

chatRoutes.post('/', validateCreate, chatController.create)
chatRoutes.post('/organizaciones', validateFindAllByOrganizaciones,  chatController.findOrganizacionChat)

module.exports = chatRoutes