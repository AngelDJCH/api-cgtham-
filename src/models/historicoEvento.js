class HistoricoEvento{
    #id;
    #fecha;
    #accion;
    #id_evento;
    #id_usuario;
    constructor(id, fecha, accion, id_evento, id_usuario){
        this.#id = id;
        this.#fecha =  fecha;
        this.#accion = accion;
        this.#id_evento = id_evento;
        this.#id_usuario = id_usuario;
    }

    set id(id){
        this.#id = id;
    }

    set fecha(fecha){
        this.#fecha = fecha;
    }

    set accion(accion){
        this.#accion = accion;
    }

    set id_evento(id_evento){
        this.#id_evento = id_evento;
    }

    set id_usuario(id_usuario){
        this.#id_usuario = id_usuario;
    }

    toJSON(){
        return{
            id : this.#id,
            fecha : this.#fecha,
            accion : this.#accion,
            id_evento : this.#id_evento,
            id_usuario : this.#id_usuario
        }
    }
}

module.exports = HistoricoEvento;