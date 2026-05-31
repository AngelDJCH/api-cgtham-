const pool = require('../config/postgres')
const Empresa = require('../models/empresa')

const queryCreate = `
    INSERT INTO empresas (id, razon_social, regimen_fiscal, direccion_fiscal) VALUES($1, $2, $3, $4) 
    RETURNING *
`

const queryFindById = `
    SELECT * FROM empresas AS e WHERE e.id = $1
`

const queryFindAll = `
    SELECT * FROM empresas
`

const queryUpdateById = `
    UPDATE empresas SET razon_social = $1, regimen_fiscal = $2, direccion_fiscal = $3 WHERE id = $4 RETURNING *
`

const queryDeleteById = `
    DELETE FROM empresas AS e WHERE e.id = $1
`

const create = async (id_organizacion, razon_social, regimen_fiscal, direccion_fiscal) => {
    const result = await pool.query(queryCreate, [id_organizacion, razon_social, regimen_fiscal, direccion_fiscal])
    if (result.rowCount === 0) throw new Error('Ocurrio un error al crear la empresa')
    const row = result.rows[0]
    return new Empresa(
        row.id,
        row.razon_social,
        row.regimen_fiscal,
        row.direccion_fiscal
    )
}

const findById = async (id_organizacion) => {
    const result = await pool.query(queryFindById, [id_organizacion]);
    if (result.rowCount === 0) throw new Error(`No se encontro ninguna organizacion con el ID: ${id_organizacion}`);
    const row = result.rows[0]
    return new Empresa(
        row.id,
        row.razon_social,
        row.regimen_fiscal,
        row.direccion_fiscal
    )
}

const findAll = async () => {
    const result = await pool.query(queryFindAll);

    if (result.rowCount === 0) throw new Error(`No se encontraron empresas`)

    const empresas = result.rows.map(
        empresa => new Empresa(
            empresa.id,
            empresa.razon_social,
            empresa.regimen_fiscal,
            empresa.direccion_fiscal
        )
    )
    return empresas;
}

const updateById = async (id_organizacion, razon_social, regimen_fiscal, direccion_fiscal) => {
    const result = await pool.query(queryUpdateById, [razon_social, regimen_fiscal, direccion_fiscal, id_organizacion])
    const row = result.rows[0]
    return new Empresa(
        row.id,
        row.razon_social,
        row.regimen_fiscal,
        row.direccion_fiscal
    )
}

const deleteById = async (id_organizacion) => {
    const exist = await pool.query(queryDeleteById, [id])
    if (exist.rowCount === 0) throw new Error(`El id ${id} no se encontro`)
    const result = await pool.query(deleteById, [id_organizacion]);
    if(result.rowCount === 0) throw new Error('Ocurrio un error al eliminar la empresa')
    return new Empresa(
        row.id,
        row.razon_social,
        row.regimen_fiscal,
        row.direccion_fiscal
    )
}

module.exports = {create, findById, findById, updateById, deleteById}