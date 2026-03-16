CREATE TABLE camaras(
    id UUID NOT NULL PRIMARY KEY,
    nombre VARCHAR(254) NOT NULL,
    presidente VARCHAR(254) NOT NULL,
    CONSTRAINT fk_camara_org
    FOREIGN KEY(id)
    REFERENCES organizaciones(id)
    ON DELETE CASCADE
)