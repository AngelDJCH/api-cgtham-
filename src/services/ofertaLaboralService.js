const pool = require('../config/postgres')
const ofertaLaboralRepository = require('../repository/ofertaLaboral')

const create = async (titulo, descripcion, salario, jornada, tipo_contrato, vacantes, beneficios,
    habilidades_tecnicas, habilidades_blandas, departamento_area, modalidad,
    experiencia, estado, id_empresa, documento) => {
    const oferta_laboral = await ofertaLaboralRepository.create(titulo, descripcion, salario, jornada, tipo_contrato, vacantes, beneficios,
        habilidades_tecnicas, habilidades_blandas, departamento_area, modalidad,
        experiencia, estado, id_empresa,documento)
    return oferta_laboral;
}

const findAll = async (limit, offset) => {
    const ofertas_laborales = await ofertaLaboralRepository.findAll(limit, offset)
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
    const oferta_laboral = await ofertaLaboralRepository.deletById(id);
    return oferta_laboral;
}

const countOfertas = async () => {
    const counts_ofertas = await ofertaLaboralRepository.countOfertas()
    return counts_ofertas
}

const findAllHistoricos = async() =>{
    const historicosOfetas = await ofertaLaboralRepository.findAllHistoricos()
    return historicosOfetas
}

const findAllByIdOrganziacion = async (id_organizacion, limit, offset) => {
    const ofertas = await ofertaLaboralRepository.findAllByIdOrganizacion(id_organizacion, limit, offset)
    return ofertas
}

module.exports = { create, findAll, findById, updateById, deletById, countOfertas,findAllByIdOrganziacion }