CREATE TABLE convenioorganizacion(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    rol VARCHAR(150) NOT NULL,
    estado BOOLEAN,
    id_convenio UUID NOT NULL,
    id_organizacion UUID NOT NULL,
    CONSTRAINT fk_convenioorganizacion_convenios
        FOREIGN KEY (id_convenio)
        REFERENCES convenios(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_convenioorganizacion_organizaciones
        FOREIGN KEY (id_organizacion)
        REFERENCES organizaciones(id)
        ON DELETE CASCADE
);

-- 1. Eliminas la restricción vieja que está bloqueando todo
ALTER TABLE convenioorganizacion 
DROP CONSTRAINT fk_convenioorganizacion_organizaciones;

-- 2. La vuelves a crear con la regla de cascada activa
ALTER TABLE convenioorganizacion 
ADD CONSTRAINT fk_convenioorganizacion_organizaciones
FOREIGN KEY (id_organizacion) 
REFERENCES organizaciones(id) 
ON DELETE CASCADE;