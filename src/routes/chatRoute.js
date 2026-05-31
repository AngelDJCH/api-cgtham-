const express = require('express')
const chatController = require('../controllers/chatController')
const chatRoutes = express.Router()

chatRoutes.post('/', chatController.create)
chatRoutes.post('/organizaciones', chatController.findOrganizacionChat)

module.exports = chatRoutes