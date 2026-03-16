CREATE TABLE seguimientos(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    fecha DATE NOT NULL,
    id_seguido UUID NOT NULL,
    id_seguidor UUID NOT NULL,
    CONSTRAINT fk_seguimientos_usuario_seguido
    FOREIGN KEY (id_seguido)
    REFERENCES usuarios(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_seguimientos_usuario_seguidor
    FOREIGN KEY (id_seguidor)
    REFERENCES usuarios(id)
    ON DELETE CASCADE
)