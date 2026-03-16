class ConvenioOrganizacion{
    #id;
    #rol;
    #id_convenio;
    #id_organizacion;
    constructor(id, rol, id_convenio, id_organizacion){
        this.#id = id;
        this.#rol = rol;
        this.#id_convenio = id_convenio;
        this.#id_organizacion = id_organizacion;
    }

    set id(id){
        this.#id = id;
    }

    set rol(rol){
        this.#rol = rol;
    }

    set id_convenio(id_convenio){
        this.#id_convenio = id_convenio;
    }

    set id_organizacion(id_organizacion){
        this.#id_organizacion = id_organizacion;
    }

    get id(){
        return this.#id;
    }

    get rol(){
        return this.#rol;
    }

    get id_convenio(){
        return this.#id_convenio;
    }

    get id_organizacion(){
        return this.#id_organizacion;
    }

    toJSON(){
        return {
            id : this.#id,
            rol :  this.#rol,
            id_convenio :  this.#id_convenio,
            id_organizacion :  this.#id_organizacion
        }
    }
}

module.exports = ConvenioOrganizacion;