const pool = require('../config/postgres')

const queryCreate = `
    INSERT INTO inscripciones (estado, fecha, id_evento, id_usuario)
    VALUES($1,$2,$3,$4) RETURNING * 
`

const queryFinByIdAndEstado = `
    SELECT * FROM inscripciones AS i WHERE i.id = $1 AND i.estado = $2
`

const queryUpdateEstadoById = `
    UPDATE inscripciones AS i SET estado = $1 WHERE i.id = $2 RETURNING * 
`

const queryDeleteById = `
    DELETE FROM inscripciones AS i WHERE i.id = $1 RETURNING *
`


const create = async (estado, fecha, id_evento, id_usuario) => {
    const result = await pool.query(queryCreate, [estado, fecha, id_evento, id_usuario])
    if (result.rowCount === 0) throw new Error('Ocurrio un error al insertar un nuevo elemento')
    const row = result.rows[0]
    return new Inscripcion(
        row.id,
        row.estado,
        row.fecha,
        row.id_evento,
        row.id_organizacion
    )
}

const findByIdAndEstado = async (id, estado) => {
    const result = await pool.query(queryFinByIdAndEstado, [id, estado])
    if (result.rowCount === 0) throw new Error('Ocurrio un error al obtener los datos')
    const row = result.rows[0]
    return new Inscripcion(
        row.id,
        row.estado,
        row.fecha,
        row.id_evento,
        row.id_organizacion
    )
}

const updateEstadoById = async (id, estado) => {
    const result = await pool.query(queryUpdateEstadoById, [estado, id])
    if (result.rowCount === 0) throw new Error('Ocurrio un error al actualizar')
    const row = result.rows[0]
    return new Inscripcion(
        row.id,
        row.estado,
        row.fecha,
        row.id_evento,
        row.id_organizacion
    )
}

const deleteById = async (id) => {
    const result = await pool.query(queryDeleteById, [id])
    if (result.rowCount === 0) throw new Error('Ocurrio un error al eliminar la inscripcio')
    const row = result.rows[0]
    return new Inscripcion(
        row.id,
        row.estado,
        row.fecha,
        row.id_evento,
        row.id_organizacion
    )
}



module.exports = { create, findByIdAndEstado, updateEstadoById, deleteById }