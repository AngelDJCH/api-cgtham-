const pool = require('../config/postgres')
const OfertaLaboral = require('../models/ofertaLaboral')

const queryCreate = `
    INSERT INTO ofertaslaborales (
        titulo, descripcion, salario, jornada, tipo_contrato, vacantes, beneficios,
        habilidades_tecnicas, habilidades_blandas, departamento_area, modalidad,
        experiencia, estado, fecha_publicacion, id_empresa, documento
    ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13, now(),$14, $15
    )
    RETURNING *
`

const queryUpdateById = `
    UPDATE ofertaslaborales as ol 
    SET titulo = $1, descripcion = $2, salario = $3, jornada = $4,
    tipo_contrato = $5, vacantes = $6, beneficios = $7, habilidades_tecnicas = $8,
    habilidades_blandas = $9, departamento_area = $10, modalidad = $11,
    experiencia = $12, estado = $13 WHERE ol.id = $14 RETURNING *
`

const queryFindById = `
    SELECT * FROM ofertaslaborales as ol WHERE ol.id = $1
`

const queryFindAll = `
    select ol.id as id_oferta_laboral, ol.titulo, ol.descripcion, ol.salario, ol.jornada, ol.tipo_contrato,
ol.vacantes, ol.beneficios, ol.habilidades_tecnicas, ol.habilidades_blandas, ol.departamento_area, 
ol.modalidad, ol.experiencia, ol.fecha_publicacion, ol.documento, e.id as id_empresa, e.logo, e.nombre_comercial
from ofertaslaborales as ol inner join organizaciones as e on ol.id_empresa = e.id
where ol.estado = 'Activa'
LIMIT $1 OFFSET $2
`

const queryFindAllByIdOrganizacion = `
    select ol.id as id_oferta_laboral, ol.titulo, ol.descripcion, ol.salario, ol.jornada, ol.tipo_contrato,
ol.vacantes, ol.beneficios, ol.habilidades_tecnicas, ol.habilidades_blandas, ol.departamento_area, 
ol.modalidad, ol.experiencia, ol.fecha_publicacion, ol.documento, o.id as id_empresa, o.logo, o.nombre_comercial
from ofertaslaborales as ol inner join organizaciones as o on ol.id_empresa = o.id
where ol.estado = 'Activa' and o.id = $1
LIMIT $2 OFFSET $3
`

const queryDeleteById = `
    UPDATE ofertaslaborales AS e SET estado = 'ELIMINADO' WHERE e.id = $1 RETURNING *
`

const queryFindAllCount = `
    SELECT COUNT(*) AS total FROM ofertaslaborales AS ol WHERE ol.estado = 'Activa'
`

const create = async (titulo, descripcion, salario, jornada, tipo_contrato, vacantes, beneficios,
    habilidades_tecnicas, habilidades_blandas, departamento_area, modalidad,
    experiencia, estado, id_empresa, documento) => {
    const result = await pool.query(queryCreate, [
        titulo, descripcion, salario, jornada, tipo_contrato, vacantes, beneficios,
        habilidades_tecnicas, habilidades_blandas, departamento_area, modalidad,
        experiencia, estado, id_empresa, documento
    ])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al crear una oferta laboral`);
    const row = result.rows[0]
    return new OfertaLaboral(
        row.id,
        row.titulo,
        row.descripcion,
        row.salario,
        row.jornada,
        row.tipo_contrato,
        row.vacantes,
        row.beneficios,
        row.habilidades_tecnicas,
        row.habilidades_blandas,
        row.departamento_area,
        row.modalidad,
        row.experiencia,
        row.estado,
        row.fecha_publicacion,
        row.id_empresa
    )
}

const findById = async (id) => {
    const result = await pool.query(queryFindById, [id])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al obtener la oferta laboral`)
    const row = result.rows[0]
    return new OfertaLaboral(
        row.id,
        row.titulo,
        row.descripcion,
        row.salario,
        row.jornada,
        row.tipo_contrato,
        row.vacantes,
        row.beneficios,
        row.habilidades_tecnicas,
        row.habilidades_blandas,
        row.departamento_area,
        row.modalidad,
        row.experiencia,
        row.estado,
        row.fecha_publicacion,
        row.id_empresa,
        row.documento
    )
}

const findAll = async (limit, offset) => {
    const result = await pool.query(queryFindAll, [limit, offset]);
    const rows = result.rows
    return rows.map(
        row => {
            return {
                id: row.id_oferta_laboral,
                titulo: row.titulo,
                descripcion: row.descripcion,
                salario: row.salario,
                jornada: row.jornada,
                tipo_contrato: row.tipo_contrato,
                vacantes: row.vacantes,
                beneficios: row.beneficios,
                habilidades_tecnicas: row.habilidades_tecnicas,
                habilidades_blandas: row.habilidades_blandas,
                departamento_area: row.departamento_area,
                modalidad: row.modalidad,
                experiencia: row.experiencia,
                estado: row.estado,
                fecha_publicacion: row.fecha_publicacion,
                documento : row.documento,
                empresa: {
                    id: row.id_empresa,
                    logo: row.logo,
                    nombre_comercial: row.nombre_comercial
                }
            }
        }
    )
}

// const findById = async (id) => {
//     const result = await pool.query(queryFindById, [id])
//     if (result.rowCount === 0) throw new Error(`Ocurrio un error al obtener la oferta laboral`)
//     const row = result.rows[0]
//     return new OfertaLaboral(
//         row.id,
//         row.titulo,
//         row.descripcion,
//         row.salario,
//         row.jornada,
//         row.tipo_contrato,
//         row.vacantes,
//         row.beneficios,
//         row.habilidades_tecnicas,
//         row.habilidades_blandas,
//         row.departamento_area,
//         row.modalidad,
//         row.experiencia,
//         row.estado,
//         row.fecha_publicacion,
//         row.id_empresa
//     )
// }

const findAllByIdOrganizacion = async (id_organizacion, limit, offset) => {
    const result = await pool.query(queryFindAllByIdOrganizacion, [id_organizacion, limit, offset]);
    const rows = result.rows
    return rows.map(
        row => {
            return {
                id: row.id_oferta_laboral,
                titulo: row.titulo,
                descripcion: row.descripcion,
                salario: row.salario,
                jornada: row.jornada,
                tipo_contrato: row.tipo_contrato,
                vacantes: row.vacantes,
                beneficios: row.beneficios,
                habilidades_tecnicas: row.habilidades_tecnicas,
                habilidades_blandas: row.habilidades_blandas,
                departamento_area: row.departamento_area,
                modalidad: row.modalidad,
                experiencia: row.experiencia,
                estado: row.estado,
                fecha_publicacion: row.fecha_publicacion,
                documento : row.documento,
                empresa: {
                    id: row.id_empresa,
                    logo: row.logo,
                    nombre_comercial: row.nombre_comercial
                }
            }
        }
    )
}

const deletById = async (id) => {
    const result = await pool.query(queryDeleteById, [id])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al eliminar la oferta laboral`)
    const row = result.rows[0]
    return new OfertaLaboral(
        row.id,
        row.titulo,
        row.descripcion,
        row.salario,
        row.jornada,
        row.tipo_contrato,
        row.vacantes,
        row.beneficios,
        row.habilidades_tecnicas,
        row.habilidades_blandas,
        row.departamento_area,
        row.modalidad,
        row.experiencia,
        row.estado,
        row.fecha_publicacion,
        row.id_empresa
    )
}

const updateById = async (id, titulo, descripcion, salario, jornada, tipo_contrato, vacantes, beneficios,
    habilidades_tecnicas, habilidades_blandas, departamento_area, modalidad,
    experiencia, estado) => {
    const result = await pool.query(queryUpdateById, [titulo, descripcion, salario, jornada, tipo_contrato, vacantes, beneficios,
        habilidades_tecnicas, habilidades_blandas, departamento_area, modalidad,
        experiencia, estado, id])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al actualizar los campos de la oferta laboral`)
    const row = result.rows[0]
    return new OfertaLaboral(
        row.id,
        row.titulo,
        row.descripcion,
        row.salario,
        row.jornada,
        row.tipo_contrato,
        row.vacantes,
        row.beneficios,
        row.habilidades_tecnicas,
        row.habilidades_blandas,
        row.departamento_area,
        row.modalidad,
        row.experiencia,
        row.estado,
        row.fecha_publicacion,
        row.id_empresa
    )
}

const countOfertas = async () => {
    const result = await pool.query(queryFindAllCount)
    return result.rows[0] ? parseInt(result.rows[0].total) : 0
}

module.exports = { create, findById, findAll, updateById, deletById, countOfertas, findAllByIdOrganizacion }