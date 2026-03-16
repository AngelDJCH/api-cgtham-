const pool = require('../config/postgres')
const EmpresaCamara = require('../models/empresaCamara')

const queryCreate = `
    INSERT INTO empresacamara (estado, fecha_afiliacion, fecha_vencimiento, id_empresa, id_camara)
    VALUES ($1,$2,$3,$4,$5) RETURNING *
`

const queryFindById = `
    SELECT * FROM empresacamara AS ec WHERE ec.id = $1
`

const queryFindAll = `
    SELECT * FROM empresacamara
`

const queryUpdateEstadoById = `
    UPDATE empresacamara AS ec SET
    estado = $1 WHERE ec.id = $2 RETURNING *
`

const queryUpdateFechaVencimientoById = `
    UPDATE empresacamara AS ec SET
    fecha_vencimiento = $1 WHERE ec.id = $2 RETURNING *
`

const create = async (estado, fecha_afiliacion, fecha_vencimiento, id_empresa, id_camara) => {
    const result = await pool.query(queryCreate, [estado, fecha_afiliacion, fecha_vencimiento, id_empresa, id_camara])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al crear una nueva alinza`)
    const row = result.rows[0]
    return new EmpresaCamara(
        row.id,
        row.estado,
        row.fecha_afiliacion,
        row.fecha_vencimiento,
        row.id_empresa,
        row.id_camara
    )
}

const findById = async (id) => {
    const result = await pool.query(queryFindById, [id])
    const row = result.rows[0]
    return new EmpresaCamara(
        row.id,
        row.estado,
        row.fecha_afiliacion,
        row.fecha_vencimiento,
        row.id_empresa,
        row.id_camara
    )
}

const findAll = async () => {
    const result = await pool.query(queryFindAll)
    const rows = result.rows
    return rows.map(
        row =>
            new EmpresaCamara(
                row.id,
                row.estado,
                row.fecha_afiliacion,
                row.fecha_vencimiento,
                row.id_empresa,
                row.id_camara
            )
    )
}

const updateEstadoById = async (id, estado) => {
    const result = await pool.query(queryUpdateEstadoById, [id, estado])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al actualizar el estado de la afiliacion`);
    const row = result.rows[0]
    return new EmpresaCamara(
        row.id,
        row.estado,
        row.fecha_afiliacion,
        row.fecha_vencimiento,
        row.id_empresa,
        row.id_camara
    )
}

const updateFechaVencimientoById = async (id, fecha_vencimiento) => {
    const result = await pool.query(queryUpdateFechaVencimientoById, [id, fecha_vencimiento])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al actualizar la fecha de vencimiento de la afiliacion`);
    const row = result.rows[0]
    return new EmpresaCamara(
        row.id,
        row.estado,
        row.fecha_afiliacion,
        row.fecha_vencimiento,
        row.id_empresa,
        row.id_camara
    )
}

module.exports = { create, findAll, findById, updateEstadoById, updateFechaVencimientoById }