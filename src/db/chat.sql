CREATE TABLE chat (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    estado BOOLEAN NOT NULL,
    organizacion1 UUID NOT NULL,
    organizacion2 UUID NOT NULL,
    CONSTRAINT fk_chat_organizacion1
    FOREIGN key (organizacion1)
    REFERENCES organizaciones(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_chat_organizacion2
    FOREIGN KEY (organizacion2)
    REFERENCES organizaciones(id)
    ON DELETE CASCADE
)