const cuentaService = require('../services/cuentaService')
const bcrypt = require('bcrypt')

const { generateToken, verifyToken } = require('../helpers/jwtToken')

const create = async (req, res) => {
    try {
        const { correo, contrasenia, roles, id_organizacion } = req.body;
        const contraseniaHash = await bcrypt.hashSync(contrasenia, 10)
        const cuenta = await cuentaService.create(correo, contraseniaHash, roles, id_organizacion);
        res.status(201).json(cuenta.toJSON())
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('tk')
        res.status(204).json({ message: 'cookie borrada' })
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const verificarSesion = async (req, res) => {
    try {
        const token = req.cookies.tk
        const decoded = verifyToken(token)
        const usuario = {
            id: decoded.data.id,
            correo: decoded.data.correo,
            rol: decoded.data.rol,
            tipo: decoded.data.tipo,
            organizacion: decoded.data.organizacion,
            foto: decoded.data.logo
        }

        console.log(usuario)
        res.status(200).json(
            usuario
        )
    } catch (error) {
        res.clearCookie('tk')
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
        const result = bcrypt.compareSync(contrasenia, cuenta.contraseña)
        delete cuenta.contraseña
        const tk = await generateToken(cuenta)
        console.log(tk)
        if (result) {
            res.cookie('tk', tk,
                {
                    maxAge: 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none' //'lax'
                }
            )
            res.status(200).json(cuenta)
        }
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

const updateCorreoByIdOrganizacion = async (req, res) => {
    try {
        const id = req.params.id
        const { correo } = req.body
        // const contraseniaHash = await bcrypt.hashSync(contrasenia, 10)
        // const cuenta = await cuentaService.updateByIdOrganizacion(correo, contraseniaHash, id)
        const cuenta = await cuentaService.updateCorreoByIdOrganizacion(correo, id)
        res.status(200).json(cuenta.toJSON())
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const updateContraseniaByIdOrganizacion = async (req, res) => {
    try {
        const id = req.params.id
        const { contrasenia } = req.body
        const contraseniaHash = await bcrypt.hashSync(contrasenia, 10)
        // const cuenta = await cuentaService.updateByIdOrganizacion(correo, contraseniaHash, id)
        const cuenta = await cuentaService.updateContraseniaByIdOrganizacion(contraseniaHash, id)
        res.status(200).json(cuenta.toJSON())
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = { create, findById, updateRolById, login, logout, verificarSesion, updateCorreoByIdOrganizacion, updateContraseniaByIdOrganizacion }