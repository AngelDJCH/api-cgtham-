const express = require('express')
const chatController = require('../controllers/chatController')
const auth = require('../midlewares/auth')
const chatRoutes = express.Router()

chatRoutes.post('/', auth, chatController.create)
chatRoutes.post('/organizaciones', auth, chatController.findOrganizacionChat)

module.exports = chatRoutes