const cuentaController = require('../controllers/cuentaController')
const express = require('express')
const cuentaRoutes = express.Router()
const { validateCreate, validateFindById, validateUpdateById, validateLogin } = require('../validator/cuentaValidator')
const auth = require('../midlewares/auth')

cuentaRoutes.get('/verify', auth, cuentaController.verificarSesion)
cuentaRoutes.get('/:id',auth,validateFindById, cuentaController.findById)
cuentaRoutes.post('/', validateCreate, cuentaController.create)
cuentaRoutes.put('/:id',auth, validateUpdateById, cuentaController.updateRolById)
cuentaRoutes.post('/login', validateLogin, cuentaController.login)
cuentaRoutes.post('/logout',auth, cuentaController.logout)

module.exports = cuentaRoutes