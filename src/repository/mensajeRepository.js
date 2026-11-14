const pool = require('../config/postgres')
const Mensaje = require('../models/mensaje')

const queryCreate = `
    INSERT INTO mensajes (contenido, id_emisor, id_receptor, id_chat) 
    VALUES($1, $2, $3, $4) RETURNING *
`

const queryfindAllByIdChat = `
    SELECT id, contenido, id_emisor, id_receptor, id_chat, fecha_envio 
    FROM mensajes AS m 
    WHERE m.id_chat = $1 
    ORDER BY m.fecha_envio ASC
`

const queryUltimosMensajesRecibidos = `
    SELECT DISTINCT ON (m.id_chat) 
        m.id, m.contenido, m.id_emisor, m.id_receptor, m.id_chat, m.fecha_envio
    FROM mensajes m
    WHERE m.id_receptor = $1 OR m.id_emisor = $1
    ORDER BY m.id_chat, m.fecha_envio DESC
`

const create = async (contenido, id_emisor, id_receptor, id_chat) => {
    const result = await pool.query(queryCreate, [contenido, id_emisor, id_receptor, id_chat])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al intentar enviar un mensaje`)
    const row = result.rows[0]
    return new Mensaje(
        row.id,
        row.contenido,
        row.id_emisor,
        row.id_receptor,
        row.id_chat,
        row.fecha_envio
    )
}

const findAllByIdChat = async (id) => {
    const result = await pool.query(queryfindAllByIdChat, [id])
    const rows = result.rows
    return rows.map(
        row => new Mensaje(
            row.id,
            row.contenido,
            row.id_emisor,
            row.id_receptor,
            row.id_chat,
            row.fecha_envio
        )
    )
}

const findUltimosMensajesPorOrganizacion = async (id_organizacion) => {
    const result = await pool.query(queryUltimosMensajesRecibidos, [id_organizacion])
    const rows = result.rows
    return rows.map(
        row => new Mensaje(
            row.id,
            row.contenido,
            row.id_emisor,
            row.id_receptor,
            row.id_chat,
            row.fecha_envio
        )
    )
}

module.exports = { create, findAllByIdChat, findUltimosMensajesPorOrganizacion }
