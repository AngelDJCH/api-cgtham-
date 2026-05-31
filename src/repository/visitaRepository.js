const pool = require('../config/postgres')

const queryCreate = `
    INSERT INTO visitas (id_escuela, id_empresa, fecha_solicitud, estado)
    VALUES (
        $1, $2, now(), 'PENDIENTE'
    ) RETURNING *
`

const queryFindByIdEmpresa = `
    SELECT 
    v.id as id_visita, o.nombre_comercial, o.id as id_escuela, 
    v.fecha_solicitud, v.fecha_aprobacion, v.fecha_visita, v.estado
    FROM visitas as v
    inner join escuelas as e on v.id_escuela = e.id
    inner join organizaciones as o on e.id = o.id
    WHERE v.id_empresa = $1
`

const queryFindByIdEscuela = `
    SELECT 
    v.id as id_visita, o.nombre_comercial, o.id as id_empresa, 
    v.fecha_solicitud, v.fecha_aprobacion, v.fecha_visita, v.estado
    FROM visitas as v
    inner join empresas as e on v.id_empresa = e.id
    inner join organizaciones as o on e.id = o.id
    WHERE v.id_escuela = $1
`

const queryFindAll = `
    SELECT * FROM visitas
`

const queryUpdateEstadoRechazadaById = `
    UPDATE visitas SET estado = 'RECHAZADA' WHERE id = $1 RETURNING * 
`

const queryFindById = `
    select 
    v.id as id_visita, o.id as id_escuela,
    v.fecha_solicitud, v.fecha_aprobacion, v.fecha_visita,
    v.estado, o.nombre_comercial, o.logo, o.banner
    from visitas as v
    inner join organizaciones as o on 
    v.id_escuela = o.id
    where v.id = $1
`

const queryDeleteByIdForEscuelas = `
    UPDATE visitas SET estado = 'ELIMINADO' WHERE id = $1 RETURNING *
`

const queryUpdateById = `
    UPDATE visitas SET fecha_aprobacion = now(), fecha_visita = $1, estado = 'APROBADA' WHERE id = $2 RETURNING *
`

const deleteByIdForEscuelas = async (id_visita) => {
    const result = await pool.query(queryDeleteByIdForEscuelas, [id_visita])
    const row = result.rows[0]
    return {
        id : row.id
    }
}

const updateById = async (fecha_visita, id_visita) => {
    const result = await pool.query(queryUpdateById,[fecha_visita, id_visita])
    const row = result.rows[0]
    return {
        id : row.id
    }
}

const findById = async (id_visita) => {
    const result = await pool.query(queryFindById, [id_visita])
    const row = result.rows[0]
    return {
        id: row.id_visita,
        solicitado: row.fecha_solicitud,
        aprobado: row.fecha_aprobacion,
        agendado: row.fecha_visita,
        estado : row.estado,
        escuela: {
            id: row.id_escuela,
            nombre: row.nombre_comercial,
            logo: row.logo,
            banner: row.banner
        }
    }
}

const updateEstadoRechazadaById = async (id_visita) => {
    const result = await pool.query(queryUpdateEstadoRechazadaById, [id_visita])
    const row = result.rows[0]
    return {
        id: row.id
    }
}

const findByIdEmpresa = async (id_empresa) => {
    const result = await pool.query(queryFindByIdEmpresa, [id_empresa])
    const rows = result.rows
    return rows.map(
        row => {
            return {
                id: row.id_visita,
                solicitado: row.fecha_solicitud,
                aprobado: row.fecha_aprobacion,
                agendado: row.fecha_visita,
                estado: row.estado,
                escuela: {
                    id: row.id_escuela,
                    nombre: row.nombre_comercial
                }
            }
        }
    )
}

const findByIdEscuela = async (id_escuela) => {
    const result = await pool.query(queryFindByIdEscuela, [id_escuela])
    const rows = result.rows
    return rows.map(
        row => {
            return {
                id: row.id_visita,
                solicitado: row.fecha_solicitud,
                aprobado: row.fecha_aprobacion,
                agendado: row.fecha_visita,
                estado: row.estado,
                empresa: {
                    id: row.id_empresa,
                    nombre: row.nombre_comercial
                }
            }
        }
    )
}



const create = async (id_escuela, id_empresa) => {
    const result = await pool.query(queryCreate, [id_escuela, id_empresa])
    const row = result.rows[0]
    return {
        id: row.id,
        id_escuela: row.id_escuela,
        id_empresa: row.id_empresa,
        fecha_solicitud: row.fecha_solicitud,
        estado: row.estado
    }
}

module.exports = { create, findByIdEmpresa, updateEstadoRechazadaById, findById, updateById,findByIdEscuela, deleteByIdForEscuelas }