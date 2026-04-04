const pool = require('../config/postgres')
const Inscripcion = require('../models/inscripcion.js')

const queryCreate = `
    INSERT INTO inscripciones (estado, fecha, id_evento, id_usuario)
    VALUES($1,$2,$3,$4) RETURNING * 
`

const queryFinByIdAndEstado = `
    SELECT * FROM inscripciones AS i WHERE i.id = $1 AND i.estado = $2
`

const queryFindByIdUsuario = `
    SELECT * FROM inscriociones AS i WHERE i.id_usuario = $1 AND i.estado = 'APROBADA'
`

const queryUpdateEstadoById = `
    UPDATE inscripciones AS i SET estado = $1 WHERE i.id = $2 RETURNING * 
`

const queryDeleteById = `
    DELETE FROM inscripciones AS i WHERE i.id = $1 RETURNING *
`

const queryFindAllByIdOrganizacion = `
    SELECT e.id as id_evento, e.titulo, i.id as id_inscripcion, i.fecha, i.estado, u.id as id_usuario, u.nombre 
    FROM eventos AS e INNER JOIN inscripciones AS i ON e.id=i.id_evento INNER JOIN usuarios AS u ON
    i.id_usuario = u.id where u.id_organizacion=$1
`

const findByIdUsuario = async (id_usuario) => {
    const result = await pool.query(queryFindByIdUsuario, [id_usuario])
    const rows = result.rows
    return rows.map(
        row => new Inscripcion(
            row.id,
            row.estado,
            row.fecha,
            row.id_evento,
            row.id_organizacion
        )
    )
}


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

const findAllByIdOrganizacion = async (id_organizacion) => {
    const result = await pool.query(queryFindAllByIdOrganizacion, [id_organizacion])
    const rows = result.rows
    return rows.map(
        row => {
            return {
                evento: {
                    id_evento : row.id_evento,
                    titulo : row.titulo
                },
                inscripcion: {
                    id_inscripcion : row.id_inscripcion,
                    fecha : row.fecha,
                    estado : row.estado
                },
                usuario: {
                    id_usuario : row.id_usuario,
                    nombre : row.nombre
                }
            }
        }
    )
}

module.exports = { create, findByIdAndEstado, updateEstadoById, deleteById, findByIdUsuario, findAllByIdOrganizacion }