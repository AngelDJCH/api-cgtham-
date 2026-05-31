const pool = require('../config/postgres')
const Contacto = require('../models/contacto')

const queryCreate = `
INSERT INTO contactos (correo, telefono) VALUES ($1, $2) RETURNING *                     
`

const queryFindById = `
SELECT * FROM contactos AS c WHERE c.id = $1
`

const queryUpdateById = `
UPDATE contactos AS c SET correo =  $1 , telefono = $2 WHERE c.id = $3 RETURNING *
`

const create = async (correo, telefono) => {
    const result = await pool.query(queryCreate,[correo, telefono]);
    const row = result.rows[0];
    return new Contacto(row.id, row.correo, row.telefono);
}

const findById= async (id) => {
    const result = await pool.query(queryFindById, [id]);
    const count = result.rowCount;
    const row = result.rows[0]
    //if(count === 0){throw new Error(`No se encontro un contacto con el ID ${id}`)}
    return new Contacto(row.id, row.correo, row.telefono)
}

const updateById = async (id, correo, telefono) => {
    const exist = await pool.query(queryFindById, [id])
    if(exist.rowCount === 0){throw new Error(`El ID ${id} no existe`)}
    const result = await pool.query(queryUpdateById, [correo, telefono, id]);
    const row = result.rows[0]
    return new Contacto(row.id, row.correo, row.telefono)
}

module.exports = {create, findById, updateById}