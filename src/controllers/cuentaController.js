const cuentaService = require('../services/cuentaService')
const bcrypt = require('bcrypt')

const { generateToken, verifyToken } = require('../helpers/jwtToken')

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
            correo: decoded.data.correo,
            rol: decoded.data.rol,
            usuario: {
                id: decoded.data.usuario.id,
                foto: decoded.data.usuario.foto
            }
        }

        console.log(usuario)
        res.status(200).json(
            usuario
        )
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
        const result = bcrypt.compareSync(contrasenia, cuenta.contraseña)
        delete cuenta.contraseña
        const tk = await generateToken(cuenta)
        console.log(tk)
        if (result) {
            res.cookie('tk', tk,
                {
                    maxAge: 10000000000,
                    httpOnly: true,
                    sameSite: 'lax'
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

module.exports = { create, findById, updateRolById, login, logout, verificarSesion}