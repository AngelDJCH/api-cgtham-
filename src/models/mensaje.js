class Mensaje{
    #id;
    #contenido;
    #id_emisor;
    #id_receptor;
    constructor(id, contenido, id_emisor, id_receptor){
        this.#id = id;
        this.contenido = contenido;
        this.id_emisor = id_emisor;
        this.id_receptor = id_receptor;
    }

    set id(id){
        this.#id = id;
    }

    set contenido(contenido){
        this.#contenido = contenido;
    }

    set id_emisor(id_emisor){
        this.#id_emisor = id_emisor;
    }

    set id_receptor(id_receptor){
        this.#id_receptor = id_receptor;
    }

    get id(){
        return this.#id;
    }

    get contenido(){
        return this.#contenido;
    }

    get id_emisor(){
        return this.#id_emisor;
    }

    get id_receptor(){
        return this.#id_receptor;
    }

    toJSON(){
        return{
            id : this.#id,
            contenido : this.#contenido,
            id_emisor : this.#id_emisor,
            id_receptor : this.#id_receptor
        }
    }
}

module.exports = Mensaje;