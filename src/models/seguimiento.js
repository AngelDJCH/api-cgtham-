class Seguimiento{
    #id;
    #fecha;
    #id_seguido;
    #id_seguidor;
    constructor(id, fecha, id_seguido, id_seguidor){
        this.#id = id;
        this.#fecha = fecha;
        this.#id_seguido = id_seguido;
        this.#id_seguidor = id_seguidor;
    }

    set id(id){
        this.#id = id;
    }

    set fecha(fecha){
        this.#fecha = fecha;
    }

    set id_seguido(id_seguido){
        this.#id_seguido = id_seguido;
    }

    set id_seguidor(id_seguidor){
        this.#id_seguidor = id_seguidor;
    }

    get id(){
        return this.#id;
    }

    get fecha(){
        return this.#fecha;
    }

    get id_seguido(){
        return this.#id_seguido;
    }

    get id_seguidor(){
        return this.#id_seguidor;
    }

    toJSON(){
        return{
            id : this.#id,
            fecha : this.#fecha,
            id_seguido : this.#id_seguido,
            id_seguidor : this.#id_seguidor
        }
    }

}

module.exports = Seguimiento;