CREATE TABLE afiliaciones(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    id_empresa UUID NOT NULL,
    id_camara UUID NOT NULL,
    fecha_afiliacion DATE NOT NULL,
    estado VARCHAR(20) DEFAULT 'ACTIVA',
    CONSTRAINT fk_empresa FOREIGN KEY(id_empresa) REFERENCES empresas(id) ON DELETE CASCADE,
    CONSTRAINT fk_camara FOREIGN KEY(id_camara) REFERENCES camaras(id) ON DELETE CASCADE
);