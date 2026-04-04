const usuarioService = require('../services/usuarioService')

const create = async (req, res) => {
    try {
        const { nombre, apellido_paterno, apellido_materno, rfc, foto, banner, estado, id_direccion, id_contacto, id_organizacion } = req.body;
        const usuario = await usuarioService.create(nombre, apellido_paterno, apellido_materno, rfc, foto, banner, estado, id_direccion, id_contacto, id_organizacion);
        res.status(201).json(usuario.toJSON())
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const findById = async (req, res) => {
    try {
        const id  = req.params.id;
        const usuario = await usuarioService.findById(id);
        res.status(200).json(usuario.toJSON())
    } catch (error) {
        res.status(404).json(
            {
                message: error.message
            }
        )
    }
}

const findAll = async (req, res) => {
    try {
        const usuarios = await usuarioService.findAll();
        res.status(200).json(
            usuarios.map(
                u => u.toJSON()
            )
        )
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const updateById = async (req, res) => {
    try {
        const id = req.params.id;
        //throw new Error(`El id es: ${id}`)
        const { nombre, apellido_paterno, apellido_materno, rfc, foto, banner} = req.body;
        const usuario = await usuarioService.updateById(id,nombre, apellido_paterno, apellido_materno, rfc, foto, banner);
        res.status(200).json(usuario.toJSON())
    } catch (error) {
        res.status(400).json(
            {
                message :  error.message
            }
        )
    }
}

const deleteById = async (req, res) => {
    try {
        const id =  req.params.id;
        const usuario = await usuarioService.deleteById(id);
        res.status(204).json({
            message : `USUARIO CON ID ${usuario.id} ELIMINADO CORRECTAMENTE`
        })
    } catch (error) {
        res.status(404).json(
            {
                message : error.message
            }
        )
    }
}

const countUsuarios = async (req, res) => {
    try {
        const count_usuarios = await usuarioService.countUsuarios()
        res.status(200).json(
            {
                usuarios : count_usuarios
            }
        )
    } catch (error) {
                res.status(400).json(
            {
                message : error.message
            }
        )
    }
}

const findPerfilById = async (req, res) => {
    try {
        const id = req.params.id
        const perfil = await usuarioService.findPerfilById(id)
        console.log(perfil)
        res.status(200).json(perfil)
    } catch (error) {
        res.status(400).json(
            {
                message : error.message
            }
        )
    }
}

module.exports = { create, findById, findAll, updateById, deleteById, countUsuarios, findPerfilById}