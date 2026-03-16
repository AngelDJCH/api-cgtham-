const pool = require('../config/postgres')
const Evento = require('../models/evento')

const queryCreate = `
    INSERT INTO eventos (titulo, descripcion, tipo, id_organizacion,
    fecha_inicio, fecha_final, fecha_publicacion) VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING * 
`

const queryFindById = `
    SELECT * FROm eventos AS e WHERE e.id = $1
`

const queryFindAll = `
    SELECT * FROM eventos
`

const queryUpdateById = `
    UPDATE eventos AS e SET titulo = $1, descripcion = $2, tipo = $3,
    fecha_inicio = $4, fecha_final = $6 WHERE e.id = $7 RETURNING * 
`

const queryDeleteById = `
    DELETE FROM eventos AS e WHERE e.id = $1 RETURNING *
`

const create = async (titulo, descripcion, tipo, id_organizacion, fecha_inicio, fecha_final, fecha_publicacion) => {
    const result = await pool.query(queryCreate, [titulo, descripcion, tipo, id_organizacion, fecha_inicio, fecha_final, fecha_publicacion])
    if (result.rowCount === 0) throw new Error("Ocurrio un error al crear un nuevo evento");
    const row = result.rows[0]
    return new Evento(
        row.id,
        row.titulo,
        row.descripcion,
        row.tipo,
        row.id_organizacion,
        row.fecha_inicio,
        row.fecha_final,
        row.fecha_publicacion
    )
}

const findById = async (id) => {
    const result = await pool.query(queryFindById, [id])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al obtener el evento con el ID: ${id}`);
    const row = result.rows[0]
    return new Evento(
        row.id,
        row.titulo,
        row.descripcion,
        row.tipo,
        row.id_organizacion,
        row.fecha_inicio,
        row.fecha_final,
        row.fecha_publicacion
    )
}

const findAll = async () => {
    const result = await pool.query(queryFindAll)
    const rows = result.rows
    return rows.map(
        row => new Evento(
            row.id,
            row.titulo,
            row.descripcion,
            row.tipo,
            row.id_organizacion,
            row.fecha_inicio,
            row.fecha_final,
            row.fecha_publicacion
        )
    )
}

const updateById = async (id, titulo, descripcion, tipo, fecha_inicio, fecha_final) => {
    const result = await pool.query(queryUpdateById, [titulo, descripcion, tipo, fecha_inicio, fecha_final, id])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al actualizar el evento con ID : ${id}`)
    const row = result.rows[0]
    return new Evento(
        row.id,
        row.titulo,
        row.descripcion,
        row.tipo,
        row.id_organizacion,
        row.fecha_inicio,
        row.fecha_final,
        row.fecha_publicacion
    )
}

const deleteById = async (id) => {
    const result = await pool.query(queryDeleteById, [id])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al eliminar un evento con el ID: ${id}`)
    const row = result.rows[0]
    return new Evento(
        row.id,
        row.titulo,
        row.descripcion,
        row.tipo,
        row.id_organizacion,
        row.fecha_inicio,
        row.fecha_final,
        row.fecha_publicacion
    )
}

module.exports = { create, findById, findAll, updateById, deleteById }