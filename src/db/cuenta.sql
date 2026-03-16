CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- Se debe de crear la extensión para id con formato UUID
--Una vez ejecutada la extensión ya no es necesario volver a ejecutar este comando.

CREATE TABLE cuentas(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    correo VARCHAR(254) NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL,
    roles TEXT[] NOT NULL,
    id_usuario UUID NOT NULL,
    CONSTRAINT fk_cuentas_usuarios
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id)
    ON DELETE CASCADE
);