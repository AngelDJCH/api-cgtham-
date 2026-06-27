CREATE TABLE visitas(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    id_escuela UUID NOT NULL,
    id_empresa UUID NOT NULL,
    fecha_solicitud DATE NOT NULL,
    fecha_aprobacion DATE,
    fecha_visita DATE,
    estado VARCHAR(100) NOT NULL,
    CONSTRAINT fk_visitas_escuela
    FOREIGN KEY (id_escuela)
    REFERENCES organizaciones(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_visitas_empresa
    FOREIGN KEY (id_empresa)
    REFERENCES organizaciones(id)
    ON DELETE CASCADE
);