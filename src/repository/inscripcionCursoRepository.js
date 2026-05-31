const pool = require('../config/postgres')

const queryCreate = `
    INSERT INTO inscripcioncurso (
    fecha_inscripcion, fecha_estado, estado, id_curso, id_organizacion)
    VALUES (now(), now(), $1, $2, $3)
`

const queryEstadoById = `
    UPDATE inscripcioncurso SET estado = $1, fecha_estado = now() WHERE id = $2 RETURNING * 
`

const create = async (estado, id_curso, id_organizacion) => {
    const result = await pool.query(queryCreate, [estado, id_curso, id_organizacion])
    const row = result.rows[0]
    return {
        id: row.id,
        fecha_inscripcion: row.fecha_inscripcion,
        fecha_estado: row.fecha_estado,
        estado: row.estado,
        id_curso: row.id_curso,
        id_organizacion: row.id_organizacion
    }
}

const updateEstadoById = async (id, estado) => {
    const result = await pool.query(queryEstadoById, [estado, id])
    const row = result.rows[0]
    return {
        id: row.id,
        fecha_inscripcion: row.fecha_inscripcion,
        fecha_estado: row.fecha_estado,
        estado: row.estado,
        id_curso: row.id_curso,
        id_organizacion: row.id_organizacion
    }
}

module.exports = { create }