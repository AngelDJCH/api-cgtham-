const cuentaRepository = require('../repository/cuentaRepository')

const create = async (correo, contrasenia, roles, id_organizacion) => {
    const cuenta = await cuentaRepository.create(correo, contrasenia, roles, id_organizacion)
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

const updateCorreoByIdOrganizacion = async (correo, id_organizacion) => {
    const cuenta = await cuentaRepository.updateCorreoByIdOrganizacion(correo, id_organizacion)
    return cuenta
}

const updateContraseniaByIdOrganizacion = async (contrasenia, id_organizacion) => {
    const cuenta = await cuentaRepository.updateContraseniaByIdOrganizacion(contrasenia, id_organizacion)
    return cuenta
}

module.exports = { create, findById, updateRolById, login,updateCorreoByIdOrganizacion, updateContraseniaByIdOrganizacion}