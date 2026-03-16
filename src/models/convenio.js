class Convenio{
    #id;
    #titulo;
    #descripcion;
    #tipo;
    #estado;
    #fecha_registro;
    #fecha_inicio;
    #fecha_final;
    constructor(id, titulo, descripcion, tipo, estado, fecha_registro, fecha_inicio, fecha_final){
        this.#id = id;
        this.#titulo = titulo;
        this.#descripcion =  descripcion;
        this.#tipo = tipo;
        this.#estado =  estado;
        this.#fecha_registro = fecha_registro;
        this.#fecha_inicio = fecha_inicio;
        this.#fecha_final = fecha_final;
    }

    set id(id){
        this.#id = id;
    }

    set titulo(titulo){
        this.#titulo = titulo;
    }

    set descripcion(descripcion){
        this.#descripcion = descripcion;
    }

    set tipo(tipo){
        this.#tipo = tipo;
    }

    set estado(estado){
        this.#estado = estado;
    }

    set fecha_registro(fecha_registro){
        this.#fecha_registro = fecha_registro;
    }

    set fecha_inicio(fecha_inicio){
        this.#fecha_inicio = fecha_inicio;
    }

    set fecha_final(fecha_final){
        this.#fecha_final = fecha_final;
    }

    get id(){
        return this.#id;
    }

    get titulo(){
        return this.#titulo;
    }

    get descripcion(){
        return this.#descripcion;
    }

    get tipo(){
        return this.#tipo;
    }

    get estado(){
        return this.#estado;
    }

    get fecha_registro(){
        return this.#fecha_registro;
    }

    get fecha_inicio(){
        return this.#fecha_inicio;
    }

    get fecha_final(){
        return this.#fecha_final;
    }

    toJSON(){
        return{
            id : this.#id,
            titulo : this.#titulo,
            descripcion  : this.#descripcion,
            tipo : this.#tipo,
            estado : this.#estado,
            fecha_registro : this.#fecha_registro,
            fecha_inicio : this.#fecha_inicio,
            fecha_final : this.#fecha_final
        }
    }
}

module.exports = Convenio;