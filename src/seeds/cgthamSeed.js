const bcrypt = require('bcrypt');

/**
 * Inicializa el entorno base para CGTHAM en la base de datos si no existe previamente.
 * @param {Pool} pool - Instancia activa de conexión a PostgreSQL pasada desde el server.
 */
const levantarCGTHAM = async (pool) => {
    try {
        const correoAdmin = 'admin@cgtham.org';

        const existeAdmin = await pool.query(
            'SELECT id FROM cuentas WHERE correo = $1 LIMIT 1;', 
            [correoAdmin]
        );

        if (existeAdmin.rowCount > 0) {
            console.log(`[Seed] El administrador (${correoAdmin}) ya existe. Saltando inicialización de datos.`);
            return;
        }

        console.log(`[Seed] Iniciando la creación del entorno para CGTHAM...`);


        await pool.query(`
            INSERT INTO contactos (id, correo, telefono)
            VALUES ('e394b301-49b8-4c31-925a-df10b9cd1a40', 'contacto@cgtham.org', '2727250000')
            ON CONFLICT (id) DO NOTHING;
        `);

        await pool.query(`
            INSERT INTO direcciones (id, calle, numero, colonia, codigo_postal, ciudad, estado, pais)
            VALUES ('8af2d7bb-201a-4649-bd58-5d2bc7ef59b2', 'Avenida Oriente 9', '852', 'Emiliano Zapata', '94320', 'Orizaba', 'Veracruz', 'México')
            ON CONFLICT (id) DO NOTHING;
        `);

        await pool.query(`
            INSERT INTO organizaciones (id, nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner, estado, id_contacto, id_direccion)
            VALUES ('4fc73bbd-a60d-4b92-8067-17ebcf560965', 'CGTHAM', 'Comité de Gestión de Talento Humano de las Altas Montañas.', 'COMITE', 'Desarrollo Profesional / Educación', 25, 'Asociaciones y Comités de Vinculación', 'CGT180524XX0', 'cgtham_logo.png', 'cgtham_banner.png', true, 'e394b301-49b8-4c31-925a-df10b9cd1a40', '8af2d7bb-201a-4649-bd58-5d2bc7ef59b2')
            ON CONFLICT (id) DO NOTHING;
        `);

        const contraseniaPlano = 'Admin2026';
        const contraseniaHash = await bcrypt.hashSync(contraseniaPlano, 10);

        await pool.query(`
            INSERT INTO cuentas (id, correo, contrasenia, roles, id_organizacion)
            VALUES ('bd20f4c9-cb71-4712-9c3a-0e964319dc2b', $1, $2, ARRAY['ADMIN', 'SUPERUSER'], '4fc73bbd-a60d-4b92-8067-17ebcf560965')
            ON CONFLICT (id) DO NOTHING;
        `, [correoAdmin, contraseniaHash]); 

        await pool.query(`
            INSERT INTO cloudinaryconfig (id, nombre, clave, clave_secreta, id_organizacion)
            VALUES ('1524d773-ce6a-493a-867c-9b76e9389274', 'dfdfauyvo', '159733965513217', 'sC88K0UYf2oqiqaOkfGQ0SF32AE', '4fc73bbd-a60d-4b92-8067-17ebcf560965')
            ON CONFLICT (id) DO NOTHING;
        `);

        console.log("🟢 ¡Todo listo! Entorno raíz de CGTHAM configurado de manera segura por software.");
        console.log(`🔑 Credenciales -> Usuario: ${correoAdmin} | Contraseña: ${contraseniaPlano}`);

    } catch (error) {
        console.error("🔴 Error crítico al inicializar los datos de CGTHAM:", error);
    }
};

module.exports = { levantarCGTHAM };