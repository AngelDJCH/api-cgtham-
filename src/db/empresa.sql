CREATE TABLE empresas(
    id UUID NOT NULL PRIMARY KEY,
    razon_social VARCHAR(254) NOT NULL,
    regimen_fiscal VARCHAR(254) NOT NULL,
    direccion_fiscal VARCHAR(254) NOT NULL,
    CONSTRAINT fk_empresa_org
    FOREIGN KEY (id)
    REFERENCES organizaciones(id)
    ON DELETE CASCADE
)