const usuarioRepository = require('../repository/usuarioRepository')

const create = async (nombre, apellido_paterno, apellido_materno, rfc, foto, banner, estado, id_direccion, id_contacto) => {
    const usuario = await usuarioRepository.create(nombre, apellido_paterno, apellido_materno, rfc, foto, banner, estado, id_direccion, id_contacto);
    return usuario;
}

const findById = async (id) => {
    const usuario = await usuarioRepository.findById(id);
    return usuario;
}

const findAll = async () => {
    const usuarios = await usuarioRepository.findAll();
    return usuarios;
}

const updateById = async (id, nombre, apellido_paterno, apellido_materno, rfc, foto, banner) => {
    const usuario = await usuarioRepository.updateById(id, nombre, apellido_paterno, apellido_materno, rfc, foto, banner);
    return usuario;
}

const deleteById = async (id) => {
    const usuario = await usuarioRepository.deleteById(id);
    return usuario;
}

const countUsuarios = async () => {
    const count_usuarios = await usuarioRepository.countUsuarios()
    return count_usuarios
}

module.exports = { create, findById, findAll, updateById, deleteById, countUsuarios }