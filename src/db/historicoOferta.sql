CREATE TABLE historicosoferta(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    fecha DATE NOT NULL,
    accion VARCHAR(50) NOT NULL,
    id_oferta UUID NOT NULL,
    id_cuenta UUID NOT NULL,
    CONSTRAINT fk_historicosofertas_oferta
    FOREIGN KEY (id_oferta)
    REFERENCES ofertaslaborales(id),
    CONSTRAINT fk_historicosofertas_cuenta
    FOREIGN KEY (id_cuenta)
    REFERENCES cuentas(id)
);
