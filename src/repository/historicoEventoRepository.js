const pool = require('../config/postgres')
const HistoricoEvento = require('../models/historicoEvento')

const queryCreate = `
    INSERT INTO historicosevento(fecha, accion, id_evento, id_usuario)
    VALUES($1,$2,$3,$4) RETURNING *
`
const queryFindByIdEvento = `
    SELECT * FROM historicosevento AS he WHERE he.id_evento = $1
`
const queryFindById = `
    SELECT * FROM historicosevento AS he WHERE he.id = $1
`

const create = async (fecha, accion, id_evento, id_usuario) => {
    const result = await pool.query(queryCreate, [fecha, accion, id_evento, id_usuario])
    if (result.rowCount === 0) throw new Error('Ocurrio un erro al insertar datos')
    const row = result.rows[0]
    return new HistoricoEvento(
        row.id,
        row.fecha,
        row.accion,
        row.id_evento,
        row.id_usuario
    )
}

const findByIdEvento = async (id_evento) => {
    const result = await pool.query(queryFindByIdEvento, [id_evento])
    if (result.rowCount === 0) throw new Error('Ocurrio un erro al obtener los datos')
    const rows = result.rows
    return rows.map(
        row => new HistoricoEvento(
            row.id,
            row.fecha,
            row.accion,
            row.id_evento,
            row.id_usuario
        )
    )
}

const findById = async (id) => {
    const result = await pool.query(queryFindById, [id])
    if (result.rowCount === 0) throw new Error('Ocurrio un error al obtener los datos')
    const row = result.rows[0]
    return new HistoricoEvento(
        row.id,
        row.fecha,
        row.accion,
        row.id_evento,
        row.id_usuario
    )
}

module.exports = {create, findById, findByIdEvento}