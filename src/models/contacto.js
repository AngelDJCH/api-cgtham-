class Contacto{
    #id;
    #correo;
    #telefono;
    constructor(id, correo, telefono){
        this.#id = id;
        this.#correo = correo;
        this.#telefono = telefono;
    }

    set id(id){
        this.#id = id;
    }

    set id(correo){
        this.#correo = correo;
    }

    set telefono(telefono){
        this.#telefono = telefono;
    }

    get id(){
        return this.#id;
    }

    get correo(){
        return this.#correo;
    }

    get telefono(){
        return this.#telefono;
    }

    toJSON(){
        return{
            id : this.#id,
            correo :  this.#correo,
            telefono :  this.#telefono
        }
    }
}

module.exports = Contacto;