CREATE TABLE cuentas(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    correo VARCHAR(254) NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL,
    roles TEXT[] NOT NULL,
    id_organizacion UUID NOT NULL,
    CONSTRAINT fk_cuentas_organizaciones
    FOREIGN KEY (id_organizacion)
    REFERENCES organizaciones(id)
    ON DELETE CASCADE
);