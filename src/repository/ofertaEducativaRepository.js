const pool = require('../config/postgres')

const queryCreate = `
    INSERT INTO ofertaeducativa (
        
    ) VALUES (
}   ) RETURNING *
`

const queryFindAllByIdEscuela = `
    SELECT * FROM ofertaeducativa WHERE id_escuela = $1
`

const findAllByIdEscuela = async (id_escuela) => {
    const result = await pool.query(queryFindAllByIdEscuela, [id_escuela])
    const rows = result.rows
    return rows.map(
        row => {
            return {
                id: row.id,
                nombre: row.nombre,
                descripcion : row.descripcion,
                duracion : row.duracion,
                perfil : row.perfil,
                id_escuela : row.id_escuela
            }
        }
    )
}

module.exports = {findAllByIdEscuela}