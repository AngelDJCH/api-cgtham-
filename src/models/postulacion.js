class Postulacion{
    #id;
    #estado;
    #fecha_postulacion;
    #id_oferta_laboral;
    #id_usuario;
    constructor(id, estado, fecha_postulacion, id_oferta_laboral, id_usuario){
        this.#id = id;
        this.#estado = estado;
        this.#fecha_postulacion = fecha_postulacion;
        this.#id_oferta_laboral = id_oferta_laboral;
        this.#id_usuario = id_usuario;
    }

    set id(id){
        this.#id = id;
    }

    set estado(estado){
        this.#estado = estado;
    }

    set fecha_postulacion(fecha_postulacion){
        this.#fecha_postulacion = fecha_postulacion;
    }

    set id_oferta_laboral(id_oferta_laboral){
        this.#id_oferta_laboral = id_oferta_laboral;
    }

    set id_usuario(id_usuario){
        this.#id_usuario = id_usuario;
    }

    get id(){
        return this.#id;
    }

    get estado(){
        return this.#estado;
    }

    get fecha_postulacion(){
        return this.#fecha_postulacion;
    }

    get id_oferta_laboral(){
        return this.#id_oferta_laboral;
    }

    get id_usuario(){
        return this.#id_usuario;
    }

    toJSON(){
        return{
            id : this.#id,
            estado : this.estado,
            fecha_postulacion : this.#fecha_postulacion,
            id_oferta_laboral : this.#id_oferta_laboral,
            id_usuario : this.#id_usuario
        }
    }
    
}

module.exports = Postulacion;