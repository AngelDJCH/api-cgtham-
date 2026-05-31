CREATE TABLE comentarios(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    contenido VARCHAR(70) NOT NULL,
    estado VARCHAR(150) NOT NULL,
    fecha DATE NOT NULL,
    id_organizacion UUID NOT NULL,
    id_administrador UUID,
    CONSTRAINT fk_comentarios_cuentas
    FOREIGN KEY (id_administrador)
    REFERENCES cuentas(id),
    CONSTRAINT fk_comentarios_organizaciones
    FOREIGN KEY (id_organizacion)
    REFERENCES organizaciones(id)
    ON DELETE CASCADE
);