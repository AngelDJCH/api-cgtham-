CREATE TABLE historicosevento(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    fecha DATE NOT NULL,
    accion VARCHAR(50) NOT NULL,
    id_evento UUID NOT NULL,
    id_cuenta UUID,
    CONSTRAINT fk_historicoseventos_evento
    FOREIGN KEY (id_evento)
    REFERENCES eventos(id),
    CONSTRAINT fk_historicoseventos_cuenta
    FOREIGN KEY (id_cuenta)
    REFERENCES cuentas(id)
);