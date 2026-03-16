class Direccion{
    #id;
    #calle;
    #numero;
    #colonia;
    #codigo_postal;
    #ciudad;
    #estado;
    #pais;
    constructor(id, calle, numero, colonia, codigo_postal, ciudad, estado, pais){
        this.#id = id;
        this.#calle = calle;
        this.#numero = numero;
        this.#colonia = colonia;
        this.#codigo_postal = codigo_postal;
        this.#ciudad = ciudad;
        this.#estado = estado;
        this.#pais = pais;
    }

    set id(id){
        this.#id = id;
    }

    set calle(calle){
        this.#calle = calle;
    }
    
    set numero(numero){
        this.#numero = numero;
    }

    set colonia(colonia){
        this.#colonia = colonia;
    }

    set codigo_postal(codigo_postal){
        this.#codigo_postal = codigo_postal;
    }

    set ciudad(ciudad){
        this.#ciudad = ciudad;
    }

    set estado(estado){
        this.#estado = estado;
    }

    set pais(pais){
        this.#pais = pais;
    }

    get id(){
        return this.#id;
    }

    get calle(){
        return this.#calle;
    }

    get numero(){
        return this.#numero;
    }

    get colonia(){
        return this.#colonia;
    }

    get codigo_postal(){
        return this.#codigo_postal;
    }

    get ciudad(){
        return this.#ciudad;
    }

    get estado(){
        return this.#estado;
    }

    get pais(){
        return this.#pais;
    }

    toJSON(){
        return{
            id : this.#id,
            calle : this.#calle,
            numero : this.#numero,
            colonia : this.#colonia,
            codigo_postal :  this.#codigo_postal,
            ciudad : this.#ciudad,
            estado : this.#estado,
            pais : this.#pais
        }
    }
}

module.exports = Direccion;