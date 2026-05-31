CREATE TABLE postulaciones(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    estado VARCHAR(150) NOT NULL,
    fecha_postulacion DATE NOT NULL,
    fecha_aprobacion DATE,
    id_oferta_laboral UUID NOT NULL,
    id_usuario UUID NOT NULL,
    CONSTRAINT fk_postulaciones_usuarios
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id),
    CONSTRAINT fk_postulaciones_ofertas_laborales
    FOREIGN KEY (id_oferta_laboral)
    REFERENCES ofertaslaborales(id)
);