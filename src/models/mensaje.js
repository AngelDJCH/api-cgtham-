class Mensaje {
    #id;
    #contenido;
    #id_emisor;
    #id_receptor;
    #id_chat;
    #fecha_envio;

    constructor(id, contenido, id_emisor, id_receptor, id_chat = null, fecha_envio = null) {
        this.#id = id;
        this.#contenido = contenido;
        this.#id_emisor = id_emisor;
        this.#id_receptor = id_receptor;
        this.#id_chat = id_chat;
        this.#fecha_envio = fecha_envio;
    }

    set id(id) {
        this.#id = id;
    }

    set contenido(contenido) {
        this.#contenido = contenido;
    }

    set id_emisor(id_emisor) {
        this.#id_emisor = id_emisor;
    }

    set id_receptor(id_receptor) {
        this.#id_receptor = id_receptor;
    }

    set id_chat(id_chat) {
        this.#id_chat = id_chat;
    }

    set fecha_envio(fecha_envio) {
        this.#fecha_envio = fecha_envio;
    }

    get id() {
        return this.#id;
    }

    get contenido() {
        return this.#contenido;
    }

    get id_emisor() {
        return this.#id_emisor;
    }

    get id_receptor() {
        return this.#id_receptor;
    }

    get id_chat() {
        return this.#id_chat;
    }

    get fecha_envio() {
        return this.#fecha_envio;
    }

    toJSON() {
        return {
            id: this.#id,
            contenido: this.#contenido,
            id_emisor: this.#id_emisor,
            id_receptor: this.#id_receptor,
            id_chat: this.#id_chat,
            fecha_envio: this.#fecha_envio
        };
    }
}

module.exports = Mensaje;
