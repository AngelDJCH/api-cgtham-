class Comentario{
    #id;
    #contenido;
    #estado;
    #id_administrador;
    #id_usuario;
    constructor(id,contenido, estado, id_administrador, id_usuario){
        this.#id = id;
        this.#contenido = contenido;
        this.#estado =  estado;
        this.#id_administrador = id_administrador;
        this.#id_usuario = id_usuario;
    }

    set id(id){
        this.#id = id;
    }

    set contenido(contenido){
        this.#contenido = contenido;
    }

    set estado(estado){
        this.#estado = estado;
    }

    set id_administrador(id_administrador){
        this.#id_administrador = id_administrador;
    }

    set id_usuario(id_usuario){
        this.#id_usuario = id_usuario;
    }

    get id(){
        return this.#id;
    }

    get contenido(){
        return this.#contenido;
    }

    get estado(){
        return this.#estado;
    }

    get id_administrador(){
        return this.#id_administrador;
    }

    get id_usuario(){
        return this.#id_usuario;
    }

    toJSON(){
        return{
            id :  this.#id,
            contenido : this.#contenido,
            estado : this.#estado,
            id_administrador  : this.#id_administrador
        }
    }
}

module.exports = Comentario;