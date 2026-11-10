const pool = require('../config/postgres')
const Foto = require('../models/foto')

const queryCreate = `
    INSERT INTO fotos (url_imagen, id_evento) VALUES ($1,$2) RETURNING *
`

const queryFindByIdEvento = `
    SELECT id, url_imagen, id_evento FROM fotos WHERE id_evento = $1 ORDER BY id ASC
`

const queryFindById = `
    SELECT id, url_imagen, id_evento FROM fotos WHERE id = $1
`

const queryCountByIdEvento = `
    SELECT COUNT(*)::int AS total FROM fotos WHERE id_evento = $1
`

const queryDeleteById = `
    DELETE FROM fotos AS f WHERE f.id = $1 RETURNING *
`

const create = async (url_imagen, id_evento) => {
    const result = await pool.query(queryCreate, [url_imagen, id_evento])
    if (result.rowCount === 0) throw new Error('Ocurrio un error al crear la foto del evento')
    const row = result.rows[0]
    return new Foto(
        row.id,
        row.url_imagen,
        row.id_evento
    )
}

const findByIdEvento = async (id_evento) => {
    const result = await pool.query(queryFindByIdEvento, [id_evento])
    return result.rows.map(row => ({
        id: row.id,
        url_imagen: row.url_imagen,
        id_evento: row.id_evento
    }))
}

const findById = async (id) => {
    const result = await pool.query(queryFindById, [id])
    if (result.rowCount === 0) return null
    const row = result.rows[0]
    return new Foto(
        row.id,
        row.url_imagen,
        row.id_evento
    )
}

const countByIdEvento = async (id_evento) => {
    const result = await pool.query(queryCountByIdEvento, [id_evento])
    return result.rows[0] ? parseInt(result.rows[0].total) : 0
}

const deleteById = async (id) => {
    const result = await pool.query(queryDeleteById, [id])
    if (result.rowCount === 0) throw new Error('Ocurrio un error al eliminar la foto')
    const row = result.rows[0]
    return new Foto(
        row.id,
        row.url_imagen,
        row.id_evento
    )
}

module.exports = { create, findByIdEvento, deleteById, findById, countByIdEvento }
