const pool = require('../config/postgres')
const OfertaLaboral = require('../models/ofertaLaboral')

const queryCreate = `
    INSERT INTO ofertaslaborales (
        titulo, descripcion, salario, jornada, tipo_contrato, vacantes, beneficios,
        habilidades_tecnicas, habilidades_blandas, departamento_area, modalidad,
        experiencia, estado, fecha_publicacion, id_empresa
    ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15
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
    SELECT * FROM ofertaslaborales as ol WHRE ol.id = $1
`

const queryFindAll = `
    SELECT * FROM ofertaslaborales
`

const queryDeleteById = `
    DELETE FROM ofertaslaborales AS ol WHERE ol.id = $1 RETURNING *
`

const queryFindAllCount = `
    SELECT COUNT(*) AS total FROM ofertaslaborales AS ol WHERE ol.estado = 'ACTIVA'
`

const create = async (titulo, descripcion, salario, jornada, tipo_contrato, vacantes, beneficios,
    habilidades_tecnicas, habilidades_blandas, departamento_area, modalidad,
    experiencia, estado, fecha_publicacion, id_empresa) => {
    const result = await pool.query(queryCreate, [
        titulo, descripcion, salario, jornada, tipo_contrato, vacantes, beneficios,
        habilidades_tecnicas, habilidades_blandas, departamento_area, modalidad,
        experiencia, estado, fecha_publicacion, id_empresa
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
        row.id_empresa
    )
}

const findAll = async () => {
    const result = await pool.query(queryFindAll);
    const rows = result.rows
    return rows.map(
        row => new OfertaLaboral(
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

module.exports = {create, findById, findAll, updateById, deletById, countOfertas}