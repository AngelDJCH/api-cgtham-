CREATE TABLE empresacamara(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    estado VARCHAR(150) NOT NULL,
    fecha_afiliacion DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    id_empresa UUID NOT NULL,
    id_camara UUID NOT NULL,
    CONSTRAINT fk_empresacamara_empresa
    FOREIGN KEY (id_empresa)
    REFERENCES empresas(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_empresascamaras_camara
    FOREIGN KEY (id_camara)
    REFERENCES camaras(id)
    ON DELETE CASCADE
)