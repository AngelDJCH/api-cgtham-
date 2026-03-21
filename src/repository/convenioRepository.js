const pool = require('../config/postgres')
const Convenio = require('../models/convenio')

const queryCreate = `
    INSERT INTO convenios (titulo, descripcion, tipo, estado, fecha_registro, fecha_inicio, fecha_final)
    VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *
`

const queryFindById = `
    SELECT * FROM convenios AS c WHERE c.id = $1
`

const queryFindAll = `
    SELECT * FROM convenios
`

const queryUpdateById = `
    UPDATE convenios AS c SET titulo = $1, descripcion = $2, tipo = $3,
    fecha_inicio = $4, fecha_final = $5 WHERE c.id = $6 RETURNING *
`

const queryDeleteById = `
    DELETE FROM convenios AS c WHERE c.id = $1 RETURNING * 
`

const queryCountConvenios = `
    SELECT COUNT(*) AS total FROM convenios AS c WHERE c.estado = true
`

const create = async (titulo, descripcion, tipo, estado, fecha_registro, fecha_inicio, fecha_final) => {
    const result = await pool.query(queryCreate, [titulo, descripcion, tipo, estado, fecha_registro, fecha_inicio, fecha_final])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al agregar un nuevo convenio`)
    const row = result.rows[0]
    return new Convenio(
        row.id,
        row.titulo,
        row.descripcion,
        row.tipo,
        row.estado,
        row.fecha_registro,
        row.fecha_inicio,
        row.fecha_final
    )
}

const findById = async (id) => {
    const result = await pool.query(queryFindById, [id])
    if (result.rowCount === 0) throw new Error(`No se encontro el ID ${id}`)
    const row = result.rows[0]
    return new Convenio(
        row.id,
        row.titulo,
        row.descripcion,
        row.tipo,
        row.estado,
        row.fecha_registro,
        row.fecha_inicio,
        row.fecha_final
    )
}

const findAll = async () => {
    const result = await pool.query(queryFindAll)
    return result.rows.map(
        row => new Convenio(
            row.id,
            row.titulo,
            row.descripcion,
            row.tipo,
            row.estado,
            row.fecha_registro,
            row.fecha_inicio,
            row.fecha_final
        )
    )
}

const updateById = async (id, titulo, descripcion, tipo, fecha_inicio, fecha_final) => {
    const result = await pool.query(queryUpdateById, [titulo, descripcion, tipo, fecha_inicio, fecha_final, id])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al actualizar el convenio`)
    const row = result.rows[0]
    return new Convenio(
        row.id,
        row.titulo,
        row.descripcion,
        row.tipo,
        row.estado,
        row.fecha_registro,
        row.fecha_inicio,
        row.fecha_final
    )
}

const deleteById = async (id) => {
    const result = await pool.query(queryDeleteById, [id])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al eliminar el convenio con el ID ${id}`)
    const row = result.rows[0]
    return new Convenio(
        row.id,
        row.titulo,
        row.descripcion,
        row.tipo,
        row.estado,
        row.fecha_registro,
        row.fecha_inicio,
        row.fecha_final
    )
}

const countConvenios = async () => {
    const result = await pool.query(queryCountConvenios)
    return result.rows[0] ? parseInt(result.rows[0].total) : 0
}

module.exports = {create, findById, findAll, updateById, deleteById, countConvenios}