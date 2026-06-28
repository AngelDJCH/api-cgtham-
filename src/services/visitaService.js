const visitaRepository = require('../repository/visitaRepository')

const create = async (id_escuela, id_empresa) => {
    const visita = await visitaRepository.create(id_escuela, id_empresa)
    return visita
}

const findByIdEmpresa = async (id_empresa) => {
    const visitas = await visitaRepository.findByIdEmpresa(id_empresa)
    return visitas
}

const findByIdEscuela = async (id_escuela) => {
    const visitas = await visitaRepository.findByIdEscuela(id_escuela)
    return visitas
}

const updateEstadoRechazadaById = async (id_visita) => {
    const viistas = await visitaRepository.updateEstadoRechazadaById(id_visita)
    return viistas
}

const findById = async (id_visita) => {
    const visitas = await visitaRepository.findById(id_visita)
    return visitas
}

const updateById = async (fecha_visita, id_visita) => {
    const visitas = await visitaRepository.updateById(fecha_visita, id_visita)
    return visitas
}

const deleteByIdForEscuelas = async (id) => {
    const visitas = await visitaRepository.deleteByIdForEscuelas(id)
    return visitas
}

const findAllForAdministrador = async () => {
    const visitas = await visitaRepository.findAllForAdministrador()
    return visitas
}

module.exports = {findAllForAdministrador, create, findByIdEmpresa, updateEstadoRechazadaById, findById,updateById, findByIdEscuela, deleteByIdForEscuelas}