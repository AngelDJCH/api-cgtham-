const cuentaRepository = require('../repository/cuentaRepository')

const create = async (correo, contrasenia, roles, id_usuario) => {
    const cuenta = await cuentaRepository.create(correo, contrasenia, roles, id_usuario)
    return cuenta;
}

const findById = async (id_usuario) => {
    const cuenta = await cuentaRepository.findById(id_usuario)
    return cuenta;
}

const updateRolById = async (id_usuario, roles) => {
    const cuenta = await cuentaRepository.updateRolById(id_usuario, roles)
    return cuenta;
}

const login = async (correo) => {
    const cuenta = await cuentaRepository.login(correo)
    return cuenta;
}

module.exports = { create, findById, updateRolById, login}