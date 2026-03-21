class Organizacion{
    #id;
    #nombre_comercial;
    #descripcion;
    #tipo;
    #sector;
    #tamaño;
    #giro;
    #rfc;
    #logo;
    #banner;
    #estado;
    #id_contacto;
    #id_direccion;
    constructor(id, nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner, estado, id_contacto, id_direccion){
        this.#id = id;
        this.#nombre_comercial = nombre_comercial;
        this.#descripcion = descripcion;
        this.#tipo = tipo;
        this.#sector = sector;
        this.#tamaño = tamaño;
        this.#giro = giro;
        this.#rfc = rfc;
        this.#logo = logo;
        this.#banner = banner;
        this.#estado = estado;
        this.#id_contacto = id_contacto;
        this.#id_direccion = id_direccion;
    }

    set id(id){
        this.#id = id;
    }

    set nombre_comercial(nombre_comercial){
        this.#nombre_comercial = nombre_comercial;
    }

    set descripcion(descripcion){
        this.#descripcion = descripcion;
    }

    set tipo(tipo){
        this.#tipo = tipo;
    }

    set sector(sector){
        this.#sector = sector;
    }

    set tamaño(tamaño){
        this.#tamaño = tamaño;
    }

    set giro(giro){
        this.#giro = giro;
    }

    set rfc(rfc){
        this.#rfc =  rfc;
    }

    set logo(logo){
        this.#logo = logo;
    }

    set banner(banner){
        this.#banner = banner;
    }

    set estado(estado){
        this.#estado = estado;
    }

    set id_contacto(id_contacto){
        this.#id_contacto = id_contacto;
    }

    set id_direccion(id_direccion){
        this.#id_direccion = id_direccion;
    }

    get id(){
        return this.#id;
    }

    get nombre_comercial(){
        return this.#nombre_comercial;
    }

    get descripcion(){
        return this.#descripcion;
    }

    get tipo(){
        return this.#tipo;
    }

    get sector(){
        return this.#sector;
    }

    get tamaño(){
        return this.#tamaño;
    }

    get giro(){
        return this.#giro;
    }

    get rfc(){
        return this.#rfc;
    }

    get logo(){
        return this.#logo;
    }

    get banner(){
        return this.#banner;
    }

    get estado(){
        return this.#estado;
    }

    get id_contacto(){
        return this.#id_contacto;
    }

    get id_direccion(){
        return this.#id_direccion;
    }

    toJSON(){
        return{
            id : this.#id,
            nombre_comercial : this.#nombre_comercial,
            descripcion : this.#descripcion,
            tipo : this.#tipo,
            sector : this.#sector,
            tamaño : this.#tamaño,
            giro : this.#giro,
            rfc : this.#rfc,
            logo :  this.#logo,
            banner : this.#banner,
            id_contacto : this.#id_contacto,
            id_direccion : this.#id_direccion
        }
    }
    
}

module.exports = Organizacion;