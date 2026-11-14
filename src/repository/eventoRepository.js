const pool = require('../config/postgres')
const Evento = require('../models/evento')

const queryCreate = `
    INSERT INTO eventos (titulo, descripcion, tipo, estado, id_organizacion,
    fecha_inicio, fecha_final, fecha_publicacion, limite_participantes,
    tipo_organizacion_permitida, region_permitida, modalidad, sector_permitido, giro_permitido,
    hora_inicio, hora_final) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,now(),$8,$9,$10,$11,$12,$13,$14,$15)
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
    fecha_inicio = $4, fecha_final = $5, limite_participantes = $6,
    tipo_organizacion_permitida = $7, region_permitida = $8, modalidad = $9,
    sector_permitido = $10, giro_permitido = $11, hora_inicio = $12, hora_final = $13
    WHERE e.id = $14 RETURNING * 
`

const queryDeleteById = `
    UPDATE eventos AS e SET estado = 'ELIMINADO' WHERE e.id = $1 RETURNING *
`

const queryCountEventos = `
    SELECT COUNT(*) AS total FROM eventos AS e WHERE e.estado = 'ACTIVO'
`

const queryFindAllByEstado = `
    SELECT * FROM eventos AS e WHERE e.estado = $1 LIMIT $2
`

const queryFindAllByIdOrganizacion = `
    select * from eventos as e where e.id_organizacion = $1 and e.estado = 'ACTIVO'
`

const queryFinAllEventos = `
SELECT 
    e.id AS id_evento, 
    e.titulo, 
    e.descripcion, 
    e.tipo,
    e.estado,
    e.fecha_inicio, 
    e.fecha_final,
    e.fecha_publicacion, 
    e.limite_participantes,
    e.tipo_organizacion_permitida,
    e.region_permitida,
    e.modalidad,
    e.sector_permitido,
    e.giro_permitido,
    e.hora_inicio,
    e.hora_final,
    COUNT(DISTINCT CASE WHEN i_part.estado = 'APROBADA' THEN i_part.id END) AS total_participantes,
    o.id AS id_organizacion, 
    o.nombre_comercial, 
    o.logo,
    COALESCE(ARRAY_AGG(f.url_imagen) FILTER (WHERE f.url_imagen IS NOT NULL), '{}') AS fotos
FROM eventos AS e
LEFT JOIN fotos AS f ON f.id_evento = e.id
LEFT JOIN inscripcionEvento AS i_part ON i_part.id_evento = e.id
INNER JOIN organizaciones AS o ON e.id_organizacion = o.id
WHERE e.estado = 'ACTIVO'
GROUP BY 
    e.id, 
    e.titulo, 
    e.descripcion, 
    e.tipo, 
    e.estado,
    e.fecha_inicio, 
    e.fecha_final, 
    e.fecha_publicacion,
    e.limite_participantes,
    e.tipo_organizacion_permitida,
    e.region_permitida,
    e.modalidad,
    e.sector_permitido,
    e.giro_permitido,
    e.hora_inicio,
    e.hora_final,
    o.id, 
    o.nombre_comercial, 
    o.logo
ORDER BY e.fecha_publicacion DESC
LIMIT $1 OFFSET $2
`

const queryFindEventosByIdUsuario = `
select e.titulo, e.fecha_inicio, o.nombre_comercial, o.logo from eventos as e
inner join inscripciones as i on i.id_evento = e.id inner join usuarios
as u on i.id_usuario = u.id inner join organizaciones as o on u.id_organizacion = o.id
where u.id = $1 and i.estado = 'APROBADA'
`

const queryDashEventosPorAño = `
    select count(fecha_inicio) as value, extract(year from fecha_inicio) as año from eventos
    group by extract(year from fecha_inicio) order by extract(year from fecha_inicio) asc
`

const dashEventosPorAño = async () => {
    const result = await pool.query(queryDashEventosPorAño)
    const rows = result.rows
    return rows.map(
        row =>{
            return {
                año : row.año,
                value : row.value
            }
        }
    )
}

const create = async (titulo, descripcion, tipo, estado, id_organizacion, fecha_inicio, fecha_final, limite_participantes = null, tipo_organizacion_permitida = 'TODAS', region_permitida = 'TODAS', modalidad = 'PRESENCIAL', sector_permitido = 'TODOS', giro_permitido = 'TODOS', hora_inicio = '09:00', hora_final = '18:00') => {
    const result = await pool.query(queryCreate, [titulo, descripcion, tipo, estado, id_organizacion, fecha_inicio, fecha_final, limite_participantes, tipo_organizacion_permitida, region_permitida, modalidad, sector_permitido, giro_permitido, hora_inicio, hora_final])
    if (result.rowCount === 0) throw new Error("Ocurrio un error al crear un nuevo evento");
    const row = result.rows[0]
    return new Evento(
        row.id,
        row.titulo,
        row.descripcion,
        row.tipo,
        row.estado,
        row.id_organizacion,
        row.fecha_inicio,
        row.fecha_final,
        row.fecha_publicacion,
        row.limite_participantes,
        row.tipo_organizacion_permitida,
        row.region_permitida,
        row.modalidad,
        row.sector_permitido,
        row.giro_permitido,
        row.hora_inicio,
        row.hora_final
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
        row.estado,
        row.id_organizacion,
        row.fecha_inicio,
        row.fecha_final,
        row.fecha_publicacion,
        row.limite_participantes,
        row.tipo_organizacion_permitida,
        row.region_permitida,
        row.modalidad,
        row.sector_permitido,
        row.giro_permitido,
        row.hora_inicio,
        row.hora_final
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
            row.estado,
            row.id_organizacion,
            row.fecha_inicio,
            row.fecha_final,
            row.fecha_publicacion,
            row.limite_participantes,
            row.tipo_organizacion_permitida,
            row.region_permitida,
            row.modalidad,
            row.sector_permitido,
            row.giro_permitido,
            row.hora_inicio,
            row.hora_final
        )
    )
}

const updateById = async (id, titulo, descripcion, tipo, fecha_inicio, fecha_final, limite_participantes = null, tipo_organizacion_permitida = 'TODAS', region_permitida = 'TODAS', modalidad = 'PRESENCIAL', sector_permitido = 'TODOS', giro_permitido = 'TODOS', hora_inicio = '09:00', hora_final = '18:00') => {
    const result = await pool.query(queryUpdateById, [titulo, descripcion, tipo, fecha_inicio, fecha_final, limite_participantes, tipo_organizacion_permitida, region_permitida, modalidad, sector_permitido, giro_permitido, hora_inicio, hora_final, id])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al actualizar el evento con ID : ${id}`)
    const row = result.rows[0]
    return new Evento(
        row.id,
        row.titulo,
        row.descripcion,
        row.tipo,
        row.estado,
        row.id_organizacion,
        row.fecha_inicio,
        row.fecha_final,
        row.fecha_publicacion,
        row.limite_participantes,
        row.tipo_organizacion_permitida,
        row.region_permitida,
        row.modalidad,
        row.sector_permitido,
        row.giro_permitido,
        row.hora_inicio,
        row.hora_final
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
        row.estado,
        row.id_organizacion,
        row.fecha_inicio,
        row.fecha_final,
        row.fecha_publicacion
    )
}

const countEventos = async () => {
    const result = await pool.query(queryCountEventos)
    return result.rows[0] ? parseInt(result.rows[0].total) : 0
}

const findAllByEstado = async (estado, limite) => {
    const result = await pool.query(queryFindAllByEstado, [estado, limite])
    return result.rows.map(
        row =>
            new Evento(
                row.id,
                row.titulo,
                row.descripcion,
                row.tipo,
                row.estado,
                row.id_organizacion,
                row.fecha_inicio,
                row.fecha_final,
                row.fecha_publicacion
            )
    )
}

const findAllEventos = async (limit, offset) => {
    const result = await pool.query(queryFinAllEventos, [limit, offset])
    const rows = result.rows
    return rows.map(
        row => {
            return {
                id: row.id_evento,
                titulo: row.titulo,
                descripcion: row.descripcion,
                tipo: row.tipo,
                estado: row.estado,
                fecha_inicio: row.fecha_inicio,
                fecha_final: row.fecha_final,
                fecha_publicacion: row.fecha_publicacion,
                limite_participantes: row.limite_participantes,
                tipo_organizacion_permitida: row.tipo_organizacion_permitida || 'TODAS',
                region_permitida: row.region_permitida || 'TODAS',
                modalidad: row.modalidad || 'PRESENCIAL',
                sector_permitido: row.sector_permitido || 'TODOS',
                giro_permitido: row.giro_permitido || 'TODOS',
                hora_inicio: row.hora_inicio || '09:00',
                hora_final: row.hora_final || '18:00',
                total_participantes: parseInt(row.total_participantes || 0),
                id_organizacion: row.id_organizacion,
                organizacion: {
                    id: row.id_organizacion,
                    nombre: row.nombre_comercial,
                    foto: row.logo
                },
                fotos: row.fotos || []
            }
        }
    )
}

const findEventosByIdUsuario = async (id_usuario) => {
    const result = await pool.query(queryFindEventosByIdUsuario, [id_usuario])
    const rows = result.rows
    return rows.map(
        row => {
            return {
                titulo: row.titulo,
                fecha: row.fecha_inicio,
                organizacion: row.nombre_comercial,
                logo: row.logo
            }
        }
    )
}

const findAllByIdOrganizacion = async (id_organizacion) => {
    const result = await pool.query(queryFindAllByIdOrganizacion, [id_organizacion])
    const rows = result.rows
    return rows.map(
        row => new Evento(
            row.id,
            row.titulo,
            row.descripcion,
            row.tipo,
            row.estado,
            row.id_organizacion,
            row.fecha_inicio,
            row.fecha_final,
            row.fecha_publicacion
        )
    )
}

module.exports = {dashEventosPorAño, create, findById, findAll, updateById, deleteById, countEventos, findAllByEstado, findAllEventos, findEventosByIdUsuario, findAllByIdOrganizacion }