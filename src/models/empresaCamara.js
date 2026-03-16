class EmpresaCamara {
    #id;
    #estado;
    #fecha_afiliacion;
    #fecha_vencimiento
    #id_empresa;
    #id_camara;
    constructor(id, estado, fecha_afiliacion, fecha_vencimiento, id_empresa, id_camara) {
        this.#id = id;
        this.#estado = estado;
        this.#fecha_afiliacion = fecha_afiliacion;
        this.#fecha_vencimiento = fecha_vencimiento;
        this.#id_empresa = id_empresa;
        this.#id_camara = id_camara;
    }

    set id(id) {
        this.#id = id;
    }

    set estado(estado) {
        this.#estado = estado;
    }

    set fecha_afiliacion(fecha_afiliacion) {
        this.#fecha_afiliacion = fecha_afiliacion;
    }

    set fecha_vencimiento(fecha_vencimiento) {
        this.#fecha_vencimiento = fecha_vencimiento;
    }

    set id_empresa(id_empresa) {
        this.#id_empresa = id_empresa;
    }

    set id_camara(id_camara) {
        this.#id_camara = id_camara;
    }

    get id() {
        return this.#id;
    }

    get estado() {
        return this.#estado;
    }

    get fecha_afiliacion() {
        return this.#fecha_afiliacion;
    }

    get fecha_vencimiento() {
        return this.#fecha_vencimiento;
    }

    get id_empresa() {
        return this.#id_empresa;
    }

    get id_camara() {
        return this.#id_camara;
    }

    toJSON() {
        return {
            id: this.#id,
            estado: this.#estado,
            fecha_afiliacion: this.#fecha_afiliacion,
            fecha_vencimiento: this.#fecha_vencimiento,
            id_empresa: this.#id_empresa,
            id_camara: this.#id_camara
        }
    }
}

module.exports = EmpresaCamara;