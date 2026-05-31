const pool = require('../config/postgres')
const Postulacion = require('../models/postulacion')

const queryCreate = `
    INSERT INTO postulaciones (estado, fecha_postulacion, id_oferta_laboral, id_usuario)
    VALUES ($1, $2, $3, $4) RETURNING *
`
const queryFindByIdUsuario = `
    SELECT * FROM postulaciones AS p WHERE p.id_usuario = $1
`
const queryFindByIdOfertaLaboral = `
    SELECT * FROM postulaciones AS p WHERE p.id_oferta_laboral = $1
`
const querUpdateEstadoById = `
    UPDATE postulaciones AS p SET estado = $1, fecha_aprobacion = $2 WHERE p.id = $3 RETURNING *
`
const queryDeleteById = `
    DELETE FROM postulaciones AS p WHERE p.id = $1 RETURNING *
`

const queryExperienciaByIdUsuario = `
select org.id as id_organizacion, org.logo, org.nombre_comercial ,o.titulo, 
p.fecha_aprobacion
from postulaciones as p inner join ofertaslaborales as o on  p.id_oferta_laboral = o.id
inner join organizaciones as org on o.id_empresa = org.id
where p.id_usuario = $1 and p.estado = 'CONTRATADO'
`

const create = async (estado, fecha_postulacion, id_oferta_laboral, id_usuario) => {
    const result = await pool.query(queryCreate, [estado, fecha_postulacion, id_oferta_laboral, id_usuario])
    if (result.rowCount === 0) throw new Error('Ocurrio un error al crear una postulacion')
    const row = result.rows[0]
    return new Postulacion(
        row.id,
        row.estado,
        row.fecha_postulacion,
        row.fecha_aprobacion,
        row.id_oferta_laboral,
        row.id_usuario
    )
}

const findByIdUsuario = async (id_usuario) => {
    const result = await pool.query(queryFindByIdUsuario, [id_usuario])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al obtener las postulaciones del usuario con ID: ${id_usuario}`)
    const rows = result.rows
    return rows.map(
        row => new Postulacion(
            row.id,
            row.estado,
            row.fecha_postulacion,
            row.fecha_aprobacion,
            row.id_oferta_laboral,
            row.id_usuario
        )
    )
}

const findByIdOfertaLaboral = async (id_oferta_laboral) => {
    const result = await pool.query(queryFindByIdOfertaLaboral, [id_oferta_laboral])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al obtener las postulaciones de la oferta laboral con ID : ${id_oferta_laboral}`)
    const rows = result.rows
    return rows.map(
        row => new Postulacion(
            row.id,
            row.estado,
            row.fecha_postulacion,
            row.fecha_aprobacion,
            row.id_oferta_laboral,
            row.id_usuario
        )
    )
}

const updateEstadoById = async (id, estado, fecha_aprobacion) => {
    const result = await pool.query(querUpdateEstadoById, [estado, fecha_aprobacion, id])
    if (result.rowCount === 0) throw new Error('Ocurrio un error al actualizar el estado')
    const row = result.rows[0]
    return new Postulacion(
        row.id,
        row.estado,
        row.fecha_postulacion,
        row.fecha_aprobacion,
        row.id_oferta_laboral,
        row.id_usuario
    )
}

const deleteById = async (id) => {
    const result = await pool.query(queryDeleteById, [id])
    if (result.rowCount === 0) throw new Error('Ocurrio un error al eliminar la postulacion')
    const row = result.rows[0]
    new Postulacion(
        row.id,
        row.estado,
        row.fecha_postulacion,
        row.fecha_aprobacion,
        row.id_oferta_laboral,
        row.id_usuario
    )
}

const experienciaByIdUsuario = async (id_usuario) => {
    const result = await pool.query(queryExperienciaByIdUsuario, [id_usuario])
    const rows = result.rows
    return rows.map(
        row => {
            return {
                organizacion : {
                    id : row.id_organizacion,
                    logo : row.logo,
                    nombre : row.nombre_comercial
                },
                empleo : {
                    titulo : row.titulo,
                    fecha :  row.fecha_aprobacion
                }
            }
        }
    )
}

module.exports = { create, findByIdUsuario, findByIdOfertaLaboral, updateEstadoById, deleteById, experienciaByIdUsuario }