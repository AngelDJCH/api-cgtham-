class Cuenta{
    #id;
    #correo;
    #contrasenia;
    #roles
    #id_usuario;
    constructor(id, correo, contrasenia, roles, id_usuario){
        this.#id = id;
        this.#correo = correo;
        this.#contrasenia = contrasenia;
        this.#roles = roles;
        this.#id_usuario = id_usuario;
    }

    set id(id){
        this.#id = id;
    }

    set correo(correo){
        this.#correo = correo;
    }

    set contrasenia(contrasenia){
        this.#contrasenia = contrasenia;
    }

    set roles(roles){
        this.#roles = roles;
    }

    set id_usuario(id_usuario){
        this.#id_usuario = id_usuario;
    }

    get id(){
        return this.#id;
    }

    get correo(){
        return this.#correo;
    }

    get roles(){
        return this.#roles;
    }

    get id_usuario(){
        return this.#id_usuario;
    }

    get contrasenia(){
        return this.#contrasenia;
    }

    toJSON(){
        return{
            id : this.#id,
            correo : this.#correo,
            rol : this.#roles,
            id_usuario : this.#id_usuario
        }
    }
}

module.exports = Cuenta;