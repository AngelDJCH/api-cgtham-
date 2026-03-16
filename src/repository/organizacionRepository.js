const pool = require('../config/postgres')
const Organizacion = require('../models/organizacion')
const queryCreate = `
    INSERT INTO organizaciones (
        nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner, id_contacto, id_direccion
    ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
    ) 
    RETURNING *
`

const queryFindById = `
    SELECT * FROM organizaciones AS o WHERE o.id = $1
`

const queryFindAll = `
    SELECT * FROM organizaciones
`

const queryUpdateById = `
    UPDATE organizaciones AS o SET 
    nombre_comercial = $1, descripcion = $2, tipo = $3, sector = $4, tamaño = $5, giro = $6, rfc = $7, logo = $8, banner = $9
    WHERE o.id = $10
    RETURNING *
`

const queryDeleteById = `
    DELETE FROM organizaciones AS o WHERE o.id = $1
`


const create = async (nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner, id_contacto, id_direccion) => {
    const result = await pool.query(queryCreate, [nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner, id_contacto, id_direccion])
    const row = result.rows[0]
    return new Organizacion(
        row.id,
        row.nombre_comercial,
        row.descripcion,
        row.tipo,
        row.sector,
        row.tamaño,
        row.giro,
        row.rfc,
        row.logo,
        row.banner,
        row.id_contacto,
        row.id_direccion
    )
}

const findById = async (id) => {
    const result = await pool.query(queryFindById, [id]);
    if (result === 0) { throw new Error(`El ID ${id} no fue encontrada`) }
    const row = result.rows[0];
    return new Organizacion(
        row.id,
        row.nombre_comercial,
        row.descripcion,
        row.tipo,
        row.sector,
        row.tamaño,
        row.giro,
        row.rfc,
        row.logo,
        row.banner,
        row.id_contacto,
        row.id_direccion
    )
}

const findAll = async () => {
    const result = await pool.query(queryFindAll);
    if (result.rowCount === 0) throw new Error(`No hay organizaciones disponibles`)
    const organizaciones = result.rows.map(row => new Organizacion(
        row.id,
        row.nombre_comercial,
        row.descripcion,
        row.tipo,
        row.sector,
        row.tamaño,
        row.giro,
        row.rfc,
        row.logo,
        row.banner,
        row.id_contacto,
        row.id_direccion
    ));

    return organizaciones;
}

const updateById = async (id, nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner) => {
    const result = await pool.query(queryUpdateById, [nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner, id])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al actualizar los daots de la ID: ${id}`)
    const row = result.rows[0]
    return new Organizacion(
        row.id,
        row.nombre_comercial,
        row.descripcion,
        row.tipo,
        row.sector,
        row.tamaño,
        row.giro,
        row.rfc,
        row.logo,
        row.banner,
        row.id_contacto,
        row.id_direccion
    )
}

const deleteById = async (id) => {
    const exits = await pool.query(queryFindById, [id]);
    if (!exits) throw new Error(`No existe la organización con el ID ${id}`)
    const result = await pool.query(queryDeleteById, [id]);
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al eliminar la organziación`)
    const row = exits.rows[0]
    return new Organizacion(
        row.id,
        row.nombre_comercial,
        row.descripcion,
        row.tipo,
        row.sector,
        row.tamaño,
        row.giro,
        row.rfc,
        row.logo,
        row.banner,
        row.id_contacto,
        row.id_direccion
    )
}



module.exports = { create, findById, findAll, updateById, deleteById}