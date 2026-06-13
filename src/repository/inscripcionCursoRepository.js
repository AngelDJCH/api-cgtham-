const pool = require('../config/postgres')

const queryCreate = `
    INSERT INTO inscripcioncurso (
    fecha_inscripcion, fecha_estado, estado, id_curso, id_organizacion)
    VALUES (now(), now(), 'PENDIENTE', $1, $2) RETURNING * 
`

const queryEstadoById = `
    UPDATE inscripcioncurso SET estado = $1, fecha_estado = now() WHERE id = $2 RETURNING * 
`

const queryOrganizacionesParticipantes = `
    select 
    o.nombre_comercial
    from inscripcioncurso as i inner join organizaciones as o
    on i.id_organizacion = o.id where i.estado = 'APROBADA'
    and i.id_curso = $1
`

const queryOrganizacionesPendientes = `
	select i.id as id_inscripcion, i.estado, i.fecha_inscripcion, o.id as id_organizacion,
    o.nombre_comercial, o.logo
    from inscripcioncurso as i inner join organizaciones as o
    on i.id_organizacion = o.id where i.estado = 'PENDIENTE'
    and i.id_curso = $1
`

const queryExisteInscripcionByICursoAndOrganizacion = `
    select * from inscripcioncurso where id_curso = $1 and id_organizacion = $2
`

const existeInscripcionByIdCursoAndOrganizacion = async (id_curso, id_organizacion) => {
    const result = await pool.query(queryExisteInscripcionByICursoAndOrganizacion, [id_curso, id_organizacion])
    return result.rowCount > 0
}

const organizacioneParticipantes = async (id_curso) => {
    const result = await pool.query(queryOrganizacionesParticipantes, [id_curso])
    const rows = result.rows
    return rows.map(
        row => {
            return {
                nombre : row.nombre_comercial
            }
        }
    )
}

const organizacionesPendientes = async (id_curso) => {
    const result = await pool.query(queryOrganizacionesPendientes, [id_curso])
    const rows = result.rows
    return rows.map(
        row => {
            return {
                id : row.id_inscripcion,
                estado : row.estado,
                fecha : row.fecha_inscripcion,
                organizacion : {
                    id : row.id_organizacion,
                    logo : row.logo,
                    nombre : row.nombre_comercial
                }
            }
        }
    )
}

const create = async (id_curso, id_organizacion) => {
    const result = await pool.query(queryCreate, [id_curso, id_organizacion])
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

module.exports = { create, updateEstadoById, organizacioneParticipantes, organizacionesPendientes, existeInscripcionByIdCursoAndOrganizacion }