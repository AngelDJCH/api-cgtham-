const cloudinaryConfigController = require('../controllers/cloudinaryConfigController')
const express = require('express')
const cloudinaryConfigRoutes = express.Router()
const { create, findByIdOrganizacion, updateByIdOrganizacion } = require('../validator/cloudinaryConfigValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

cloudinaryConfigRoutes.get('/:id',auth, verifyRoles('ADMIN_ORG', 'ADMIN_SYS'), findByIdOrganizacion, cloudinaryConfigController.findByIdOrganizacion)
cloudinaryConfigRoutes.post('/', create, cloudinaryConfigController.create)
cloudinaryConfigRoutes.put('/:id',auth, verifyRoles('ADMIN_ORG', 'ADMIN_SYS'), updateByIdOrganizacion, cloudinaryConfigController.updateByIdOrganizacion)

module.exports = cloudinaryConfigRoutes