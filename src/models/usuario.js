class Usuario {
    #id;
    #nombre;
    #apellido_paterno;
    #apellido_materno;
    #rfc;
    #foto;
    #banner;
    #estado;
    #id_direccion;
    #id_contacto;
    #id_organizacion;
    constructor(id, nombre, apellido_paterno, apellido_materno, rfc, foto, banner, estado, id_direccion, id_contacto, id_organizacion) {
        this.#id = id;
        this.#nombre = nombre;
        this.#apellido_paterno = apellido_paterno;
        this.#apellido_materno = apellido_materno;
        this.#rfc = rfc;
        this.#foto = foto;
        this.#banner = banner;
        this.#estado = estado
        this.#id_direccion = id_direccion;
        this.#id_contacto = id_contacto;
        this.#id_organizacion = id_organizacion;
    }

    set id(id) {
        this.#id = id;
    }

    set nombre(nombre) {
        this.#nombre = nombre;
    }

    set apellido_paterno(apellido_paterno) {
        this.#apellido_paterno = apellido_paterno;
    }

    set apellido_materno(apellido_materno) {
        this.#apellido_materno = apellido_materno;
    }

    set rfc(rfc) {
        this.#rfc = rfc;
    }

    set foto(foto) {
        this.#foto = foto;
    }

    set banner(banner) {
        this.#banner = banner;
    }

    set estado(estado) {
        this.#estado = estado
    }

    set id_direccion(id_direccion) {
        this.#id_direccion = id_direccion;
    }

    set id_contacto(id_contacto) {
        this.#id_contacto = id_contacto;
    }

    set id_organizacion(id_organizacion){
        this.#id_organizacion = id_organizacion;
    }

    get id() {
        return this.#id;
    }

    get nombre() {
        return this.#nombre;
    }

    get apellido_paterno() {
        return this.#apellido_paterno;
    }

    get apellido_materno() {
        return this.#apellido_materno;
    }

    get rfc() {
        return this.#rfc;
    }

    get foto() {
        return this.#foto;
    }

    get banner() {
        return this.#banner;
    }

    get estado() {
        return this.#estado
    }

    get id_direccion() {
        return this.#id_direccion;
    }

    get id_contacto() {
        return this.#id_contacto;
    }

    get id_organizacion(){
        return this.#id_organizacion;
    }

    toJSON() {
        return {
            id: this.#id,
            nombre: this.#nombre,
            apellido_paterno: this.#apellido_paterno,
            apellido_materno: this.#apellido_materno,
            rfc: this.#rfc,
            foto: this.#foto,
            banner: this.#banner,
            estado: this.#estado,
            id_direccion: this.#id_direccion,
            id_contacto: this.#id_contacto,
            id_organizacion : this.#id_organizacion
        }
    }
}

module.exports = Usuario;