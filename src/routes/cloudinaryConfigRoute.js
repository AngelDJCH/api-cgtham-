const cloudinaryConfigController = require('../controllers/cloudinaryConfigController')
const express = require('express')
const cloudinaryConfigRoutes = express.Router()
const { validateCreate, validateFindByIdOrganizacion, validateUpdateByIdOrganizacion } = require('../validator/cloudinaryConfigValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

cloudinaryConfigRoutes.get('/:id_organizacion',auth, validateFindByIdOrganizacion, cloudinaryConfigController.findByIdOrganizacion)
cloudinaryConfigRoutes.post('/', validateCreate, cloudinaryConfigController.create)
cloudinaryConfigRoutes.put('/:id',auth, validateUpdateByIdOrganizacion, cloudinaryConfigController.updateByIdOrganizacion)

module.exports = cloudinaryConfigRoutes