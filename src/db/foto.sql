CREATE TABLE fotos(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    url_imagen TEXT NOT NULL,
    id_evento UUID NOT NULL,
    CONSTRAINT fk_eventos_fotos
    FOREIGN KEY (id_evento) 
    REFERENCES eventos(id) 
    ON DELETE CASCADE
);