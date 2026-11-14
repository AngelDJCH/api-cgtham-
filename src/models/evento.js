class Evento {
    #id;
    #titulo;
    #descripcion;
    #tipo;
    #estado;
    #id_organizacion;
    #fecha_inicio;
    #fecha_final;
    #fecha_publicacion;
    #limite_participantes;
    #tipo_organizacion_permitida;
    #region_permitida;
    #modalidad;
    #sector_permitido;
    #giro_permitido;
    #hora_inicio;
    #hora_final;

    constructor(id, titulo, descripcion, tipo, estado, id_organizacion, fecha_inicio, fecha_final, fecha_publicacion, limite_participantes = null, tipo_organizacion_permitida = 'TODAS', region_permitida = 'TODAS', modalidad = 'PRESENCIAL', sector_permitido = 'TODOS', giro_permitido = 'TODOS', hora_inicio = '09:00', hora_final = '18:00') {
        this.#id = id;
        this.#titulo = titulo;
        this.#descripcion = descripcion;
        this.#tipo = tipo;
        this.#estado = estado;
        this.#id_organizacion = id_organizacion;
        this.#fecha_inicio = fecha_inicio;
        this.#fecha_final = fecha_final;
        this.#fecha_publicacion = fecha_publicacion;
        this.#limite_participantes = limite_participantes;
        this.#tipo_organizacion_permitida = tipo_organizacion_permitida;
        this.#region_permitida = region_permitida;
        this.#modalidad = modalidad;
        this.#sector_permitido = sector_permitido;
        this.#giro_permitido = giro_permitido;
        this.#hora_inicio = hora_inicio;
        this.#hora_final = hora_final;
    }

    set id(id) {
        this.#id = id;
    }

    set titulo(titulo) {
        this.#titulo = titulo;
    }

    set descripcion(descripcion) {
        this.#descripcion = descripcion;
    }

    set tipo(tipo) {
        this.#tipo = tipo;
    }

    set id_organizacion(id_organizacion) {
        this.#id_organizacion = id_organizacion;
    }

    set fecha_inicio(fecha_inicio) {
        this.#fecha_inicio = fecha_inicio;
    }

    set fecha_final(fecha_final) {
        this.#fecha_final = fecha_final;
    }

    set fecha_publicacion(fecha_publicacion) {
        this.#fecha_publicacion = fecha_publicacion;
    }

    set estado(estado){
        this.#estado = estado
    }

    set limite_participantes(limite_participantes) {
        this.#limite_participantes = limite_participantes;
    }

    set tipo_organizacion_permitida(tipo) {
        this.#tipo_organizacion_permitida = tipo;
    }

    set region_permitida(region) {
        this.#region_permitida = region;
    }

    set modalidad(modalidad) {
        this.#modalidad = modalidad;
    }

    set sector_permitido(sector) {
        this.#sector_permitido = sector;
    }

    set giro_permitido(giro) {
        this.#giro_permitido = giro;
    }

    set hora_inicio(hora) {
        this.#hora_inicio = hora;
    }

    set hora_final(hora) {
        this.#hora_final = hora;
    }

    get id() {
        return this.#id;
    }

    get titulo() {
        return this.#titulo;
    }

    get descripcion() {
        return this.#descripcion;
    }

    get tipo() {
        return this.#tipo;
    }

    get id_organizacion() {
        return this.#id_organizacion;
    }

    get fecha_inicio() {
        return this.#fecha_inicio;
    }

    get fecha_final() {
        return this.#fecha_final;
    }

    get fecha_publicacion() {
        return this.#fecha_publicacion;
    }

    get estado(){
        return this.#estado
    }

    get limite_participantes() {
        return this.#limite_participantes;
    }

    get tipo_organizacion_permitida() {
        return this.#tipo_organizacion_permitida;
    }

    get region_permitida() {
        return this.#region_permitida;
    }

    get modalidad() {
        return this.#modalidad;
    }

    get sector_permitido() {
        return this.#sector_permitido;
    }

    get giro_permitido() {
        return this.#giro_permitido;
    }

    get hora_inicio() {
        return this.#hora_inicio;
    }

    get hora_final() {
        return this.#hora_final;
    }

    toJSON() {
        return {
            id: this.#id,
            titulo: this.#titulo,
            descripcion: this.#descripcion,
            tipo: this.#tipo,
            estado : this.#estado,
            id_organizacion: this.#id_organizacion,
            fecha_inicio: this.#fecha_inicio,
            fecha_final: this.#fecha_final,
            fecha_publicacion: this.#fecha_publicacion,
            limite_participantes: this.#limite_participantes,
            tipo_organizacion_permitida: this.#tipo_organizacion_permitida,
            region_permitida: this.#region_permitida,
            modalidad: this.#modalidad,
            sector_permitido: this.#sector_permitido,
            giro_permitido: this.#giro_permitido,
            hora_inicio: this.#hora_inicio,
            hora_final: this.#hora_final
        }
    }
}

module.exports = Evento;