class Curso{
    #id
    #titulo
    #descripcion
    #fecha_publicacion
    #fecha_inicio
    #fecha_final
    #estado
    #id_organizacion
    constructor(id, titulo, descripcion, fecha_publicacion, fecha_inicio, fecha_final, estado, id_organizacion){
        this.#id = id
        this.#descripcion = descripcion
        this.#fecha_publicacion = fecha_publicacion
        this.#fecha_inicio = fecha_inicio
        this.#fecha_final = fecha_final
        this.#estado = estado
        this.#id_organizacion = id_organizacion
    }

    set id(id){
        this.#id = id
    }

    set descripcion(descripcion){
        this.#descripcion = descripcion
    }

    set fecha_publicacion(fecha_publicacion){
        this.#fecha_publicacion = fecha_publicacion
    }

    set fecha_inicio(fecha_inicio){
        this.#fecha_inicio = fecha_inicio
    }

    set fecha_final(fecha_final){
        this.#fecha_final = fecha_final
    }
    
    set estado(estado){
        this.#estado = estado
    }

    set id_organizacion(id_organizacion){
        this.#id_organizacion = id_organizacion
    }

    get id(){
        return this.#id
    }

    get descripcion(){
        return this.#descripcion
    }

    get fecha_publicacion(){
        return this.#fecha_publicacion
    }
    
    get fecha_inicio(){
        return this.#fecha_inicio
    }

    get fecha_final(){
        return this.#fecha_final
    }

    get id(){
        return this.#id
    }

    get id_organizacion(){
        return this.#id_organizacion
    }

    toJSON(){
        return{
            id : this.#id,
            titulo : this.#titulo,
            descripcion : this.#descripcion,
            publicacion :  this.#fecha_publicacion,
            inicio : this.#fecha_inicio,
            final : this.#fecha_final,
            estado : this.#estado,
            id_organizacion : this.#id_organizacion
        }
    }
}

module.exports = Curso