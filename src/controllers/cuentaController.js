const cuentaService = require('../services/cuentaService')
const bcrypt = require('bcrypt')

const {generateToken} = require('../helpers/jwtToken')

const create = async (req, res) => {
    try {
        const { correo, contrasenia, roles, id_usuario } = req.body;
        const contraseniaHash = await bcrypt.hashSync(contrasenia, 10)
        const cuenta = await cuentaService.create(correo, contraseniaHash, roles, id_usuario);
        res.status(201).json(cuenta.toJSON())
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const login = async (req, res) => {
    try {
        const { correo, contrasenia } = req.body;
        const cuenta = await cuentaService.login(correo)
        const result = bcrypt.compareSync(contrasenia, cuenta.contrasenia)
        const tk = await generateToken(cuenta)
        if (result) res.status(200).json({data : cuenta.toJSON(), token : tk})
        if (!result) throw new Error('Contrasenia incorrecta')
    } catch (error) {
        res.status(404).json(
            {
                message: error.message
            }
        )
    }
}

const findById = async (req, res) => {
    try {
        const id = req.params.id;
        const cuenta = await cuentaService.findById(id)
        res.status(200).json(cuenta.toJSON())
    } catch (error) {
        res.status(404).json(
            {
                message: error.message
            }
        )
    }
}

const updateRolById = async (req, res) => {
    try {
        const id = req.params.id;
        const { roles } = req.body;
        const cuenta = await cuentaService.updateById(id, roles)
        res.status(200).json(cuenta.toJSON())
    } catch (error) {
        res.status(404).json(
            {
                message: error.message
            }
        )
    }
}

module.exports = { create, findById, updateRolById, login }