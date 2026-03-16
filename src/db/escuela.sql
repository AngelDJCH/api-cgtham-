CREATE TABLE escuela(
    id UUID NOT NULL PRIMARY KEY,
    tipo_institucion VARCHAR(150) NOT NULL,
    url_sitio TEXT NOT NULL,
    CONSTRAINT fk_escuela_org
    FOREIGN KEY (id)
    REFERENCES organizaciones(id)
    ON DELETE CASCADE
)