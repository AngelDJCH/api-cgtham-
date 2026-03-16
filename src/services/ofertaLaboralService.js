const pool = require('../config/postgres')
const ofertaLaboralRepository = require('../repository/ofertaLaboral')

const create = async (titulo, descripcion, salario, jornada, tipo_contrato, vacantes, beneficios,
    habilidades_tecnicas, habilidades_blandas, departamento_area, modalidad,
    experiencia, estado, fecha_publicacion, id_empresa) => {
    const oferta_laboral = await ofertaLaboralRepository.create(titulo, descripcion, salario, jornada, tipo_contrato, vacantes, beneficios,
        habilidades_tecnicas, habilidades_blandas, departamento_area, modalidad,
        experiencia, estado, fecha_publicacion, id_empresa)
    return oferta_laboral;
}

const findAll = async () => {
    const ofertas_laborales = await ofertaLaboralRepository.findAll()
    return ofertas_laborales;
}

const findById = async (id) => {
    const oferta_laboral = await ofertaLaboralRepository.findById(id)
    return oferta_laboral;
}

const updateById = async (id, titulo, descripcion, salario, jornada, tipo_contrato, vacantes, beneficios,
    habilidades_tecnicas, habilidades_blandas, departamento_area, modalidad,
    experiencia, estado) => {
    const oferta_laboral = await ofertaLaboralRepository.updateById(id, titulo, descripcion, salario, jornada, tipo_contrato, vacantes, beneficios,
        habilidades_tecnicas, habilidades_blandas, departamento_area, modalidad,
        experiencia, estado)
    return oferta_laboral;
}

const deletById = async (id) => {
    if (!id) throw new Error(`ID invalido`)
    const oferta_laboral = await ofertaLaboralRepository.deletById(oferta_laboral);
    return oferta_laboral;
}

module.exports = { create, findAll, findById, updateById, deletById }