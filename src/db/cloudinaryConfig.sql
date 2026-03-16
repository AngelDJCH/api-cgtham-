CREATE TABLE cloudinaryconfig(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    clave VARCHAR(254) NOT NULL,
    clave_secreta VARCHAR(254) NOT NULL,
    id_organizacion UUID NOT NULL,
    CONSTRAINT fk_organizaciones_cloudinary
    FOREIGN KEY (id_organizacion)
    REFERENCES organizaciones(id)
    ON DELETE CASCADE
)