class Inscripcion{
    #id
    #estado
    #fecha
    #id_evento
    #id_usuario
    constructor(id, estado, fecha, id_evento, id_usuario){
        this.#id = id,
        this.#estado = estado,
        this.#fecha = fecha,
        this.#id_evento = id_evento,
        this.#id_usuario = id_usuario
    }

    set id(id){
        this.#id = id
    }

    set estado(estado){
        this.#estado = estado
    }

    set fecha(fecha){
        this.#fecha = fecha
    }

    set id_evento(id_evento){
        this.#id_evento = id_evento
    }

    set id_usuario(id_usuario){
        this.#id_usuario =  id_usuario
    }

    get id(){
        return this.#id
    }

    get estado(){
        return this.#estado
    }

    get fecha(){
        return this.#fecha
    }

    get id_evento(){
        return this.#id_evento
    }

    get id_usuario(){
        return this.#id_usuario
    }

    toJSON(){
        return {
            id : this.#id,
            estado : this.#estado,
            fecha : this.#fecha,
            id_evento : this.#id_evento,
            id_usuario : this.#id_usuario
        }
    }
}