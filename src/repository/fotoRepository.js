const pool = require('../config/postgres')
const Foto = require('../models/foto')

const queryCreate = `
    INSERT INTO fotos (url_imagen, id_evento) VALUES ($1,$2) RETURNING *
`

const queryFindByIdEvento = `
    SELECT * FROM fotos AS f WHERE f.id_evento = $1
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
    if (result.rowCount === 0) throw new Error('Ocurrio un error al obtener las fotos del evento')
    const rows = result.rows
    return rows.map(
        row => new Foto(
            row.id,
            row.url_imagen,
            row.id_evento
        )
    )
}

const deleteById = async (id) => {
    const result = await pool.query(queryDeleteById, [id])
    if (result.rowCount === 0) throw new Error('Ocurrio un error al eliminar la foto')
    const row = result.rows[0]
    new Foto(
        row.id,
        row.url_imagen,
        row.id_evento
    )
}

module.exports = {create, findByIdEvento, deleteById}