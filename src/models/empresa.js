class Empresa {
    #id;
    #razon_social;
    #regimen_fiscal;
    #direccion_fiscal;
    constructor(id, razon_social, regimen_fiscal, direccion_fiscal) {
        this.#id = id;
        this.#razon_social = razon_social;
        this.#regimen_fiscal = regimen_fiscal;
        this.#direccion_fiscal = direccion_fiscal;
    }

    set id(id) {
        this.#id = id;
    }

    set razon_social(razon_social) {
        this.#razon_social = razon_social;
    }

    set regimen_fiscal(regimen_fiscal) {
        this.#regimen_fiscal = regimen_fiscal;
    }

    set direccion_fiscal(direccion_fiscal) {
        this.#direccion_fiscal = direccion_fiscal;
    }

    get id() {
        return this.id;
    }

    get razon_social() {
        return this.#razon_social;
    }

    get direccion_fiscal() {
        return this.#direccion_fiscal;
    }

    toJSON() {
        return {
            id: this.#id,
            razon_social: this.#razon_social,
            regimen_fiscal : this.#regimen_fiscal,
            direccion_fiscal  : this.#direccion_fiscal
        }
    }
}

module.exports = Empresa;