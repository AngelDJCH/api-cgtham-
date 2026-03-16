CREATE TABLE comentarios(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    contenido TEXT NOT NULL,
    estado VARCHAR(150) NOT NULL,
    id_usuario UUID NOT NULL,
    id_administrador UUID,
    CONSTRAINT fk_comentarios_usuarios
    FOREIGN KEY (id_administrador)
    REFERENCES usuarios(id),
    CONSTRAINT fk_comentarios_usuario
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id)
    ON DELETE CASCADE
)