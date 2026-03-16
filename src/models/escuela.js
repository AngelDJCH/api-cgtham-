class Escuela{
    #id;
    #tipo_institucion;
    #url_sitio;
    constructor(id, tipo_institucion, url_sitio){
        this.#id = id;
        this.#tipo_institucion = tipo_institucion;
        this.#url_sitio = url_sitio;
    }

    set id(id){
        this.#id = id;
    }

    set tipo_institucion(tipo_institucion){
        this.#tipo_institucion = tipo_institucion;
    }

    set url_sitio(url_sitio){
        this.#url_sitio = url_sitio;
    }

    get id(){
        return this.#id;
    }

    get tipo_institucion(){
        return this.#tipo_institucion;
    }

    get url_sitio(){
        return this.#url_sitio;
    }

    toJSON(){
        return{
            id : this.#id,
            tipo_institucion : this.#tipo_institucion,
            url_sitio : this.#url_sitio
        }
    }

    
}

module.exports =  Escuela;