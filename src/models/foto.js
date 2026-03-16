class Foto{
    #id
    #url_imagen
    #id_evento

    constructor(id, url_imagen, id_evento){
        this.#id = id
        this.#url_imagen = url_imagen
        this.#id_evento = id_evento
    }

    set id(id){
        this.#id =  id
    }

    set url_imagen(url_imagen){
        this.#url_imagen = url_imagen
    }

    set id_evento(id_evento){
        this.#id_evento = id_evento
    }

    get id(){
        return this.#id
    }

    get url_imagen(){
        return this.#url_imagen
    }

    get id_evento(){
        return this.#id_evento
    }

    toJSON(){
        return{
            id : this.#id,
            url_imagen : this.#url_imagen,
            id_evento : this.#id_evento
        }
    }
}

module.exports = Foto