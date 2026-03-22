class Comentario {
    #id;
    #contenido;
    #estado;
    #id_administrador;
    #id_usuario;
    #fecha;
    constructor(id, contenido, estado, id_administrador, id_usuario, fecha) {
        this.#id = id;
        this.#contenido = contenido;
        this.#estado = estado;
        this.#id_administrador = id_administrador;
        this.#id_usuario = id_usuario;
        this.#fecha = fecha
    }

    set id(id) {
        this.#id = id;
    }

    set contenido(contenido) {
        this.#contenido = contenido;
    }

    set estado(estado) {
        this.#estado = estado;
    }

    set id_administrador(id_administrador) {
        this.#id_administrador = id_administrador;
    }

    set id_usuario(id_usuario) {
        this.#id_usuario = id_usuario;
    }

    set fecha(fecha) {
        this.#fecha = fecha
    }

    get id() {
        return this.#id;
    }

    get contenido() {
        return this.#contenido;
    }

    get estado() {
        return this.#estado;
    }

    get id_administrador() {
        return this.#id_administrador;
    }

    get id_usuario() {
        return this.#id_usuario;
    }

    get fecha() {
        return this.#fecha
    }

    toJSON() {
        return {
            id: this.#id,
            contenido: this.#contenido,
            estado: this.#estado,
            id_administrador: this.#id_administrador,
            id_usuario: this.#id_usuario,
            fecha: this.#fecha
        }
    }
}

module.exports = Comentario;