const convenioOrganizacionRepository = require('../repository/contactoRepository')

const create = async (rol, id_convenio, id_organizacion) => {
    const convenioOrganizacion = await convenioOrganizacionRepository.create(rol, id_convenio, id_organizacion)
    return convenioOrganizacion;
}

const findById = async (id) => {
    const convenioOrganizacion = await convenioOrganizacionRepository.findById(id)
    return convenioOrganizacion;
}

const updateRolById = async (id, rol) => {
    const convenioOrganizacion = await convenioOrganizacionRepository.updateRolById(id, rol)
    return convenioOrganizacion;
}

module.exports = { create, findById, updateRolById }