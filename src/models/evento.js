class Evento {
    #id;
    #titulo;
    #descripcion;
    #tipo;
    #estado;
    #id_organizacion;
    #fecha_inicio;
    #fecha_final;
    #fecha_publicacion;

    constructor(id, titulo, descripcion, tipo, estado, id_organizacion, fecha_inicio, fecha_final, fecha_publicacion) {
        this.#id = id;
        this.#titulo = titulo;
        this.#descripcion = descripcion;
        this.#tipo = tipo;
        this.#estado = estado;
        this.#id_organizacion = id_organizacion;
        this.#fecha_inicio = fecha_inicio;
        this.#fecha_final = fecha_final;
        this.#fecha_publicacion = fecha_publicacion;
    }

    set id(id) {
        this.#id = id;
    }

    set titulo(titulo) {
        this.#titulo = titulo;
    }

    set descripcion(descripcion) {
        this.#descripcion = descripcion;
    }

    set tipo(tipo) {
        this.#tipo = tipo;
    }

    set id_organizacion(id_organizacion) {
        this.#id_organizacion = id_organizacion;
    }

    set fecha_inicio(fecha_inicio) {
        this.#fecha_inicio = fecha_inicio;
    }

    set fecha_final(fecha_final) {
        this.#fecha_final = fecha_final;
    }

    set fecha_publicacion(fecha_publicacion) {
        this.#fecha_publicacion = fecha_publicacion;
    }

    set estado(estado){
        this.#estado = estado
    }

    get id() {
        return this.#id;
    }

    get titulo() {
        return this.#titulo;
    }

    get descripcion() {
        return this.#descripcion;
    }

    get tipo() {
        return this.#tipo;
    }

    get id_organizacion() {
        return this.#id_organizacion;
    }

    get fecha_inicio() {
        return this.#fecha_inicio;
    }

    get fecha_final() {
        return this.#fecha_final;
    }

    get fecha_publicacion() {
        return this.#fecha_publicacion;
    }

    get estado(){
        return this.#estado
    }

    toJSON() {
        return {
            id: this.#id,
            titulo: this.#titulo,
            descripcion: this.#descripcion,
            tipo: this.#tipo,
            estado : this.#estado,
            id_organizacion: this.#id_organizacion,
            fecha_inicio: this.#fecha_inicio,
            fecha_final: this.#fecha_final,
            fecha_publicacion: this.#fecha_publicacion
        }
    }
}

module.exports = Evento;