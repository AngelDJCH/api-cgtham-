const pool = require('../config/postgres')

const queryCreate = `INSERT INTO afiliaciones (id_empresa, id_camara, fecha_afiliacion)
VALUES($1,$2,now()) RETURNING *`

const queryFindByIdEmpresa = `
SELECT 
    c.id,
    o.nombre_comercial,
    o.logo,
    a.fecha_afiliacion,
    a.estado
    FROM afiliaciones AS a
    INNER JOIN camaras AS c ON c.id = a.id_camara
    INNER JOIN organizaciones AS o ON o.id = c.id
    WHERE a.id_empresa = $1
`

const findByIdEmpresa = async(id_empresa)=>{
    const result = await pool.query(queryFindByIdEmpresa, [id_empresa])
    return result.rows.map(
        row => {
            return {
                id : row.id,
                nombre : row.nombre_comercial,
                logo : row.logo,
                fecha : row.fecha_afiliacion,
                estado : row.estado
            }
        }
    )
}

const create = async (id_empresa, id_camara) => {
    const result = await pool.query(queryCreate, [id_empresa, id_camara])
    const row = result.rows[0]
    return {
        id: row.id,
        empresa: row.id_empresa,
        camara: row.id_camara,
        fecha: row.fecha_afiliacion,
        estado: row.estatus
    }
}

module.exports = { create, findByIdEmpresa }