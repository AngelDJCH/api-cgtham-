const organizacionRepository = require('../repository/organizacionRepository')

const create = async (nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner, id_contacto, id_direccion) => {
    const organizacion = await organizacionRepository.create(nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner, id_contacto, id_direccion);
    return organizacion;
}

const findById = async (id) => {
    const organizacion = await organizacionRepository.findById(id);
    return organizacion;
}

const findAll = async () => {
    const organizaciones = await organizacionRepository.findAll()
    return organizaciones;
}

const updateById = async (id, nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner) => {
    const organizacion = await organizacionRepository.updateById(id, nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner)
    return organizacion;
}

const deleteById = async (id) => {
    const organizacion = await organizacionRepository.deleteById(id);
    return organizacion;
}

const countOrganizaciones = async () => {
    const count_organizaciones = await organizacionRepository.countOrganizaciones()
    return count_organizaciones;
}

module.exports = { create, findById, findAll, updateById, deleteById, countOrganizaciones }