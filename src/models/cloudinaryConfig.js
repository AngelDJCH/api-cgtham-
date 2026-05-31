class CloudinaryConfig{
    #id
    #nombre
    #clave
    #clave_secreta
    #id_organizacion

    constructor(id, nombre, clave, clave_secreta, id_organizacion){
        this.#id = id
        this.#nombre = nombre
        this.#clave = clave
        this.#clave_secreta = clave_secreta
        this.#id_organizacion = id_organizacion
    }

    set id(id){
        this.#id = id
    }

    set nombre(nombre){
        this.#nombre = nombre
    }

    set clave(clave){
        this.#clave = clave
    }

    set clave_secreta(clave_secreta){
        this.#clave_secreta = clave_secreta
    }

    set id_organizacion(id_organizacion){
        this.#id_organizacion = id_organizacion
    }

    get id(){
        return this.#id
    }

    get nombre(){
        return this.#nombre
    }

    get clave(){
        return this.#clave
    }

    get clave_secreta(){
        return this.#clave_secreta
    }

    get id_organizacion(){
        return this.#id_organizacion
    }

    toJSON(){
        return{
            id : this.#id,
            nombre : this.#nombre,
            clave : this.#clave,
            clave_secreta : this.#clave_secreta,
            id_organizacion : this.#id_organizacion
        }
    }

}

module.exports = CloudinaryConfig