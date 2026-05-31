const convenioOrganizacionRepository = require('../repository/convenioOrganizacionRepository')

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

const updateEstadoById = async (id, estado) => {
    const convenioOrganizacion = await convenioOrganizacionRepository.updateEstadoById(id, estado)
    return convenioOrganizacion
}

const findAll = async () => {
    const convenioOrganizacion = await convenioOrganizacionRepository.findAll()
    return convenioOrganizacion
}

const findAllParticipantesById = async (id_convenio) => {
    const participantes = await convenioOrganizacionRepository.findAllParticipantesById(id_convenio)
    return participantes
}

const deleteById = async (id_convenio_organizacion) => {
    const convenio_organizacion = await convenioOrganizacionRepository.deleteById(id_convenio_organizacion)
    return convenio_organizacion
}

module.exports = { create, findById, updateRolById, findAll, findAllParticipantesById,deleteById,updateEstadoById}