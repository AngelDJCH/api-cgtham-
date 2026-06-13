const pool = require('../config/postgres')
const Inscripcion = require('../models/inscripcion.js')

const queryCreate = `
    INSERT INTO inscripciones (estado, fecha, id_evento, id_organizacion)
    VALUES($1,$2,$3,$4) RETURNING * 
`

const queryFinByIdAndEstado = `
    SELECT * FROM inscripciones AS i WHERE i.id = $1 AND i.estado = $2
`

// const queryFindByIdUsuario = `
//     SELECT e.id as id_evento, e.titulo, i.id as id_inscripcion, i.fecha, i.estado, o.id as id_organizacion, o.nombre_comercial 
//     FROM eventos AS e INNER JOIN inscripciones AS i ON e.id=i.id_evento INNER JOIN usuarios AS u ON
//     i.id_usuario = u.id inner join organizaciones as o on o.id = u.id_organizacion
// 	where i.id_usuario = $1
// `

const queryUpdateEstadoById = `
    UPDATE inscripciones AS i SET estado = $1 WHERE i.id = $2 RETURNING * 
`

const queryDeleteById = `
    DELETE FROM inscripciones AS i WHERE i.id = $1 RETURNING *
`

const queryFindAllByIdOrganizacion = `
    SELECT e.id as id_evento, e.titulo, i.id as id_inscripcion, i.fecha, i.estado, o.id as id_organizacion, o.nombre_comercial 
    FROM eventos AS e INNER JOIN inscripciones AS i ON e.id=i.id_evento INNER JOIN organizaciones AS o ON
    e.id_organizacion = o.id where i.id_organizacion= $1
`

const queryExisteInscripcion = `
    select * from inscripciones where id_evento = $1 and id_organizacion = $2
`

const existeInscripcion = async (id_evento, id_organizacion) => {
    const result = await pool.query(queryExisteInscripcion, [id_evento, id_organizacion])
    return result.rowCount > 0
}

const queryFindOrganizacionesParticipantesByIdInscripcion = `
    select o.id as id_organizacion, o.logo, o.nombre_comercial from inscripciones as i
    inner join organizaciones as o
    on o.id = i.id_organizacion
    where i.estado = 'APROBADA' and i.id_evento = $1
`

const queryFindInscripcionesByIdEvento = `
    select i.id as id_inscripcion, i.estado, i.fecha,
i.id_organizacion, o.nombre_comercial, o.logo from inscripciones as i
inner join organizaciones as o on i.id_organizacion = o.id
where i.id_evento = $1
`

const queryFindOrganizacionesEventoInscripciones = `
    select o.id as id_organizacion, o.logo, o.nombre_comercial, i.fecha, i.estado , i.id as id_inscripcion from inscripciones as i
    inner join organizaciones as o
    on o.id = i.id_organizacion
    where i.id_evento = $1
`
const queryFinParticipantesPendientesByIdInscripcion = `
    select i.id as id_inscripcion, i.fecha, o.id as id_organizacion,
    o.nombre_comercial, o.logo
    from inscripciones as i 
    inner join organizaciones as o on i.id_organizacion = o.id
    where i.id_evento = $1 and i.estado = 'PENDIENTE'
`
const findParticipantesPendientesByIdInscripcion = async (id_evento) => {
    const result = await pool.query(queryFinParticipantesPendientesByIdInscripcion, [id_evento])
    const rows = result.rows
    return rows.map(
        row => {
            return {
                id_inscripcion : row.id_inscripcion,
                fecha : row.fecha,
                organizacion : {
                    id_organizacion : row.id_organizacion,
                    nombre_comercial : row.nombre_comercial,
                    logo : row.logo
                }
            }
        }
    )
}

const findOrganizacionesEventoInscripciones = async (id_evento) => {
    const result = await pool.query(queryFindOrganizacionesEventoInscripciones, [id_evento])
    const row = result.rows[0]
    return {
        id: row.id_inscripcion,
        fecha: row.fecha,
        estado: row.estado,
        organizacion: {
            id: row.id_organizacion,
            logo: row.logo,
            nombre: row.nombre_comercial
        }
    }
}

const findInscripcionesByIdEvento = async (id_evento) => {
    const result = await pool.query(queryFindInscripcionesByIdEvento, [id_evento])
    const rows = result.rows
    return rows.map(
        row => {
            return {
                id: row.id_inscripcion,
                estado: row.estado,
                fecha: row.fecha,
                organizacion: {
                    id: row.id_organizacion,
                    nombre: row.nombre_comercial
                }
            }
        }
    )
}

const create = async (estado, fecha, id_evento, id_organizacion) => {
    const result = await pool.query(queryCreate, [estado, fecha, id_evento, id_organizacion])
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

// const findByIdUsuario = async (id_usuario) => {
//     const result = await pool.query(queryFindByIdUsuario, [id_usuario])
//     const rows = result.rows
//     return rows.map(
//         row => {
//             return {
//                 evento: {
//                     id_evento: row.id_evento,
//                     titulo: row.titulo
//                 },
//                 inscripcion: {
//                     id_inscripcion: row.id_inscripcion,
//                     fecha: row.fecha,
//                     estado: row.estado
//                 },
//                 organizacion: {
//                     id_organizacion: row.id_organizacion,
//                     nombre: row.nombre_comercial
//                 }
//             }
//         }
//     )
// }

const findAllByIdOrganizacion = async (id_organizacion) => {
    const result = await pool.query(queryFindAllByIdOrganizacion, [id_organizacion])
    const rows = result.rows
    return rows.map(
        row => {
            return {
                evento: {
                    id_evento: row.id_evento,
                    titulo: row.titulo
                },
                inscripcion: {
                    id_inscripcion: row.id_inscripcion,
                    fecha: row.fecha,
                    estado: row.estado
                },
                organizacion: {
                    id: row.id_organizacion,
                    nombre_comercial: row.nombre_comercial
                }
            }
        }
    )
}

const findOrganizacionesParticipantesByIdInscripcion = async (id_evento) => {
    const result = await pool.query(queryFindOrganizacionesParticipantesByIdInscripcion, [id_evento])
    const rows = result.rows
    return rows.map(
        row => {
            return {
                id_organizacion: row.id_organizacion,
                logo: row.logo,
                nombre_comercial: row.nombre_comercial
            }
        }
    )
}

//findByIdUsuario
module.exports = {existeInscripcion, findParticipantesPendientesByIdInscripcion, findOrganizacionesEventoInscripciones, create, findByIdAndEstado, updateEstadoById, deleteById, findAllByIdOrganizacion, findOrganizacionesParticipantesByIdInscripcion, findInscripcionesByIdEvento }