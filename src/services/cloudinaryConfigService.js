const cloudinaryConfigRepository = require('../repository/cloudinaryConfigRepository')

const create = async (nombre, clave, clave_secreta, id_organizacion) => {
    const cloudinaryconfig = await cloudinaryConfigRepository.create(nombre, clave, clave_secreta, id_organizacion)
    return cloudinaryconfig;
}

const findByIdOrganizacion = async (id_organizacion) => {
    const cloudinaryconfig = await cloudinaryConfigRepository.findByIdOrganizacion(id_organizacion)
    return cloudinaryconfig;
}

const updateByIdOrganizacion =  async (nombre, clave, clave_secreta, id_organizacion) => {
    const cloudinaryconfig = await cloudinaryConfigRepository.findByIdOrganizacion(nombre, clave, clave_secreta, id_organizacion)
    return cloudinaryconfig
}

module.exports = {create, findByIdOrganizacion, updateByIdOrganizacion}