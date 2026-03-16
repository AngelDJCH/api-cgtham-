const empresaCamaraRepository = require('../repository/empresaCamaraRepository')

const create = async (estado, fecha_afiliacion, fecha_vencimiento, id_empresa, id_camara) => {
    const empresaCamara = await empresaCamaraRepository.create(estado, fecha_afiliacion, fecha_vencimiento, id_empresa, id_camara)
    return empresaCamara;
}

const findById = async (id) => {
    const  empresaCamara = await empresaCamaraRepository.findById(id)
    return empresaCamara;
}

const findAll = async () => {
    const empresasCamaras = await empresaCamaraRepository.findAll()
    return empresasCamaras;
}

const updateEstadoById = async (id, estado) => {
    const empresaCamara = await empresaCamaraRepository.updateEstadoById(id,estado)
    return empresaCamara;
}

const updateFechaVencimientoById = async (id, fecha_vencimiento) => {
    const empresaCamara = await empresaCamaraRepository.updateFechaVencimientoById(id, fecha_vencimiento)
    return empresaCamara;   
}

module.exports = { create, findById, findAll, updateEstadoById, updateFechaVencimientoById }